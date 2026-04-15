import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../../../models/job/jobs.model';
import { CategoryService } from '../../../shared/category/category.service';
import { CloudinaryService } from '../../../shared/cloudinary/cloudinary.service';
import { JobService } from '../../../shared/job/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upddate-job',
  imports: [FormsModule],
  templateUrl: './upddate-job.component.html',
  styleUrl: './upddate-job.component.css'
})
export class UpddateJobComponent {

  jobObj: Job = {}

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cloudinaryService: CloudinaryService,
    private activatedRoute: ActivatedRoute,
  ) { }

  id: any;
  today: any;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.allCategories()
    this.getSingleJob()
    const now = new Date();
    this.today = now.toISOString().split('T')[0];

  }


  getSingleJob() {
    this.jobService.getSingle(this.id).subscribe((res: any) => {
      this.jobObj = res
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
    this.jobObj.categoryName = name
  }


  submit() {
    this.spinner.show()
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((uploadedRes: any) => {
        this.jobObj.imageUrl = uploadedRes.secure_url
        this.jobService.updateData(this.id, this.jobObj).then(() => {
          this.spinner.hide()
          this.toastr.success("success", 'Job Updated')
          this.router.navigateByUrl("/admin/job/manage")
        },
          (err: any) => {
            this.spinner.hide()
            console.log(err, 'Error in upadte job');
            this.toastr.error("Something Went Wrong", 'Error')
          }
        )
      })
    }
    else {
      this.jobService.updateData(this.id, this.jobObj).then(() => {
        this.spinner.hide()
        this.toastr.success("success", 'Job Updated')
        this.router.navigateByUrl("/admin/job/manage")
      },
        (err: any) => {
          this.spinner.hide()
          console.log(err, 'Error in upadte Job');
          this.toastr.error("Something Went Wrong", 'Error')

        }
      )
    }
  }


}
