import { Component } from '@angular/core';
import { AdminComponent } from './components/principal/admin/admin.component';

@Component({
  selector: 'app-root',
  imports: [AdminComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontVisiontech';
}