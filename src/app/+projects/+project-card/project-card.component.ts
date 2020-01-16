import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { ProjectVM } from '../models/project.model';

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

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Project list - Pages';
  }

  statuses = {
    1: { title: 'Active', color: 'success' },
    2: { title: 'Pending', color: 'warning' }
  };

  completedPercent(tasks: number, completed: number) {
    return 100 - Math.round((tasks / completed) * 100);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
  }

  ngOnDestroy() {
    if (!this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

}
