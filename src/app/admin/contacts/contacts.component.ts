import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../shared/category/category.service';
import { ContactService } from '../../shared/contact/contact.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [DatePipe],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {


  ngOnInit(): void {
    this.allContacts()
  }

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }



  contacts: any[] = []

  allContacts() {
    this.spinner.show()
    this.contactService.getAll().subscribe((data: any) => {
      this.spinner.hide()
      this.contacts = data;
    },
      (err: any) => {
        this.spinner.hide()
        this.toastr.error('Error', err)
        console.log("error is get all contacts", err);
      });
  }


}
