import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user/user.service';
import { User } from '../models/user/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute) {
  }


  userObj: User = {}
  id: any



  ngOnInit(): void {
    this.id = sessionStorage.getItem('uid')
    this.getCustomerData(this.id)
  }

  getCustomerData(id: any) {
    this.spinner.show()
    this.userService.getSingle(id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.userObj = res
        this.userObj.id = this.id

      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went Wrong")
        console.log("Error in getting city", err);
      }
    )
  }


  submit() {

    this.spinner.show()
    this.userService.updateData(this.id, this.userObj).then(
      () => {
        this.spinner.hide()
        this.toastr.success("Profile Updated !")
        this.router.navigateByUrl('/customer/manage-profile')
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went Wrong")
        console.log("Error in update Profile", err);

      })

  }

}
