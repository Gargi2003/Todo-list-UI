import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent {
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService) { }
  loading: boolean = false;
  selectedProject: string = '';
  selectedIssueType: string = 'story';
  selectedStatus: string = 'To Do';
  summary: string = '';
  description: string = '';
  assigneeSearchTerm: string = '';
  assigneeResults: string[] = []; // Placeholder for assignee search results
  selectedAssignee: string = '';
  selectedSprint: number=0;
  storyPoints: number = 0;
  reporterSearchTerm: string = '';
  reporterResults: string[] = []; // Placeholder for reporter search results
  selectedReporter: string = '';
  projects: any;
  projId: any
  ngOnInit() {
    this.Projects(); // Call the method to retrieve the project list
  }

  Projects() {
    this.apiService.getProjects().subscribe(response => {
      this.projects = response
      console.log(this.projects)
    });
  }
  onProjectSelection() {
    const selectedProject = this.projects.find((project:any) => project.name === this.selectedProject);
    if (selectedProject) {
      this.selectedProject = selectedProject.name; // Update selectedProject to ensure consistency
      this.projId = selectedProject.id;
      this.GetSprint(this.projId)
    } else {
      return;
    }
  }
  sprints:any
  sprintId:any
  onSprintSelection(){
    const selectedSprint = this.sprints.find((sprint:any)=> sprint.name === this.selectedSprint);
    console.log(selectedSprint)
    this.sprintId=selectedSprint.id
  }
 
  GetSprint(projId:number){
    this.apiService.getSprintByProjectId(projId).subscribe(response=>{
      this.sprints=response
      console.log(this.sprints)
    })
  }

  TaskCreate(selectedIssueType: any, selectedStatus: any, summary: any, description: any, assigneeSearchTerm: any,storyPoints: number, reporterSearchTerm: any) {
    this.loading=true
    const task = {
      title: summary,
      description: description,
      status: selectedStatus,
      issue_type: selectedIssueType,
      assignee: assigneeSearchTerm,
      sprint_id: this.sprintId,
      project_id:this.projId,
      points: storyPoints,
      reporter: reporterSearchTerm
    };
    console.log("payload",task)
    this.apiService.createTask(task).subscribe(response => {
      
      if (response.includes("successfully")) {
        this.modalService.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks'], { queryParams: { projectId: this.projId } });
      }
    })

  }

  searchAssignee() {
    // Implement search functionality for assignee
    // Call backend API (e.g., localhost:8080/getUsers) with the search term assigneeSearchTerm
    // Update assigneeResults with the search results
  }

  selectAssignee(assignee: string) {
    this.selectedAssignee = assignee;
  }


  
  searchReporter() {
    this.searchresults=true
    if (this.reporterSearchTerm.trim() !== '') {
      this.apiService.getUsers().subscribe(users => {
        this.reporterResults = users
          .filter((user: any) =>
            user.username.toLowerCase().includes(this.reporterSearchTerm.toLowerCase())
          )
          .map((user: any) => user.username);
      });
    } else {
      this.reporterResults = [];
    }

    if(this.reporterSearchTerm==''){
      this.searchresults=false
    }
  }
  searchresults=false
  selectReporter(reporter: any) {
    this.selectedReporter = reporter;
    this.reporterSearchTerm = reporter;
    this.reporterResults = [];
    this.searchresults=false
  }

  cancel() {
    // Implement cancel functionality
    this.modalService.dismissAll();
  }
}
