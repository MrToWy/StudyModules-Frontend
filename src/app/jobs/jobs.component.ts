import {Component, OnDestroy, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TranslocoDirective} from "@jsverse/transloco";
import {CourseDto} from "../../shared/course/course.service";
import {LanguageService} from "../../shared/language/language.service";
import {JobService} from "../../shared/job/job.service";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {environment} from "../../environments/environment";

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
    CheckboxModule
  ],
  providers: [
    LanguageService,
    JobService,
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
  selectedvalue: any;
  courseId: number | undefined;
  course: CourseDto | undefined;


  constructor(
    private languageService : LanguageService,
    private jobService: JobService,
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

  loadData(){
    this.jobService.getAll().subscribe(jobs => {
      this.jobs = jobs;

      this.jobs.forEach((job:any) => {
        job.responsible = "Tobias Wylega";
      });
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
    console.log(job);

    this.jobService.delete(job.guid).subscribe(() => {
      this.loadData();
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
}
