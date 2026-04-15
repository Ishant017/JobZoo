import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-manage-jobseekers',
  imports: [],
  templateUrl: './manage-jobseekers.component.html',
  styleUrl: './manage-jobseekers.component.css'
})
export class ManageJobseekersComponent {

  jobseekers: any[] = []

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService: UserService) {

  }
  ngOnInit(): void {
    this.allCustomers()
  }



  allCustomers() {
    this.spinner.show()
    this.userService.getAll().subscribe((data: any) => {
      this.spinner.hide()
      this.jobseekers = data;
      this.toastr.success("Success", 'Jobseekers Loaded')
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all jobseekers", err);
      });
  }



  delete(id: any, status: any) {
    this.spinner.show()
    this.userService.updateData(id, { status: status }).then(
      () => {
        this.spinner.hide()
        this.toastr.success("Status Updated", "Success")
        this.allCustomers()
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went Wrong", "Try Again")
        console.log("Error In deleting city", err);
      }
    )
  }

}
