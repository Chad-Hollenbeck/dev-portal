
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProjectVM } from '../models/project.model';

@Injectable()
export class ProjectService {
  projectCollection: AngularFirestoreCollection;

  projectCount = new Subject<number>();


  constructor(private afa: AngularFireAuth, private firestore: AngularFirestore) {
    this.projectCollection = this.firestore.collection<ProjectVM>('repository');
  }


  /**
   * Add data to new document with generated ID
   * @author chollenbeck 2019-12-11
   */
  add(data): Observable<ProjectVM> {
    if (!data.id) { data.id = this.firestore.createId(); }
    return this.get(data);
  }

  /**
   * Update with flag for overwriting all data
   * @author chollenbeck 2019-12-11
   */
  update(data, overwrite ?: boolean) {
    if (overwrite) {
      return this.projectCollection.doc(data.id).set(data);
    } else {
      return this.projectCollection.doc(data.id).update(data);
    }
  }

  // Soft re-enable document
  enable(id: string): Promise < void> {
    return this.projectCollection.doc(id).update({ isActive: true });
  }

  // Soft delete document
  disable(id: string): Promise < void> {
    return this.projectCollection.doc(id).update({ isActive: false });
  }

  /**
   * Hard delete a document
   * @author chollenbeck 2019-12-11
   */
  delete (id: string): Promise < void> {
    return this.projectCollection.doc(id).delete();
  }

  /**
   * Get the user collection
   */
  getAll(): Observable<Array<ProjectVM>> {
    return this.projectCollection.valueChanges() as Observable<Array<ProjectVM>>;
  }

  /**
   * Get all documents with isActive = true
   * @author chollenbeck 2019-12-11
   */
  getAllActive():Promise<firebase.firestore.QuerySnapshot> {
    return this.projectCollection.ref.where('isActive', '==', true).get();
  }

  /**
   * Get all by custom query field & operator
   * @author chollenbeck 2019-12-11
   */
  getAllByQuery(field: string, operator: firebase.firestore.WhereFilterOp, value: any):Promise<firebase.firestore.QuerySnapshot> {
    return this.projectCollection.ref.where(field, operator, value).get();
  }

  /**
   * Get single document by ID
   * @author chollenbeck 2019-12-11
   */
  get(id: string): Observable<ProjectVM> {
    return this.projectCollection.doc<ProjectVM>(id).valueChanges();
  }

  setProjectCount(count: number){
    this.projectCount.next(count);
  }

}
