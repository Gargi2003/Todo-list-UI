import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service.service';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {
  constructor(
    private route: ActivatedRoute, private apiService: ApiService) { }
  // projectId: any;
  projectId: any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectId = Number(params['projectId']);
    });
    console.log(this.projectId)

    this.GetSprints();
  }
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  isSprintCreated: boolean = false;
  GetSprints() {
    this.apiService.getSprintByProjectId(this.projectId).subscribe(response => {
      console.log(response)
      if (response == null) {
        this.isSprintCreated = false;
      }
    })
  }

}
