import { Component } from '@angular/core';
import { AppService } from '@app/app.service';
import { ToastrService } from 'ngx-toastr';
import { projectsRouteNames } from '@app/+projects/routes/projects.routes.names';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  content: number;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = 'Home';

    this.content = 1;

  }

  popToastr(){
    this.toastr.success("POP POP");
  }

}
