import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';


@Component({
  selector: 'app-admin-layout',
  imports: [AdminFooterComponent,AdminHeaderComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
