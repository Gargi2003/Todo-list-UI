import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service.service'

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  userId: any;
  tasks: any
  ngOnInit() {
    // Get the userId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      // Make the API request to fetch tasks for the specific user
      this.TasksByUserId();
    });
    this.Projects()
  }
  filteredProjects: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = 0;
  pagingConfig: PagingConfig = {} as PagingConfig;
  projects: any[] = []
  page: number = 1;
  project: any


  Projects() {
    this.apiService.getProjects().subscribe(response => {
      this.project = response
      this.pagingConfig.totalItems = this.project.length;
      this.filteredProjects = this.project;
    })
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.Projects();
  }

  TasksByUserId() {
    // Make the API request to fetch tasks for the specific user
    this.apiService.getTasksByUserId().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        // Handle error case, show an error message or perform other actions
      }
    );
  }


}
