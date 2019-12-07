import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserRateVM } from './user-rate.class';

@Injectable({
  providedIn: 'root'
})
export class UserRateService {
  userRates: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    // this.userRates = this.firestore.collection<UserRateVM>('');
  }

  /**
   * Set target user to fetch rates
   * @author chollenbeck
   * @param  uid [description]
   *
   */
  setTargetUser(uid: string){
    this.userRates = this.firestore.collection<UserRateVM>('users').doc(uid).collection('rates');
  }


  /**
   * Get the userRate collection
   * @author chollenbeck
   */
  getAllUserRates(): Observable<Array<UserRateVM>> {
    return this.userRates.valueChanges() as Observable<Array<UserRateVM>>;
  }

  /**
   * Get a single userRate by provided UID
   * @author chollenbeck
   * @param  uid
   *
   */
  getUserRateByUid(uid: string): Observable<UserRateVM> {
    return this.userRates.doc<UserRateVM>(uid).valueChanges();
  }


  /**
   [Update userRate]
   @author chollenbeck
   @param  userRate
   */
  updateUserRate(data: UserRateVM): Promise<void> {
    return this.userRates.doc(data.uid).set(data);
  }

  /**
   * Add a new userRate to the collection
   * @author chollenbeck
   * @param  data
   *
   */
  async addUserRate(data: UserRateVM){
    const ref = await this.userRates.add(data);
    data.uid = ref.id;
    return ref.update(data);
  };

  removeRate(uid: string){
    return this.userRates.doc(uid).delete();
  }

}
