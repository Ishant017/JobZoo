import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../shared/category/category.service';

@Component({
  selector: 'app-view-categories',
  imports: [RouterLink],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {

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

      // this.toastr.success("Success", 'Categories Loaded')
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all categories", err);
      });
  }





}
