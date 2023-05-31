import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  ngOnInit() {
    this.getTasksStatus();
  }
  tasks: any;
  status: string[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  modalOptions: NgbModalOptions = {
    size: 'xl' // 'xl' represents extra-large size
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient
  ) {}

  openModal(task: any) {
    console.log(task);
    const modalRef = this.modalService.open(CardDetailsComponent, this.modalOptions);
    modalRef.componentInstance.task = task;
  }

  getTasksStatus() {
    // Add the userId to the API request headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.http.get<any[]>('http://localhost:8081/tasks/list', httpOptions).subscribe(response => {
      this.tasks = response;

      this.tasks.forEach((task: any) => {
        this.status = task.status;
        if (this.status.includes('to do')) {
          this.todo.push(task);
        } else if (this.status.includes('in progress')) {
          this.inProgress.push(task);
        } else if (this.status.includes('done')) {
          this.done.push(task);
        }
      });
    });
  }
}
