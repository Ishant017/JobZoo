import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../shared/category/category.service';
import { CloudinaryService } from '../../../shared/cloudinary/cloudinary.service';

@Component({
  selector: 'app-update-category',
  imports: [FormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {

  id: any;

  constructor(private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
    private cloudinaryService: CloudinaryService
  ) {

  }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.getSingle()
  }

  categoryobj: Category = {}


  getSingle() {
    this.spinner.show()
    this.categoryService.getSingle(this.id).subscribe((res: any) => {
      this.categoryobj.name = res.name
      this.categoryobj.imgUrl = res.imgUrl
      this.spinner.hide()
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

  submit() {
    this.spinner.show()
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((uploadedRes: any) => {
        this.categoryobj.imgUrl = uploadedRes.secure_url
        this.categoryService.updateData(this.id, this.categoryobj).then(() => {
          this.spinner.hide()
          this.toastr.success("success", 'Category Updated')
          this.router.navigateByUrl("/admin/category/manage")
        },
          (err: any) => {
            this.spinner.hide()
            console.log(err, 'Error in upadte category');
            this.toastr.error("Something Went Wrong", 'Error')

          }
        )
      })
    }
    else {
      this.categoryService.updateData(this.id, this.categoryobj).then(() => {
        this.spinner.hide()
        this.toastr.success("success", 'Category Updated')
        this.router.navigateByUrl("/admin/category/manage")
      },
        (err: any) => {
          this.spinner.hide()
          console.log(err, 'Error in upadte category');
          this.toastr.error("Something Went Wrong", 'Error')

        }
      )

    }


  }

}
