import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { ApiService } from '../services/api-service.service'
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
    this.ProjName();
    this.listSprint();
  }
  userId:any
  tasks: any;
  status: string[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  projectId: any;
  proj: any
  projectName: string = ""
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
    modalRef.componentInstance.projectId = this.projectId
  }

  TaskBySprintIdAndProjectId(sprint_id:number,project_id:number) {
    this.apiService.getTaskBySprintAndProject(sprint_id, project_id).subscribe(response => {
      this.tasks = response
      console.log("tasksbysprintproj",this.tasks)
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
  key: any
  ProjName() {
    this.apiService.getProjName(this.projectId).subscribe(response => {
      this.proj = response
      this.projectName = this.proj.name
      this.key = this.proj.project_key
    })
  }
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  sprintInfo: any
  currentSprint: any
  listSprint() {
    this.apiService.getSprintList().subscribe(response => {
      this.sprintInfo = response;
  
      // Filter sprints based on projectId
      const filteredSprints = this.sprintInfo.filter((sprint:any) => sprint.project_id === this.projectId);
  
      for (let j = 0; j < filteredSprints.length; j++) {
        // Find the current sprint
        const currentDate = new Date();
        let closestEndDate = new Date(filteredSprints[0].end_date); // Assuming the first sprint is the closest initially
        this.currentSprint = filteredSprints[0];
  
        for (let i = 1; i < filteredSprints.length; i++) {
          const endDate = new Date(filteredSprints[i].end_date);
          if (endDate > currentDate && endDate < closestEndDate) {
            closestEndDate = endDate;
            this.currentSprint = filteredSprints[i];
          }
        }
  
        console.log('Current Sprint:', this.currentSprint);
        this.TaskBySprintIdAndProjectId(this.currentSprint.id,this.projectId);
      }
    });
  }
  

}
