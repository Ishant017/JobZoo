import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, DocumentData, addDoc, doc, getDoc, setDoc, docData, updateDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  private userRef: CollectionReference<DocumentData>;

  constructor(
    private db: Firestore,
    private auth: Auth,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService

  ) {
    this.userRef = collection(this.db, this.dbPath);
  }



  register(data: any) {
    this.spinner.show();
    data.status = true;
    data.createdAt = Date.now();
    data.userType = 2;
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then(async (res) => {
        data.uid = res.user.uid;
        delete data.password;
        await setDoc(doc(this.userRef, data.uid), data);
      })
      .then(() => {
        this.spinner.hide();
        this.toastr.success("Registered Successfully!", "Success");
        this.router.navigateByUrl("/login");
      })
      .catch((err) => {
        this.spinner.hide();
        this.toastr.error(err.message || err, "Error");
        console.error("Error in Add Customer", err);
      });
  }





  login(email: string, password: string) {
    this.spinner.show()
    signInWithEmailAndPassword(this.auth, email, password).then(async (res) => {
      const uid = res.user.uid;
      const userSnap = await getDoc(doc(this.userRef, uid));
      if (userSnap.exists()) {
        this.spinner.hide();
        const userData = userSnap.data();
        if (userData['status'] == true) {
          if (userData['userType'] == 1) {
            this.spinner.hide();
            this.authService.setData(userData)
            this.toastr.success("Welcome Admin", "Logged in successfully")
            this.router.navigateByUrl("/admin/dashboard")
          }
          else if (userData['userType'] == 2) {
            this.spinner.hide();
            this.authService.setData(userData)
            this.toastr.success("success", "Logged in successfully")
            this.router.navigateByUrl("/home")
          }
          else {
            this.spinner.hide();
            this.toastr.error("error", "invalid user type")
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error("Your account is inactive")
        }
      }
      else {
        this.spinner.hide();
        this.toastr.error("Record not found")
      }
    },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.message || err, "Error");
        console.error("Error in Login", err);
      }
    )

  }


  getSingle(id: string) {
    return docData(doc(this.userRef, id), { idField: 'id' });
  }


  updateData(id: string, data: Partial<User>) {
    return updateDoc(doc(this.userRef, id), data);
  }


  getAll(): Observable<User> {
    return collectionData(query(this.userRef, where('userType', '==', 2)), { idField: 'id' }) as Observable<User>;
  }

  


}
