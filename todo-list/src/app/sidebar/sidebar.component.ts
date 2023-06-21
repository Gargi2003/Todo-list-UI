import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private http: HttpClient,private route: ActivatedRoute  ) { }
  projectId: any;
  proj:any
  projectName: string=""
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectId = Number(params['projectId']);
    });
    console.log("on init")
    this.getProjName();
  }
  getProjName(){
    console.log("inside getprojname")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    
    this.http.get('http://localhost:8081/projects/get?id='+this.projectId,httpOptions).subscribe((response:any)=>{
      console.log("id",this.projectId)
      this.proj=response
      this.projectName=this.proj.name
      console.log(response)
    })
  }
}
