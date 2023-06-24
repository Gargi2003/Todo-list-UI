import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

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
export class DashboardComponent implements OnInit{
  constructor(private router: Router,private http: HttpClient,private route: ActivatedRoute){
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  userId: any;
  tasks:any
ngOnInit() {
  // Get the userId from the route parameters
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('userId');
    // Make the API request to fetch tasks for the specific user
    this.getTasks();
  });
  this.getProjects()
}
filteredProjects: any[] = [];
currentPage:number  = 1;
itemsPerPage: number = 2;
totalItems: number = 0;
pagingConfig: PagingConfig = {} as PagingConfig;
projects:any[]=[]
page: number = 1;
project:any


getProjects(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  this.http.get('http://localhost:8081/projects/list',httpOptions).subscribe(response=>{
    this.project=response
    this.pagingConfig.totalItems = this.project.length;
    this.filteredProjects = this.project;
  })
}
onTableDataChange(event:any){
  this.pagingConfig.currentPage  = event;
  this.getProjects();
}

getTasks() {
  // Add the userId to the API request headers
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  // Make the API request to fetch tasks for the specific user
  this.http.get<any[]>(`http://localhost:8081/tasks/getByUserId`, httpOptions).subscribe(
    (response) => {
      this.tasks = response;
      },
    (error) => {
      // Handle error case, show an error message or perform other actions
    }
  );
}


}
