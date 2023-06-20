import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { PagingConfig } from './_models/paging-config.model';
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
  constructor(private http: HttpClient){
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
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getProjects();
  }
  searchProjects() {
    if (this.searchKeyword.trim() !== '') {
      console.log("projects",this.project)
      this.filteredProjects = this.project.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      console.log("filtered",this.filteredProjects)
      console.log(this.searchKeyword)
    } else {
      this.filteredProjects = this.project;
    }
  }
  clearSearch(){
    this.searchKeyword=''
  }
}
