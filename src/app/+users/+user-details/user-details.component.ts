import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { UserService } from '../services/user.service';
import { UserVM, UserPermission } from '../models/user.class';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserRateVM } from '../models/user-rate.class';
import { UserRateService } from '../services/user-rate.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { appRouteNames } from '@app/app.routes.names';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  isRTL: boolean;
  loading: boolean;
  subs: Subscription;

  userData: UserVM;
  startValue: UserVM;
  isNewUser = false;
  submitting: boolean;

  userForm: FormGroup;
  userRateForm: FormGroup;

  userRates: Array<UserRateVM>;
  disableSubmit: boolean;

  userListRoute = '/' + appRouteNames.USERS;

  constructor(private appService: AppService, private activeRoute: ActivatedRoute, public toastr: ToastrService, private router: Router, private userService: UserService, private userRateService: UserRateService) {
    this.appService.pageTitle = 'User Details';
    this.isRTL = appService.isRTL;

    this.userData = new UserVM();
    this.subs = new Subscription();

    this.userForm = this.appService.buildFormGroup(this.userData);
    this.userForm.addControl('roles', this.appService.buildFormGroup(new UserPermission()));
    this.loading = true;
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(
      (value: ParamMap) => {
        if (value.keys.length > 0) {
          const id = value.get('id');
          this.isNewUser = (id == 'new');

          // new
          if (this.isNewUser) {
            this.loading = false;
            // this.userForm.patchValue(this.userData);
          } else {
            // edit
            const getSub = this.userService.getUserById(id).subscribe(
              (_user) => {
                // Disable Email
                this.userForm.controls['name'].disable();
                this.userForm.controls['email'].disable();

                // Set Service User UID
                this.userRateService.setTargetUser(_user.id);

                // Set Values
                this.userData = _user as UserVM;
                this.startValue = _user as UserVM;
                this.userForm.patchValue(this.userData);

                // Fetch User Rates
                this.userRateService.getAllUserRates().subscribe(
                  (rates) => {
                    this.userRates = rates;
                    this.sortRates();

                    // Create a new userRate to instantiate the form
                    const _rate = new UserRateVM();
                    this.userRateForm = _rate.createFormGroup();

                    // Loading Complete
                    this.loading = false;
                  }
                )
                // this.loading = false;
              }
            );
            this.subs.add(getSub);
          }
        }
      }
    );
    // this.subs.add(routeSub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    this.submitting = true;
    if (this.isNewUser) {
      this.addUser(this.userForm.getRawValue());
    } else {
      this.updateUser(this.userForm.getRawValue());
    }
  }

  updateUser(data: UserVM) {
    this.userService.updateUser(data).then(
      () => {
        this.submitting = false;
        this.toastr.success("User Updated");
      },
      (err) => {
        this.toastr.error('User could not be updated');
        console.log(err);
        this.submitting = false;
      }
    )
  }

  updatePermission(permissionName: string) {
    this.userService.deleteUser('test');
    this.userData.roles[permissionName] = !this.userData.roles[permissionName];
  }

  addUser(_data: UserVM) {

    this.userService.getUserByEmail(_data.email).then(
      (snap) => {
        if(snap.docs.length == 0){
          // Continue
          // Set default params
          _data.isPending = true;

          // Add it
          this.userService.addUser(_data).then(
            () => {
              this.toastr.success('User Added');
              this.submitting = false;
              this.router.navigate([appRouteNames.USERS]);
            }
          );
        }else{
          this.toastr.warning("This email address is already registered.");
          this.disableSubmit = true;
        }
      }
    )


  }

  resetForm() {
    this.userForm.reset(this.startValue);
    this.toastr.warning("Changes reverted");
  }

  // RATES
  onRateSubmit() {
    const rateVal = this.userRateForm.getRawValue();
    rateVal.startDate = this.convertStartDate(rateVal.startDate);

    const matchingDate = _.find(this.userRates, (r) => { return r.startDate == rateVal.startDate });

    if (!matchingDate) {
      this.userRateService.addUserRate(rateVal).then(
        () => {
          this.toastr.success("Rate added");
          this.sortRates();
          this.userRateForm.reset();
        }
      );
    }else{
      this.toastr.warning('New rate has a conflicting date');
    }
  }

  removeRate(uid: string) {
    this.userRateService.removeRate(uid).then(
      () => {
        this.toastr.success("Rate removed");
      }
    );
  }

  sortRates() {
    this.userRates = _.sortBy(this.userRates, 'startDate');
  }

  convertStartDate(obj: any) {
    return moment(obj.year + '-' + obj.month + '-' + obj.day).format("YYYY-MM-DD");
  }

}
