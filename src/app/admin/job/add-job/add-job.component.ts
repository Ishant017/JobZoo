import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../shared/category/category.service';
import { CloudinaryService } from '../../../shared/cloudinary/cloudinary.service';
import { Job } from '../../../models/job/jobs.model';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../shared/job/job.service';

@Component({
  selector: 'app-add-job',
  imports: [FormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit {

  jobobj: Job = {}

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cloudinaryService: CloudinaryService
  ) { }

  today: any;
  ngOnInit(): void {
    this.allCategories()
    const now = new Date();
    this.today = now.toISOString().split('T')[0];  
  }

  selectedFile: File | null = null;

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  categories: any[] = []


  allCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data;
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
      });
  }

  selectCat(event: any) {
    let id = event.target.value;
    let name = this.categories.filter((x) => { return x.id == id })[0].name
    this.jobobj.categoryName = name
  }

  submit() {
    this.spinner.show()
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((uploadedRes: any) => {
        this.jobobj.imageUrl = uploadedRes.secure_url
        this.jobService.add(this.jobobj).then((res: any) => {
          this.spinner.hide()
          this.toastr.success("Job Added Successfully", 'Success')
          this.router.navigateByUrl("/admin/job/manage")
        },
          (err: any) => {
            this.spinner.hide()
            console.log(err, 'Error in add job');
            this.toastr.error("Something Went Wrong", 'Error')
          }
        )
      }, (err: any) => {
        this.spinner.hide()
        console.log(err, 'Error in upload image');
        this.toastr.error("Something Went Wrong", 'Error')
      }
      )
    }
    else {
      this.spinner.hide()
      this.toastr.error("No file selected", "Error");
    }

  }


}
