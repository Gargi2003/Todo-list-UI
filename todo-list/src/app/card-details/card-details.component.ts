import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service'

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  selectedTask: any;
  timeDifference: any;
  selectedStatus: string = '';
  result: any

  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService) { }
  @Input() task: any;
  @Input() projectName: string = '';
  @Input() projectId: any;
  ngOnInit() {
    this.selectedStatus = this.task.status;
  }

  onCloseClick() {
    this.modalService.dismissAll();
    this.router.navigate(['/tasks'], { queryParams: { projectId: this.projectId } });

  }
  isDropdownOpen = false;

  //delete task
  onClickDelete() {
    this.apiService.deleteTask(this.task.id).subscribe((response: any) => {
      if (response.includes("Deleted")) {
        this.modalService.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks'], { queryParams: { projectId: this.projectId } });
      }
    })
  }
  //update description
  onSaveClickDescription() {
    const body = {
      description: this.task.description
    }
    this.apiService.editTask(this.task.id, body)
      .subscribe((response: any) => {
        if (response.includes("successfully")) {
          //add toaster
        }
      })
  }
  //update comment
  onSaveClickComment() {
    const body = {
      comments: this.task.comments
    }
    this.apiService.editTask(this.task.id,body)
    .subscribe((response: any) => {
      if (response.includes("successfully")) {
        //add toaster
      }
    })
  }
  //update status
  updateStatus() {
    const body = {
      status: this.selectedStatus
    };
    this.apiService.editTask(this.task.id,body)
    .subscribe((response: any) => {
      if (response.includes("successfully")) {
        //add toaster
        this.router.routeReuseStrategy.shouldReuseRoute = () => false; // Reload the route
        this.router.onSameUrlNavigation = 'reload'; // Reload the route
        this.router.navigate(['/tasks'], { queryParams: { projectId: this.projectId } });
      }
    })
  }
  //update assignee
  updateAssignee() {
    const body = {
      assignee: this.task.assignee
    };

    this.apiService.editTask(this.task.id,body)
      .subscribe((response: any) => {

        if (response.includes("successfully")) {
        }
        // Handle the response and update the UI if needed
      });
  }

  //update reporter
  updateReporter() {
    const body = {
      reporter: this.task.reporter
    };

    this.apiService.editTask(this.task.id,body)
      .subscribe((response: any) => {

        if (response.includes("successfully")) {
        }
        // Handle the response and update the UI if needed
      });
  }
  //update points
  updatePoints() {
    const body = {
      points: this.task.points
    };

    this.apiService.editTask(this.task.id,body)
      .subscribe((response: any) => {

        if (response.includes("successfully")) {
        }
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
