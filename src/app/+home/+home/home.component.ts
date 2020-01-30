import { Component } from '@angular/core';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  content: number;

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Home';

    this.content = 1;

  }


}
