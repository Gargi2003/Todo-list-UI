import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ApiService} from '../services/api-service.service'

interface MyObject {
  key: string;
  projectName: string;
}

@Component({
  selector: 'app-your-work',
  templateUrl: './your-work.component.html',
  styleUrls: ['./your-work.component.css']
})
export class YourWorkComponent {
  ngOnInit() {
    this.Projects();
    this.Audit();
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

  constructor(private router: Router, private apiService: ApiService
  ) { }

  projectId: any;
  myMap: Map<number, MyObject> = new Map();
  Projects() {
    this.apiService.getProjects().subscribe(response => {
      this.project = response;

      for (let i = 0; i < this.project.length; i++) {
        this.myMap.set(this.project[i].id, { key: this.project[i].project_key, projectName: this.project[i].name });
      }
    });
  }

  navigateToTasks(projectId: number) {
    this.router.navigate(['/tasks'], { queryParams: { projectId: projectId } });
  }

  audit: any;
  tasksByCreateDate: { createDate: string, label: string, tasks: any[] }[] = [];
  issueType: any
  projName: any
  key: any
  Audit() {
    this.apiService.getAuditList().subscribe(response => {
      this.audit = response;
      // Group tasks by create date
      const groupedTasks: { [key: string]: any[] } = {};
      for (const task of this.audit) {
        const createDate = task.created_at.split('T')[0]; // Extract the date portion

        // Check if the create date group already exists
        if (!groupedTasks.hasOwnProperty(createDate)) {
          groupedTasks[createDate] = [];
        }

        // Check if the project ID exists in myMap
        const project = this.myMap.get(task.project_id);
        if (project) {
          groupedTasks[createDate].push({
            ...task,
            projName: project.projectName,
            key: project.key
          });
        }
      }

      // Convert the grouped tasks into the tasksByCreateDate array
      for (const createDate in groupedTasks) {
        if (groupedTasks.hasOwnProperty(createDate) && groupedTasks[createDate].length > 0) {
          const label = this.getLabel(createDate);
          this.tasksByCreateDate.push({ createDate: createDate, label: label, tasks: groupedTasks[createDate] });
        }
      }
    });
  }



  getLabel(date: any): string {
    const createDate = new Date(date);
    const createMonth = createDate.getMonth();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[createMonth];
  }


}
