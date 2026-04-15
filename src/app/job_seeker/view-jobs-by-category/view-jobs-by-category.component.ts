import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../shared/job/job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-jobs-by-category',
  imports: [RouterLink,DatePipe],
  templateUrl: './view-jobs-by-category.component.html',
  styleUrl: './view-jobs-by-category.component.css'
})
export class ViewJobsByCategoryComponent {


  categoryId: any;
  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
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
    this.jobService.jobsByCategory(this.categoryId).subscribe((data: any) => {
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





}
