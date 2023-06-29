import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private route: ActivatedRoute, private apiService: ApiService) { }
  projectId: any;
  proj: any
  projectName: string = ""
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectId = Number(params['projectId']);
    });
    this.ProjName();
  }
  projUrl: any;
  ProjName() {
    this.apiService.getProjName(this.projectId).subscribe((response: any) => {
      this.proj = response
      this.projectName = this.proj.name
      this.projUrl = this.proj.project_avatar
    })
  }
}
