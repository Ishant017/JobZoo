import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, collection, addDoc, query, where, deleteDoc, doc, updateDoc, CollectionReference, DocumentData, getDocs } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Application } from '../../models/application/application.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private dbPath = '/Applications';
  private applicationRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore,
    private authService: AuthService
  ) {
    this.applicationRef = collection(this.db, this.dbPath);
  }



  add(applicationobj: Application) {
    const userId = this.authService.getUid() ?? '';
    const jobId = applicationobj.jobId;
    applicationobj.userId = userId;
    applicationobj.status = 'pending';
    applicationobj.createdAt = Date.now();
    const q = query(
      this.applicationRef,
      where('userId', '==', userId),
      where('jobId', '==', jobId)
    );
    return getDocs(q).then(snapshot => {
      if (!snapshot.empty) {
        return Promise.reject(new Error('You have already applied to this job.'));
      } else {
        return addDoc(this.applicationRef, { ...applicationobj });
      }
    });
  }


  getSingle(id: string) {
    return docData(doc(this.applicationRef, id), { idField: 'id' });
  }



  myApplication(id: any): Observable<Application> {
    return collectionData(query(this.applicationRef, where('userId', '==', id)), { idField: 'id' }) as Observable<Application>;
  }


  applicationsByStatus(status: any): Observable<Application> {
    return collectionData(query(this.applicationRef, where('status', '==', status)), { idField: 'id' }) as Observable<Application>;
  }


  allRequests(): Observable<Application[]> {
    return collectionData(this.applicationRef, { idField: 'id' }) as Observable<Application[]>;
  }

  updateStatus(id: string, data: Partial<Application>) {
    return updateDoc(doc(this.applicationRef, id), data);
  }

}
