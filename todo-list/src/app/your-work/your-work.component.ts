import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-work',
  templateUrl: './your-work.component.html',
  styleUrls: ['./your-work.component.css']
})
export class YourWorkComponent {
  ngOnInit() {
    this.getProjects();
  }

  getRandomColor() {
    const colors = [
      '#FFF59D', // Light yellow
      '#FFD180'  // Light orange
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
  project: any;
  

  constructor(private http: HttpClient,private router: Router) { }

  projectId:any
  getProjects() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.http.get('http://localhost:8081/projects/list', httpOptions).subscribe(response => {
      this.project = response;
    });
  }
  navigateToTasks(projectId: number) {
    this.router.navigate(['/tasks'], { queryParams: { projectId: projectId } });
  }
}
