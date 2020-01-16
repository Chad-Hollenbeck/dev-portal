import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/+auth/services/auth.service';
import { ProjectService } from '@app/+projects/services/project.firestore.service';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: []
})
export class ProfileIndexComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  user: any;
  projectCount: number;

  constructor(private appService: AppService, private authService: AuthService, private projectService: ProjectService) {
    this.appService.pageTitle = 'Profile';

    this.subs = new Subscription();
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    this.user = this.authService.getUser();
    this.projectService.projectCount.subscribe(
      (count) => {
        this.projectCount = count;
      }
    );
  }

  ngOnDestroy(){
    if(!this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
