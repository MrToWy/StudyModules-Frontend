import {Component, OnInit} from '@angular/core';
import {ChangelogDto, ChangelogService} from "../../shared/changelog/changelog.service";
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
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {ResponsibleAvatarComponent} from "../responsible-avatar/responsible-avatar.component";
import {UserDto, UserService} from "../../shared/user/user.service";

@Component({
  selector: 'app-module-changelog',
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
    ResponsibleAvatarComponent
  ],
  providers: [ChangelogService, UrlSegmentService],
  templateUrl: './module-changelog.component.html',
  styleUrl: './module-changelog.component.sass'
})
export class ModuleChangelogComponent implements OnInit{

  changelogs: ChangelogDto[] = [];
  users: UserDto[] = [];

  constructor(
    private changelogService: ChangelogService,
    private urlSegmentService: UrlSegmentService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const moduleId = Number(this.urlSegmentService.getIdFromSegment("module"));

    this.changelogService.getAll("module", moduleId).subscribe(changelogs => {
      this.changelogs = changelogs;
    });

    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  protected getFullName(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  }

  protected readonly Number = Number;
}
