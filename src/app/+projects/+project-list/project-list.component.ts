import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProjectService } from '../services/project.firestore.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: []
})
export class ProjectListComponent implements OnInit, OnDestroy {

  loading: boolean;
  subs: Subscription;

  projectsData = [];
  //  [
  //   {
  //   status: 1,
  //   title: 'Frontend Development',
  //   tasks: 15,
  //   completedTasks: 5,
  //   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac malesuada nisl. Maecenas quis ultrices tellus.',
  //   created: '02/01/2018',
  //   deadline: '03/12/2018',
  //   team: [
  //     { avatar: '2-small.png' },
  //     { avatar: '3-small.png' },
  //     { avatar: '4-small.png' },
  //     { avatar: '5-small.png' },
  //     { avatar: '6-small.png' }
  //   ]
  // }, {
  //   status: 1,
  //   title: 'Website',
  //   tasks: 44,
  //   completedTasks: 29,
  //   shortDescription: 'Aliquam sem elit, semper sed ante ut, aliquam molestie risus.',
  //   created: '02/01/2018',
  //   deadline: '03/12/2018',
  //   team: [
  //     { avatar: '7-small.png' },
  //     { avatar: '8-small.png' },
  //     { avatar: '9-small.png' }
  //   ]
  // }, {
  //   status: 1,
  //   title: 'UI update',
  //   tasks: 54,
  //   completedTasks: 48,
  //   shortDescription: 'Etiam venenatis varius lectus sed fermentum. Nullam hendrerit, massa sed tincidunt sagittis, leo nibh semper sapien, vitae interdum nisl erat ut sapien.',
  //   created: '02/01/2018',
  //   deadline: '03/12/2018',
  //   team: [
  //     { avatar: '10-small.png' },
  //     { avatar: '11-small.png' },
  //     { avatar: '12-small.png' }
  //   ]
  // }, {
  //   status: 2,
  //   title: 'SEO',
  //   tasks: 70,
  //   completedTasks: 45,
  //   shortDescription: 'Suspendisse scelerisque nisi ac semper ornare.',
  //   created: '02/01/2018',
  //   deadline: '03/12/2018',
  //   team: [
  //     { avatar: '2-small.png' },
  //     { avatar: '3-small.png' },
  //     { avatar: '4-small.png' }
  //   ]
  // }, {
  //   status: 1,
  //   title: 'example.com design',
  //   tasks: 84,
  //   completedTasks: 28,
  //   shortDescription: 'Pellentesque imperdiet nunc quis fringilla euismod. Nunc iaculis eu augue sit amet faucibus.',
  //   created: '02/01/2018',
  //   deadline: '03/12/2018',
  //   team: [
  //     { avatar: '5-small.png' },
  //     { avatar: '6-small.png' },
  //     { avatar: '7-small.png' },
  //     { avatar: '8-small.png' }
  //   ]
  // }];

  constructor(private projectService: ProjectService) {
    // this.appService.pageTitle = 'Sample Page Title';

    this.subs = new Subscription();

    //this.projectsData = _.sortBy(this.projectsData, 'title');
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    this.projectService.getAll().pipe(first()).subscribe(
      (repos) => {
        this.projectsData = _.sortBy(repos, 'name');
        this.projectService.setProjectCount(repos.length);
      }
    )
  }

  ngOnDestroy(){
    if(!this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
