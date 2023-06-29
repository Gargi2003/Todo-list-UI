import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateTasksComponent } from '../create-tasks/create-tasks.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private modalService: NgbModal
  ) { }
  modalOptions: NgbModalOptions = {
    size: 'xl', // 'xl' represents extra-large size
    scrollable: true
  };
  openModal() {
    const modalRef = this.modalService.open(CreateTasksComponent, this.modalOptions);
  }
}
