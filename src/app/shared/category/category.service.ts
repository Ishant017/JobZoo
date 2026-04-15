import { Injectable } from '@angular/core';
import { Category } from '../../models/category/category.model';
import {
  Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc, CollectionReference, DocumentData, query,
  where, docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/categories';
  private categoryRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.categoryRef = collection(this.db, this.dbPath);
  }

  add(categoryobj: Category) {
    categoryobj.createdAt = Date.now();
    categoryobj.status = true;
    return addDoc(this.categoryRef, { ...categoryobj });
  }

  getAll(): Observable<Category> {
    return collectionData(query(this.categoryRef, where('status', '==', true)), { idField: 'id' }) as Observable<Category>;
  }


  deleteData(id: string) {
    return deleteDoc(doc(this.categoryRef, id));
  }


  getSingle(id: string) {
    return docData(doc(this.categoryRef, id), { idField: 'id' });
  }


  updateData(id: string, data: Partial<Category>) {
    return updateDoc(doc(this.categoryRef, id), data);
  }

  

}
