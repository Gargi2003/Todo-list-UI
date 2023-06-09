import { Component,OnInit } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service'

interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
@Component({
  selector: 'app-project-view-all',
  templateUrl: './project-view-all.component.html',
  styleUrls: ['./project-view-all.component.css']
})

export class ProjectViewAllComponent implements OnInit{
  constructor(private router: Router,private apiService: ApiService){
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  ngOnInit() {
    this.getProjects()
  }
  filteredProjects: any[] = [];
  searchKeyword: string = '';
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  tableSize:any
  pagingConfig: PagingConfig = {} as PagingConfig;
  projects:any[]=[]
  page: number = 1;
  project:any
  getProjects(){
    this.apiService.getProjects().subscribe(response=>{
      this.project=response
      this.pagingConfig.totalItems = this.project.length;
      this.filteredProjects = this.project;
    })
  }
  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getProjects();
  }

  searchProjects() {
    if (this.searchKeyword.trim() !== '') {
      this.filteredProjects = this.project.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
 
    } else {
      this.filteredProjects = this.project;
    }
  }
  clearSearch(){
    this.searchKeyword=''
  }
  deleteProject(id:any) {
    this.apiService.deleteProject(id).subscribe((res: any) => {
      if (res.includes("Deleted")) {
        this.router.navigate(['/view-all-project']);
        location.reload();
      }
    })
  }
  navigateToTasks(projectId: number) {
    this.router.navigate(['/tasks'], { queryParams: { projectId: projectId } });
  }
}
