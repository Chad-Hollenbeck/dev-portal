import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserVM } from '../models/user.class';
import { AngularFireAuth } from '@angular/fire/auth';
import { SlimUserVM } from '../models/slim-user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: AngularFirestoreCollection;

  constructor(private afa: AngularFireAuth, private firestore: AngularFirestore) {
    this.users = this.firestore.collection<UserVM>('users');
  }


  /**
   * Push a new document with auto
   * generated firestore ID
   * @param  data
   */
  addUser(data: UserVM) {
    if (!data.id) { data.id = this.firestore.createId(); }
    if(data.isEmployee){this.firestore.collection('pendingTime').doc(data.id).set({id: data.id})}
    return this.users.doc(data.id).set(data);

  }

  /**
   * Add a new user to the collection
   * with predefined ID (or pre-generated to save on document)
   * @param  data
   *
   */
  setUser(data: UserVM) {
    if (!data.id) data.id = this.firestore.createId();
    if(data.isEmployee){this.firestore.collection('pendingTime').doc(data.id).set({id: data.id})}
    return this.users.doc(data.id).set(data);
  };

  /**
   * Get the user collection
   */
  getAllUsers(): Observable<Array<UserVM>> {
    return this.users.valueChanges() as Observable<Array<UserVM>>;
  }

  /**
   * Get users as id and name combinations
   * @author chollenbeck
   *
   */
  getAllSlimUsers(): Observable<Array<SlimUserVM>> {
    return this.users.valueChanges() as Observable<Array<SlimUserVM>>;
  }

  /**
   * Get a single user by provided UID
   * @param  id
   *
   */
  getUserById(id: string): Observable<UserVM> {
    return this.users.doc<UserVM>(id).valueChanges();
  }

  /**
 * Get a single user by provided UID
 * @param  id
 *
 */
  getUserByEmail(email: string):Promise<firebase.firestore.QuerySnapshot> {
    return this.users.ref.where('email', '==', email).get();
  }

  /**
   * Get the current user's account profile. Stores metadata about the user non-auth related.
   * @author chollenbeck
   */
  getUserProfile(): Observable<UserVM> {
    if (this.afa.auth.currentUser) {
      return this.users.doc<UserVM>(this.afa.auth.currentUser.uid).valueChanges();
    } else {
      return of(null);
    }
  }


  /**
   * Used for initial sign in for OAuth account matching. Locates a user's profile by email
   * @author chollenbeck
   * @param  email
   */
  getAuthorizedPendingUserByEmail(email: string): Promise<firebase.firestore.QuerySnapshot> {
    return this.users.ref.where('email', '==', email).where('isPending', '==', true).get();
  }

  /**
   * Get only users with the isEmployee
   * flag set to TRUE
   * @author chollenbeck
   *
   */
  getOwlUsers() {
    return this.users.ref.where('isEmployee', '==', true).get();
  }



  /**
   [Remove and add the user after initial login with the correct UID valueChanges]
   @author chollenbeck
   @param  pendingUid [UID of the pending user's doc]
   @param  user       [User's new profile data]
   */
  updateUser(user: UserVM, pendingUid?: string): Promise<void> {
    if (pendingUid) this.users.doc(pendingUid).delete();

    return this.users.doc(user.id).update(user);
  }

  /**
   * [deleteUser description]
   * @author chollenbeck 2019-11-20
   */
  deleteUser(id: string): Promise<void> {
    return this.users.doc(id).delete();
  }
}
