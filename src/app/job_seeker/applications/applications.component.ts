import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../../shared/application/application.service';
import { JobService } from '../../shared/job/job.service';

@Component({
  selector: 'app-applications',
  imports: [],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {



  myApplications: any
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private jobService: JobService,
    private applicationService: ApplicationService

  ) { }

  ngOnInit(): void {
    this.getMyApplications()
  }

  getMyApplications() {
    this.spinner.show()
    let uid = sessionStorage.getItem('uid')
    this.applicationService.myApplication(uid).subscribe((data: any) => {
      this.spinner.hide()
      this.myApplications = data;
      // this.toastr.success("Success", 'Jobs Loaded')
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all Jobs", err);
      });
  }

}
