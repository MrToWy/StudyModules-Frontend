import {Component, OnInit} from '@angular/core';
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
export class JobsComponent implements OnInit{

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

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }


  loadData(){
    this.jobService.getAll().subscribe(jobs => {
      this.jobs = jobs;

      this.jobs.forEach((job:any) => {
        job.responsible = "Tobias Wylega";
      });
    });
  }

  getStatus(job:any) {
    if (job.finshed) {
      return "finished"
    }

    if (job.running) {
      return "running"
    }

    if(job.error) {
      return "error"
    }

    return "pending"
  }

  getRunningTime(job: any) {
    const startTime = new Date(job.startedAt);
    let endTime = new Date(job.finishedAt);

    if(!endTime)
      endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds}min`;
  }

  publish(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);
  }

  deleteJob(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);
  }

  downloadPdf(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);
  }

  retryJob(job: any, $event: MouseEvent) {
    $event.stopPropagation();
    console.log(job);
  }
}
