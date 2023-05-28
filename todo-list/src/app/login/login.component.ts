import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode'; // Import jwt_decode library

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) { }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  login(username: string, password: string) {
    const payload = {
      username,
      password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("inside login")
    console.log(payload)
    // Make a POST request to the login API endpoint
    this.http.post<any>('http://localhost:8080/users/login', payload).subscribe(
      (response) => {
        // If login is successful, navigate to the dashboard page
        if (response.status === 200) {
          // Save the JWT token from the response in the localStorage
          localStorage.setItem('token', response.token);

          // Extract the user_id from the JWT token
          const decodedToken: any = jwt_decode(response.token);
          const userId: string = decodedToken.sub;
          console.log(userId)
          // Redirect to the dashboard page with the extracted user_id
          this.router.navigate(['/dashboard', { userId: userId }]);
        } else {
          console.log("failure!!")
          console.log(payload)
          // Handle login failure, show an error message or perform other actions
        }
      },
      (error) => {
        // Handle error case, show an error message or perform other actions
      }
    );
  }
}
