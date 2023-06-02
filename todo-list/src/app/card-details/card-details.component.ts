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

  constructor(private router: Router,private modalService: NgbModal,private http: HttpClient) { }
  @Input() task: any;

  ngOnInit() {
    this.selectedStatus = this.task.status;
    console.log("status", this.selectedStatus)
  }

  onCloseClick() {
    this.modalService.dismissAll();
  }
  isDropdownOpen = false;

  toggleDropdown() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.http.delete('http://localhost:8081/tasks/delete?id='+this.task.id,httpOptions).subscribe((response:any) => {
      console.log(response)
      if (response.includes("Deleted")) {
        console.log("entered success")
        this.modalService.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks']);
      }
    })
  }

  onDeleteClick() { }
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


  commentTextareaFocused: boolean = false

  showButtons: boolean = false;

  onTextareaClick() {
    this.showButtons = true;
  }
  onCancelClick() {
    this.showButtons = false;
  }
  onTextareaFocusOut() {
    setTimeout(() => {
      this.showButtons = false;
    }, 200);
  }
  onSaveClick() {
    this.showButtons = true;
  }

  onTextareaFocusComment() {
    this.commentTextareaFocused = true;
  }

  onTextareaBlurComment() {
    this.commentTextareaFocused = false;
  }




}
