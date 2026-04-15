import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { CategoryService } from '../../../shared/category/category.service';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-category',
  imports: [RouterLink, DatePipe],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {


  ngOnInit(): void {
    this.allCategories()
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }



  categories: any[] = []

  allCategories() {
    this.spinner.show()
    this.categoryService.getAll().subscribe((data: any) => {
      this.spinner.hide()
      this.categories = data;
      console.log(this.categories);

      this.toastr.success("Success", 'Categories Loaded')
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all categories", err);
      });
  }





  deleteCat(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteData(id).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

        },
          (err: any) => {
            console.log(err);
            this.toastr.error(err)

          }
        )
      }
    });
  }

}
