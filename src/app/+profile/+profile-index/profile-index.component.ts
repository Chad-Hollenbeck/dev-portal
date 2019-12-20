import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: []
})
export class ProfileIndexComponent implements OnInit, OnDestroy {

  loading: boolean;

  subs: Subscription;

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Sample Page Title';

    this.subs = new Subscription();
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
  }

  ngOnDestroy(){
    if(!this.subs.closed){
      this.subs.unsubscribe();
    }
  }

}
