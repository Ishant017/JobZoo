import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { JobService } from '../../../shared/job/job.service';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-manage-jobs',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent {


  ngOnInit(): void {
    this.allJobs()
  }

  constructor(
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }



  jobs: any[] = []

  allJobs() {
    this.spinner.show()
    this.jobService.getAll().subscribe((data: any) => {
      this.spinner.hide()
      this.jobs = data;
      console.log(this.jobs);

      this.toastr.success("Success", 'Jobs Loaded')
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all Jobs", err);
      });
  }





  deleteJob(id: any, status: boolean) {
    const action = status ? 'activate' : 'deactivate';
    const confirmText = status ? 'Yes, activate it!' : 'Yes, deactivate it!';
    const successText = status ? 'activated' : 'deactivated';

    Swal.fire({
      title: `Are you sure you want to ${action} this job?`,
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(id, { status: status }).then(() => {
          Swal.fire({
            title: 'Success!',
            text: `The job has been ${successText}.`,
            icon: 'success'
          });
        }, (err: any) => {
          console.error(err);
          this.toastr.error(err);
        });
      }
    });
  }



}
