import { Injectable } from '@angular/core';
import { collectionData, docData, CollectionReference, DocumentData, Firestore, collection, addDoc, query, where, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Job } from '../../models/job/jobs.model';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  private dbPath = '/jobs';
  private jobRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.jobRef = collection(this.db, this.dbPath);
  }

  add(jobObj: Job) {
    jobObj.createdAt = Date.now();
    jobObj.status = true;
    return addDoc(this.jobRef, { ...jobObj });
  }



  getAll(): Observable<Job[]> {
    return collectionData(this.jobRef, { idField: 'id' }) as Observable<Job[]>;
  }


 viewJob(): Observable<Job[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  return collectionData(
    query(
      this.jobRef,
      where('status', '==', true),
      where('lastApplyDate', '>=', todayStr)
    ),
    { idField: 'id' }
  ) as Observable<Job[]>;
}




  jobsByCategory(id: any): Observable<Job[]> {
    return collectionData(
      query(
        this.jobRef,
        where('status', '==', true),
        where('categoryId', '==', id)
      ),
      { idField: 'id' }
    ) as Observable<Job[]>;
  }


  // deleteData(id: string) {
  //   return deleteDoc(doc(this.jobRef, id));
  // }


  getSingle(id: string) {
    return docData(doc(this.jobRef, id), { idField: 'id' });
  }


  updateData(id: string, data: Partial<Job>) {
    return updateDoc(doc(this.jobRef, id), data);
  }



  deleteJob(id: any, data: any) {
    return updateDoc(doc(this.jobRef, id), data);
  }


}

