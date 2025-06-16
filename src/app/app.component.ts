import { Component } from '@angular/core';
import { ComponentsComponent } from "./components/components.component";

@Component({
  selector: 'app-root',
  imports: [ ComponentsComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontVisiontech';
}