import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
  constructor(private router: Router, private http: HttpClient) { }
  name = ""
  leader = ""
  key = ""
  id = 0
  createProject() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const proj = {
      name: this.name,
      project_key: this.key,
      leader: this.leader,
    }
    this.http.post('http://localhost:8081/projects', proj, { headers }).subscribe((response: any) => {
      if (response.includes("successfully")) {
        this.router.navigate(['/view-all-project']);
      }
    })
  }
  generateKey() {
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generate a random character between 'A' and 'Z'
    if (this.name.length >= 3) {
      const projectName = this.name.substr(0, 3).toUpperCase();
      this.key = projectName+randomChar;
    } else {
      this.key = this.name.toUpperCase()+randomChar;
    }
  }

  onNameChange() {
    if (this.name === '') {
      this.key = '';
    } else {
      if (!this.key || this.name.length > 3) {
        this.generateKey();
      }
    }
  }
  

}
