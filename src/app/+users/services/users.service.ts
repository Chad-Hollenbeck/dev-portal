import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afa: AngularFireAuth, private firestore: AngularFirestore) { }

  getAuthorizedPendingUserByEmail(email: string): Observable<any> {
    return this.firestore.collection('pendingUsers', ref => ref.where('email', '==', email)).get();
  }

  getUserProfile(){
    if(this.afa.auth.currentUser){
      return this.firestore.collection('users').doc(this.afa.auth.currentUser.uid).valueChanges();
    }else{
      return of(null);
    }
  }

  updateUserProfile(pendingUid:string, user: UserProfile){
    this.firestore.collection('pendingUsers').doc(pendingUid).delete();
    return this.firestore.collection('users').doc(user.uid).set(user);
  }
}
