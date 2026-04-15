import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(res: any) {
    // console.log("res", res);
    sessionStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem("email", res.email)
    sessionStorage.setItem("name", res.name)
    sessionStorage.setItem("userType", res.userType)
    sessionStorage.setItem("uid", res.uid)
  }

  getUid() {
    return sessionStorage.getItem('uid')
  }


  clear() {
    sessionStorage.clear()
  }

}
