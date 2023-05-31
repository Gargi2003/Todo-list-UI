import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  selectedTask: any;
  timeDifference:any;
  

  constructor(private modalService: NgbModal) { }
  @Input() task: any;

  onCloseClick() {
    // Close the modal
    this.modalService.dismissAll();
  }

   getRelativeTime(timestamp:string) {
    
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    if(currentDate.getTime()> targetDate.getTime()){
      this.timeDifference = currentDate.getTime() - targetDate.getTime();
    }else{
      this.timeDifference = targetDate.getTime()-currentDate.getTime() ;
    }
    
    const hoursAgo = Math.floor(this.timeDifference / (1000 * 60 * 60));
    return hoursAgo + ' hours ago';
  }
  selectedButton: string = 'comments';

  selectButton(button: string): void {
    this.selectedButton = button;
  }

  // textareaFocused: boolean = false;
  // saveClicked: boolean = false;

  commentTextareaFocused:boolean=false

  showButtons: boolean = false;

  onTextareaClick() {
    this.showButtons = true;
  }
  onCancelClick() {
    this.showButtons = false;
  }
  onTextareaFocusOut() {
    // Delay hiding the buttons to allow clicking on the buttons without triggering focusout
    setTimeout(() => {
      this.showButtons = false;
    }, 200);
  }
  onSaveClick() {
    this.showButtons=true;
    // Perform the save operation here
  }
  // onTextareaFocus() {
  //   this.textareaFocused = true;
  // }

  // onTextareaBlur() {
  //   if (!this.saveClicked) {
  //     this.textareaFocused = false;
  //   }
  // }

  // onTextareaClick() {
  //   this.saveClicked = false;
  // }

  // onSaveClick() {
  //   this.saveClicked = true;
  // }


  onTextareaFocusComment() {
    this.commentTextareaFocused = true;
  }

  onTextareaBlurComment() {
    this.commentTextareaFocused = false;
  }


  // getRelativeTime(timestamp: string): string {
  //   const now = moment();
  // const time = moment(timestamp);

  // const duration = moment.duration(now.diff(time));
  // const minutes = duration.asMinutes();
  // const seconds = duration.asSeconds();

  // if (seconds < 60) {
  //   return `${Math.floor(seconds)} seconds ago`;
  // } else if (minutes < 60) {
  //   return `${Math.floor(minutes)} minutes ago`;
  // } else {
  //   return time.fromNow();
  // }
    
  // }

}
