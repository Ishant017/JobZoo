import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Application } from '../../models/application/application.model';
import { ApplicationService } from '../../shared/application/application.service';
import { JobService } from '../../shared/job/job.service';
declare var bootstrap: any;


@Component({
  selector: 'app-manage-applications',
  imports: [RouterLink, FormsModule],
  templateUrl: './manage-applications.component.html',
  styleUrl: './manage-applications.component.css'
})
export class ManageApplicationsComponent {


  constructor(

    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private applicationService: ApplicationService

  ) { }



  ngOnInit(): void {
    this.applications()


  }


  getStatus(event: any) {
    this.status = event.target.value;
    console.log(this.status);
    this.applications()
  }


  status: any;


  myApplications: any

  applications() {
    if (this.status) {
      this.spinner.show()
      this.spinner.show()
      this.applicationService.applicationsByStatus(this.status).subscribe((data: any) => {
        this.spinner.hide()
        this.myApplications = data

        this.toastr.success("Success", 'Applications Loaded')
      },
        (err: any) => {
          this.spinner.hide()
          this.toastr.error('Error', err)
          console.log("error is get all Jobs", err);
        });
    }
    else {
      this.spinner.show()
      this.applicationService.allRequests().subscribe((data: any) => {
        this.spinner.hide()
        this.myApplications = data

        this.toastr.success("Success", 'Applications Loaded')
      },
        (err: any) => {
          this.spinner.hide()
          this.toastr.error('Error', err)
          console.log("error is get all Jobs", err);
        });
    }
  }



  currentId: any;
  currentStatus: any;

  openMessageModal(id: any, status: any) {
    this.currentId = id;
    this.currentStatus = status;
    const modalElement = document.getElementById('messageModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }



  applicationObj: Application = {}


  sendMessage() {
    const message = (document.getElementById('messageInput') as HTMLTextAreaElement).value;
    if (message) {
      this.spinner.show()
      this.applicationService.updateStatus(this.currentId, this.applicationObj).then(
        () => {
          this.spinner.hide()
        },
        (err) => {
          this.spinner.hide()
        })
      this.applicationService.updateStatus(this.currentId, { status: this.currentStatus }).then(
        () => {
          this.spinner.hide();
          this.toastr.success("Status Updated", "Success");
          const modalElement = document.getElementById('messageModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          this.applicationObj = {}
          modal.hide();
          this.applications();
        },
        (err) => {
          this.spinner.hide();
          console.log("Error In updating status", err);
        }
      );
    } else {
      this.toastr.warning("Please enter a message", "Warning");
    }
  }
}
