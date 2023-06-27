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
  avatars = [
    "https://i.postimg.cc/FdsHx7b0/astronaut.png",
    "https://i.postimg.cc/8FG5jyjK/astronaut-1.png",
    "https://i.postimg.cc/SnM2X2Vs/brush.png",
    "https://i.postimg.cc/HVfjCWHC/cpu.png",
    "https://i.postimg.cc/ykJW5gMP/gachapon.png",
    "https://i.postimg.cc/1nC57sM2/galaxy.png",
    "https://i.postimg.cc/kBDtmhbW/paint.png",
    "https://i.postimg.cc/hJRJVD30/paint-palette.png",
    "https://i.postimg.cc/JtpBSWG1/painting.png",
    "https://i.postimg.cc/MX6QsGZP/painting-1.png",
    "https://i.postimg.cc/NKmFGhf2/planning.png",
    "https://i.postimg.cc/67hQRdZ9/project.png",
    "https://i.postimg.cc/w3470cGM/sample.png",
    "https://i.postimg.cc/vDZ4rSXC/sample-1.png",
    "https://i.postimg.cc/SYnQw3vs/solar-system.png",
    "https://i.postimg.cc/2VJL8FQM/starry-night.png",
    "https://i.postimg.cc/JH0tRGGR/ufo.png",
    "https://i.postimg.cc/34KdbLh4/ufo-1.png",
    "https://i.postimg.cc/r0QK6Syh/ufo-2.png",
    "https://i.postimg.cc/SXLnrBBb/ufo-3.png"
  ];
  createProject() {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const proj = {
      name: this.name,
      project_key: this.key,
      leader: this.leader,
      project_avatar: this.getRandomAvatar()
    }
    this.http.post('http://localhost:8081/projects', proj, headers ).subscribe((response: any) => {
      if (response.includes("successfully")) {
        this.router.navigate(['/view-all-project']);
      }
    })
  }
  generateKey() {
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generate a random character between 'A' and 'Z'
    if (this.name.length >= 3) {
      const projectName = this.name.substr(0, 3).toUpperCase();
      this.key = projectName + randomChar;
    } else {
      this.key = this.name.toUpperCase() + randomChar;
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
  getRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[randomIndex];
  }

}
