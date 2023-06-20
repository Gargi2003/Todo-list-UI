import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent {
  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient) { }

  selectedProject: string = 'Dummy';
  selectedIssueType: string = 'story';
  selectedStatus: string = 'To Do';
  summary: string = '';
  description: string = '';
  assigneeSearchTerm: string = '';
  assigneeResults: string[] = []; // Placeholder for assignee search results
  selectedAssignee: string = '';
  sprint: string = '';
  storyPoints: number = 0;
  reporterSearchTerm: string = '';
  reporterResults: string[] = []; // Placeholder for reporter search results
  selectedReporter: string = '';

  createTask(selectedProject: any, selectedIssueType: any, selectedStatus: any, summary: any, description: any, assigneeSearchTerm: any, sprint: any, storyPoints: number, reporterSearchTerm: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log(selectedProject, selectedIssueType, selectedStatus, summary, description, assigneeSearchTerm, sprint, storyPoints, reporterSearchTerm)
    const task = {
      title: summary,
      description: description,
      status: selectedStatus,
      issue_type: selectedIssueType,
      assignee: assigneeSearchTerm,
      sprint_id: sprint,
      points: storyPoints,
      reporter: reporterSearchTerm
    };
    this.http.post<any>('http://localhost:8081/tasks', task, { headers }).subscribe(response => {
      console.log(response)
      if (response.includes("successfully")) {
        console.log("entered success")
        this.modalService.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks']);
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
    // Implement search functionality for reporter
    // Call backend API (e.g., localhost:8080/getUsers) with the search term reporterSearchTerm
    // Update reporterResults with the search results
  }

  selectReporter(reporter: string) {
    this.selectedReporter = reporter;
  }

  cancel() {
    // Implement cancel functionality
    this.modalService.dismissAll();
  }
}
