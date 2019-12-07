import { Component } from '@angular/core';
import { AppService } from '@app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = 'Home';
    // this.toastr.success("Login Success");
  }

  popToastr(){
    this.toastr.success("POP POP");
  }

}
