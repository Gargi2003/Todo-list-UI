import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.projectId = Number(params['projectId']);
    });
    this.getTaskByProjId();
    this.getProjName();
  }
  tasks: any;
  status: string[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  projectId: any;
  proj:any
  projectName: string=""
  modalOptions: NgbModalOptions = {
    size: 'xl', // 'xl' represents extra-large size
    scrollable: true
  };

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  openModal(task: any) {
    const modalRef = this.modalService.open(CardDetailsComponent, this.modalOptions);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.projectName = this.projectName;
    modalRef.componentInstance.projectId= this.projectId
  }

  getTaskByProjId(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.http.get('http://localhost:8081/tasks/getByProjectId?projectId='+this.projectId, httpOptions).subscribe(response => {
    this.tasks=response  
    this.tasks.forEach((task: any) => {
        this.status = task.status;
        console.log(this.status)
        if (this.status.includes('To Do') || this.status.includes('todo')) {
          this.todo.push(task);
        } else if (this.status.includes('In Progress') || this.status.includes('inProgress')) {
          this.inProgress.push(task);
        } else if (this.status.includes('Done') || this.status.includes('done')) {
          this.done.push(task);
        }
      });
    });
  }
  getProjName(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    
    this.http.get('http://localhost:8081/projects/get?id='+this.projectId,httpOptions).subscribe(response=>{
      this.proj=response
      this.projectName=this.proj.name
    })
  }
  // getTasksStatus() {
  //   // Add the userId to the API request headers
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     }),
  //   };
  //   this.http.get<any[]>('http://localhost:8081/tasks/list', httpOptions).subscribe(response => {
  //     this.tasks = response;
  //     this.tasks.forEach((task: any) => {
  //       this.status = task.status;
  //       if (this.status.includes('To Do') || this.status.includes('todo')) {
  //         this.todo.push(task);
  //       } else if (this.status.includes('In Progress') || this.status.includes('inProgress')) {
  //         this.inProgress.push(task);
  //       } else if (this.status.includes('Done') || this.status.includes('done')) {
  //         this.done.push(task);
  //       }
  //     });
  //   });
  // }
}
