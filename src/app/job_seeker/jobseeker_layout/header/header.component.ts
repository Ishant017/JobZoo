import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    this.checkLogin()

  }
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  isLoggedIn: boolean = false


  checkLogin() {
    if (this.authService.getUid() == null || !sessionStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = false
    }
    else {
      this.isLoggedIn = true

    }
  }

  logout() {
    this.spinner.show()
    this.authService.clear()
    this.toastr.success("Logout Successfully")
    this.spinner.hide()
    this.router.navigateByUrl("/login")
  }

}
