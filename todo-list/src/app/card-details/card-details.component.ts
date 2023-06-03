import { Component, Input } from '@angular/core';
// import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  selectedTask: any;
  timeDifference: any;
  selectedStatus: string = '';
  result:any

  constructor(private router: Router,private modalService: NgbModal,private http: HttpClient) { }
  @Input() task: any;

  ngOnInit() {
    this.selectedStatus = this.task.status;
    // console.log("status", this.selectedStatus)
  }

  onCloseClick() {
    this.modalService.dismissAll();
  }
  isDropdownOpen = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  //delete task
  onClickDelete() {
    this.http.delete('http://localhost:8081/tasks/delete?id='+this.task.id,this.httpOptions).subscribe((response:any) => {
      // console.log(response)
      if (response.includes("Deleted")) {
        // console.log("entered success")
        this.modalService.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks']);
      }
    })
  }
  //update description
  onSaveClickDescription() {
    const body={
      description: this.task.description
    }
    this.http.put('http://localhost:8081/tasks/edit?id='+this.task.id,body,this.httpOptions).subscribe((response:any)=>{
      if(response.includes("successfully")){
        //add toaster
      }
    })
  }
  //update comment
  onSaveClickComment(){
    const body={
      comments: this.task.comments
    }
    this.http.put('http://localhost:8081/tasks/edit?id='+this.task.id,body,this.httpOptions).subscribe((response:any)=>{
      if(response.includes("successfully")){
        //add toaster
        console.log("success")
      }
    })
  }
  //update status
  updateStatus(){
    console.log(this.selectedStatus)
    const body = {
      status: this.selectedStatus
    };
    this.http.put('http://localhost:8081/tasks/edit?id='+this.task.id,body,this.httpOptions).subscribe((response:any)=>{
      if(response.includes("successfully")){
        //add toaster
        console.log("success")
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks']);
      }
    })
  }
  //update assignee
  updateAssignee() {
    const body = {
      assignee: this.task.assignee
    };
  
    this.http.put('http://localhost:8081/tasks/update-assignee?id=' + this.task.id, body, this.httpOptions)
      .subscribe(response => {
        console.log(response);
        // Handle the response and update the UI if needed
      });
  }
  
  getRelativeTime(timestamp: string) {

    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    if (currentDate.getTime() > targetDate.getTime()) {
      this.timeDifference = currentDate.getTime() - targetDate.getTime();
    } else {
      this.timeDifference = targetDate.getTime() - currentDate.getTime();
    }

    const hoursAgo = Math.floor(this.timeDifference / (1000 * 60 * 60));
    return hoursAgo + ' hours ago';
  }
  selectedButton: string = 'comments';

  selectButton(button: string): void {
    this.selectedButton = button;
  }


  onCancelClick() {
  }





}
