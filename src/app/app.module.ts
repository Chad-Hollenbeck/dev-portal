import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Libs
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';


// *******************************************************************************
// NgBootstrap

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './core/ngb-date-fr-parser-formatter';

// *******************************************************************************
// App

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { environment } from '@environments/environment';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LayoutModule } from './core/layout.module';
import { SpinnerService } from './core/spinners/spinner.service';
import { LoadingSpinnerComponent } from './core/spinners/loading-spinner/loading-spinner.component';
// *******************************************************************************
// Firebase

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';


// *******************************************************************************
// Feature Modules
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HomeModule } from './+home/_config/home.module';
import { AuthModule } from './+auth/config/auth.module';
import { UsersModule } from './+users/_config/users.module';




// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoadingSpinnerComponent
  ],

  imports: [
    // Core
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,

    // Libraries
    ToastrModule.forRoot({
      toastClass: 'toast'
    }),
    ConfirmationPopoverModule.forRoot(),
    NgSelectModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,

    // Feature Modules
    AuthModule,
    HomeModule,
    UsersModule,

    // Router
    RouterModule.forRoot(APP_ROUTES)
  ],

  providers: [
    Title,
    AppService,
    SpinnerService,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
