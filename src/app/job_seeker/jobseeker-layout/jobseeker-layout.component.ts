import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../jobseeker_layout/header/header.component';
import { FooterComponent } from '../jobseeker_layout/footer/footer.component';

@Component({
  selector: 'app-jobseeker-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './jobseeker-layout.component.html',
  styleUrl: './jobseeker-layout.component.css'
})
export class JobseekerLayoutComponent {

}
