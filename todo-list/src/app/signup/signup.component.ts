import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private apiservice:ApiService) {}

  navigateToSignup(){

  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  signup(email: any, fname: any,lname:any,password:any,cpassword:any){
    const username=fname+" "+lname
    const payload={
      "email":email,
      "username": username,
      "password":password,
    }
    console.log(payload)
    this.apiservice.signupUser(payload).subscribe(response=>{
      if(response.includes("Successfully")){
        console.log("success")
        this.router.navigateByUrl('/login')
      }
    })
  }
}
