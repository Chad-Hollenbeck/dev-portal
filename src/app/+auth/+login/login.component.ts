import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { UserService } from '@app/+users/services/user.service';
import { UserVM } from '@app/+users/models/user.class';
import { appRouteNames } from '@app/app.routes.names';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../vendor/styles/pages/authentication.scss']
})
export class LoginComponent implements OnInit {

  subs: Array<Subscription>;
  routes: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = 'Login';

    this.routes = {

    }
  }

  ngOnInit() {
    this.subs = [];

    if (this.authService.getUser() !== null) {
      this.googleLogin();
    }
  }

  googleLogin() {
    this.authService.googleLogin().then(
      (credential: UserCredential) => {
        if (credential.additionalUserInfo.isNewUser) {

          // Verify user has been pre-registered
          this.userService.getAuthorizedPendingUserByEmail(credential.user.email).then(
            (snapshot) => {
              if (snapshot.size === 1) {
                // User Found
                const profile = snapshot.docs.pop().data() as UserVM;
                const pendingUID = profile.id;

                // Update user profile
                profile.id = credential.user.uid;
                profile.name = credential.user.displayName;
                profile.isPending = false;
                profile.photoURL = credential.user.photoURL;

                this.userService.deleteUser(pendingUID).then(
                  () => {
                    this.userService.setUser(profile).then(
                      () => {
                        this.authService.storeAuthProfile();
                        this.router.navigate([appRouteNames.HOME]);
                      });
                  },
                  (err) => {
                    // Show error on user profile update
                    this.toastr.warning('Profile failed to update. Please contact an administrator.');
                    console.log(err);
                  }
                );
              } else {
                // Show unauthorized notification
                this.toastr.error('Unauthorized Account. Please contact an administrator.');

              }
            }
          )

        } else {
          this.fetchUserProfile(credential);
        }
      }
    );
  }

  /**
   * Redirect user based on any given criteria
   * such as role or permission
   * @author chollenbeck 2019-12-07
   */
  redirectUser(_user: UserVM) {
    this.router.navigateByUrl(appRouteNames.HOME);
  }

  /**
   * Fetch and update the user profile
   * to set login timestamp and update photoURL if needed
   * @author chollenbeck 2019-12-07
   */
  fetchUserProfile(credential: UserCredential) {
    const getUserSub = this.userService.getUserProfile().subscribe(
      (user) => {
        if (user != null) {
          // Update last login
          user.lastLoginTimestamp = moment().format('YYYY-MM-DD');
          if (user.photoURL != credential.user.photoURL) {
            user.photoURL = credential.user.photoURL;
          }

          getUserSub.unsubscribe(); //Prevent looping callback

          // Update the user profile
          this.userService.updateUser(user).then(() => {

            // Store User and Redirect
            this.authService.storeAuthProfile();
            this.redirectUser(user as UserVM);
          });

        } else {
          // Profile fetch failed
          this.toastr.warning('Profile not found. Please contact an administrator.');

        }
      }
    )
  }

}
