import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }
  private apiUrl = 'http://localhost:8081';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  getTasksByUserId():Observable<any>{
    return this.http.get<any[]>(`http://localhost:8081/tasks/getByUserId`, this.httpOptions)
  }
  getTaskByProjId(projectId: number): Observable<any> {
    return this.http.get('http://localhost:8081/tasks/getByProjectId?projectId=' + projectId, this.httpOptions)
  }
  getProjName(projectId: number): Observable<any> {
    return this.http.get('http://localhost:8081/projects/get?id=' + projectId, this.httpOptions)
  }
  getTaskBySprint(sprintId: number): Observable<any> {
    return this.http.get('http://localhost:8081/tasks/getBySprintId?sprintId=' +sprintId, this.httpOptions)
  }
  getSprintList():Observable<any>{
    return this.http.get('http://localhost:8081/sprints/list',this.httpOptions)
  }
  getAuditList():Observable<any>{
    return this.http.get('http://localhost:8081/audit/list', this.httpOptions)
  }
  getProjects():Observable<any>{
    return this.http.get('http://localhost:8081/projects/list', this.httpOptions)
  }

  
  deleteProject(id:number):Observable<any>{
    return this.http.delete('http://localhost:8081/projects/delete?id='+id , this.httpOptions )
  }
  deleteTask(id:number):Observable<any>{
    return this.http.delete('http://localhost:8081/tasks/delete?id='+id,this.httpOptions)
  }


  createProject(proj:any):Observable<any>{
    return this.http.post('http://localhost:8081/projects', proj, this.httpOptions  )
  }
  createTask(task:any):Observable<any>{
    return this.http.post<any>('http://localhost:8081/tasks', task,this.httpOptions)
  }
  loginUser(payload:any):Observable<any>{
    return this.http.post<any>('http://localhost:8080/users/login', payload)
  }
 
  editTask(id:any, body:any):Observable<any>{
    return this.http.put('http://localhost:8081/tasks/edit?id='+id,body,this.httpOptions)
  }
}
