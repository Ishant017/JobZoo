import { Injectable } from '@angular/core';
import { collectionData,CollectionReference, DocumentData, Firestore, collection, addDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Query } from '../../models/query/query.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dbPath = '/contacts';
  private categoryRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  add(data: Query) {
    data.createdAt = Date.now();
    data.status = true;
    return addDoc(this.categoryRef, { ...data });
  }

  getAll(): Observable<Query[]> {
    return collectionData(
      query(this.categoryRef, where('status', '==', true)),
      { idField: 'id' }
    ) as Observable<Query[]>;
  }


}
