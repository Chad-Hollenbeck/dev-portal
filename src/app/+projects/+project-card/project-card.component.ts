import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { ProjectVM } from '../models/project.model';
import * as moment from 'moment';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: []
})
export class ProjectCardComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  @Input() project: ProjectVM;

  isRTL = false;

  status: string;
  statusClass: string;

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Project list - Pages';
  }

  completedPercent(tasks: number, completed: number) {
    return 100 - Math.round((tasks / completed) * 100);
  }

  ngOnInit() {
    this.loading = true;

    // Set status information
    const today = moment();
    const lastUpdated = moment(this.project.updateDate);
    const timeSinceUpdate = today.diff(lastUpdated, 'd');

    if(timeSinceUpdate > 60){
      this.status = this.project.isComplete ? "Complete" : "Archived";
      this.statusClass = "secondary"
    }

    if(timeSinceUpdate > 45){
      this.status = "On Hold";
      this.statusClass = "warning"
    }

    if(timeSinceUpdate > 30){
      this.status = "In Progress";
      this.statusClass = "info"
    }

    if(timeSinceUpdate >= 0){
      this.status = 'Active';
      this.statusClass= 'success';
    }
  }

  ngOnDestroy() {
    if (this.subs && !this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

}
