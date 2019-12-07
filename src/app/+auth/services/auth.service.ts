import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  // ***********************************************
  // Login

  googleLogin(){
    return this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }


  // ***********************************************
  // Logout

  logout(): Promise<void>{
    localStorage.clear();
    return this.afa.auth.signOut();
  }


  // ***********************************************
  // Auth Profile

  getUserAccount(): Observable<firebase.User>{
    return this.afa.authState;
  }

  getUser(): firebase.User {
    return this.afa.auth.currentUser;
  }

}
