import { Component } from '@angular/core';
import { VisiontechfrontComponent } from "./components/visiontechfront/visiontechfront.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontVisiontech';
}