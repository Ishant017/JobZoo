import { Component } from '@angular/core';
import { Category } from '../../../models/category/category.model';
import { CategoryService } from '../../../shared/category/category.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../shared/cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {


  categoryobj: Category = {}


  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cloudinaryService: CloudinaryService
  ) { }


  selectedFile: File | null = null;

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }


  submit() {
    this.spinner.show()
    if (this.selectedFile) {
      
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((uploadedRes: any) => {
        this.categoryobj.imgUrl = uploadedRes.secure_url
        this.categoryService.add(this.categoryobj).then((res: any) => {
          this.spinner.hide()
          this.toastr.success("Category Added Successfully", 'Success')
          this.router.navigateByUrl("/admin/category/manage")
        },
          (err: any) => {
            this.spinner.hide()
            console.log(err, 'Error in add category');
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
