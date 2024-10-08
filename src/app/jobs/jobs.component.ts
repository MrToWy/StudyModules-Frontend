import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {translate, TranslocoDirective} from "@jsverse/transloco";
import {CourseDto} from "../../shared/course/course.service";
import {LanguageService} from "../../shared/language/language.service";
import {JobService} from "../../shared/job/job.service";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {environment} from "../../environments/environment";
import {ResponsibleAvatarComponent} from "../responsible-avatar/responsible-avatar.component";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    NgIf,
    RippleModule,
    SharedModule,
    TableModule,
    TagModule,
    TranslocoDirective,
    FormsModule,
    CheckboxModule,
    ResponsibleAvatarComponent,
    ConfirmPopupModule
  ],
  providers: [
    LanguageService,
    JobService,
    ConfirmationService
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.sass'
})
export class JobsComponent implements OnInit, OnDestroy{

  private intervalId: any;
  private languageSubscription: any;

  jobs!: any[];
  users!: any[];
  statuses!: any[];
  selectedUser: any;
  course: CourseDto | undefined;

  @Input()
  public filterGuids: string[] = [];

  @Input()
  public simpleView: boolean = false;

  @Output() jobsDone = new EventEmitter<void>();



  constructor(
    private languageService : LanguageService,
    private jobService: JobService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
      this.loadData();

    this.languageSubscription = this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });

    // load data every second while the page is open
    this.intervalId = setInterval(() => {
      this.loadData();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  onJobsCompleted() {
    // Emit the event to notify parent component
    this.jobsDone.emit();
  }

  loadData(){
    const fetchJobs = this.filterGuids
      ? this.jobService.getAllFiltered(this.filterGuids)
      : this.jobService.getAll();

    fetchJobs.subscribe(jobs => {
      if(this.simpleView && this.filterGuids.length == 0) return;

      if (JSON.stringify(this.jobs) !== JSON.stringify(jobs)) {
        this.jobs = jobs;

        // Check if all jobs are published
        if (this.filterGuids && this.jobs.every(job => job.publishedAt)) {
          this.onJobsCompleted();
        }
      }
    });
  }

getRunningTime(job: any) {
  const startTime = new Date(job.startedAt);
  let endTime = job.finishedAt ? new Date(job.finishedAt) : new Date();

  const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}min`;
}

  publish(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);

    this.jobService.publish(job.guid).subscribe(() => {
      this.loadData();
    });
  }

  deleteJob(job: any, $event: MouseEvent) {
    $event.stopPropagation();

    this.confirmationService.confirm({
      message: translate('deleteJobConfirmation'),
      target: $event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobService.delete(job.guid).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  downloadPdf(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);

    // open pdf in new tab
    window.open(`${environment.backendURL}job/${job.guid}/pdf`, '_blank');
  }

  retryJob(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);
  }

  getStatus(job: any) {
    if (job.errorAt) {
      return 'Error';
    }
    if (job.publishedAt) {
      return translate("published") + ` ${new Date(job.publishedAt).toLocaleString(this.languageService.languageCode.toLowerCase())}`;
    }
    if (!job.publishedAt && job.finishedAt) {
      return translate('pdfCreated') + `(${this.getRunningTime(job)})`;
    }
    if (!job.errorAt && !job.finishedAt && job.startedAt) {
      const runningTime = this.getRunningTime(job);
      return translate("runningFor") + " " + runningTime;
    }
    if (!job.errorAt && !job.finishedAt && !job.startedAt) {
      return translate("waitingForBuilder");
    }
    return '';
  }
}
