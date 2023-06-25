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
    this.getAudit();
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

  constructor(private http: HttpClient, private router: Router) { }

  projectId: any;

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

  audit: any;
  tasksByCreateDate: { createDate: string, label: string, tasks: any[] }[] = [];
  issueType: any
  getAudit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    this.http.get('http://localhost:8081/audit/list', httpOptions).subscribe(response => {
      this.audit = response;
      // Group tasks by create date
      const groupedTasks: { [key: string]: any[] } = {};
      for (const task of this.audit) {
        const createDate = task.created_at.split('T')[0]; // Extract the date portion

        // Check if the create date group already exists
        if (!groupedTasks.hasOwnProperty(createDate)) {
          groupedTasks[createDate] = [];
        }

        // Add the task to the respective create date group
        groupedTasks[createDate].push(task);
        this.getProjectById(task.project_id)
        this.issueType = task.issue_type
      }

      // Convert the grouped tasks into the tasksByCreateDate array
      for (const createDate in groupedTasks) {
        if (groupedTasks.hasOwnProperty(createDate)) {
          const label = this.getLabel(createDate);
          this.tasksByCreateDate.push({ createDate: createDate, label: label, tasks: groupedTasks[createDate] });
        }
      }
    });
  }

  key: any;
  proj: any;
  projname: any;

  getProjectById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.http.get('http://localhost:8081/projects/get?id=' + id, httpOptions).subscribe(response => {
      this.proj = response;
      this.key = this.proj.project_key;
      this.projname = this.proj.name;
    });
  }

  getLabel(date: any): string {
    const createDate = new Date(date);
    const createMonth = createDate.getMonth();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[createMonth];
  }


}
