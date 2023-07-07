import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() projectIds: number | undefined;

  constructor(
    private router: Router,
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
  navigateToTasks() {
    this.router.navigate(['/tasks'], { queryParams: { projectId: this.proj.id } });
  }
}
