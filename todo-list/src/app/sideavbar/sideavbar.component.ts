import { Component } from '@angular/core';

@Component({
  selector: 'app-sideavbar',
  templateUrl: './sideavbar.component.html',
  styleUrls: ['./sideavbar.component.css']
})
export class SideavbarComponent {
  isSidenavOpen = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
