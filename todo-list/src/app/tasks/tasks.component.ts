import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';
import{ApiService} from '../services/api-service.service'
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
    this.TaskByProjId();
    this.ProjName();
    this.listSprint()
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
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  openModal(task: any) {
    const modalRef = this.modalService.open(CardDetailsComponent, this.modalOptions);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.projectName = this.projectName;
    modalRef.componentInstance.projectId= this.projectId
  }

  TaskByProjId(){
    this.apiService.getTaskByProjId(this.projectId).subscribe(response => {
    this.tasks=response  
    this.tasks.forEach((task: any) => {
        this.status = task.status;
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
  key:any
  ProjName(){
    this.apiService.getProjName(this.projectId).subscribe(response=>{
      this.proj=response
      this.projectName=this.proj.name
      this.key=this.proj.project_key
    })
  }
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  TaskBySprint(){
    this.apiService.getTaskBySprint(this.projectId).subscribe(response=>{
      this.proj=response
      this.projectName=this.proj.name
      this.key=this.proj.project_key
    })
  }
  sprintInfo:any
  listSprint(){
    this.apiService.getSprintList().subscribe(response=>{
      this.sprintInfo=response
      console.log(this.sprintInfo)
    })
  }
  
}
