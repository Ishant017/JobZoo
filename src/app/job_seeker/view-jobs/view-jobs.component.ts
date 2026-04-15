import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../shared/job/job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-jobs',
  imports: [DatePipe,RouterLink],
  templateUrl: './view-jobs.component.html',
  styleUrl: './view-jobs.component.css'
})
export class ViewJobsComponent {


  categoryId: any;
  ngOnInit(): void {

    this.allJobs()
  }

  constructor(
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
  ) {

  }



  jobs: any[] = []

  allJobs() {
    this.spinner.show()
    this.jobService.viewJob().subscribe((data: any) => {
      this.spinner.hide()
      this.jobs = data;
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all Jobs", err);
      });
  }

}
