import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../shared/cloudinary/cloudinary.service';
import { Query } from '../../models/query/query.model';
import { ContactService } from '../../shared/contact/contact.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactObj: Query = {}

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  submit() {
    this.spinner.show()
    this.contactService.add(this.contactObj).then((res: any) => {
      this.spinner.hide()
      this.contactObj = {}
      this.toastr.success("Message Sent")

    },
      (err: any) => {
        this.spinner.hide()
        console.log(err, 'Error in add category');
        this.toastr.error("Something Went Wrong", 'Error')
      }
    )
  }


}


