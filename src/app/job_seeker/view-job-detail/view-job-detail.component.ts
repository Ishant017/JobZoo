import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Application } from '../../models/application/application.model';
import { JobService } from '../../shared/job/job.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CloudinaryService } from '../../shared/cloudinary/cloudinary.service';
import { ApplicationService } from '../../shared/application/application.service';

@Component({
  selector: 'app-view-job-detail',
  imports: [FormsModule, DatePipe],
  templateUrl: './view-job-detail.component.html',
  styleUrl: './view-job-detail.component.css'
})
export class ViewJobDetailComponent {


  applicationObj: Application = {}




  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private applicationService: ApplicationService,


  ) { }

  id: any

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.getJobDetail()
  }


  jobDetail: any

  getJobDetail() {
    this.jobService.getSingle(this.id).subscribe((res: any) => {
      this.jobDetail = res
    },
      err => {
        this.spinner.hide()
        console.log(err, 'Error in get single category');
        this.toastr.error("Something Went Wrong", 'Error')
      })

  }


  selectedFile: File | null = null;

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    const input = event.target as HTMLInputElement;
    const label = document.querySelector('.custom-file-label') as HTMLLabelElement;

    if (input.files && input.files.length > 0) {
      label.textContent = input.files[0].name;
    } else {
      label.textContent = 'Resume';
    }
  }





  apply() {
    this.spinner.show()
    if (sessionStorage.getItem('isLoggedIn') == "true") {
      if (this.selectedFile) {
        this.cloudinaryService.uploadImage(this.selectedFile).subscribe((uploadedRes: any) => {
          this.applicationObj.jobId = this.id
          this.applicationObj.jobTitle = this.jobDetail.jobTitle
          this.applicationObj.revertMessage = ''
          this.applicationObj.resume = uploadedRes.secure_url
          this.applicationService.add(this.applicationObj).then((res: any) => {
            this.spinner.hide();
            this.toastr.success("Request Sent", "Success");
            this.router.navigateByUrl("/customer/my-applications");
          }).catch((err: any) => {
            this.spinner.hide();
            console.error(err, 'Error in sent application request');

            if (err.message.includes('already applied')) {
              this.toastr.error("You have already applied to this job", "Duplicate Application");
            } else {
              this.toastr.error("Something Went Wrong", "Error");
            }
          });

        }, (err: any) => {
          this.spinner.hide()
          console.log(err, 'Error in upload image');
          this.toastr.error("Something Went Wrong", 'Error')
        }
        )
      }
      else {
        this.spinner.hide()
        this.toastr.error("No file selected", "Upload Resume");
      }
    }
    else {
      this.spinner.hide()
      this.toastr.error("Session Out", "Login First")
      this.router.navigateByUrl("/login")
    }


  }



}
