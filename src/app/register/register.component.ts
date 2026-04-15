import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/user/user.model';
import { UserService } from '../shared/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userObj: User = {}

  constructor(private userService: UserService,private spinner : NgxSpinnerService) { }


  submit() {
    this.spinner.show()
    this.userService.register(this.userObj)

  }

}
