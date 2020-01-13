import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { UserService } from '@app/+users/services/user.service';
import { UserVM } from '@app/+users/models/user.class';
import { AuthService } from '@app/+auth/services/auth.service';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: []
})
export class ProfileIndexComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  user: any;

  constructor(private appService: AppService, private authService: AuthService) {
    this.appService.pageTitle = 'Profile';

    this.subs = new Subscription();
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    this.user = this.authService.getUser();
  }

  ngOnDestroy(){
    if(!this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
