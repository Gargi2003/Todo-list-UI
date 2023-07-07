import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode'; // Import jwt_decode library
import { ApiService } from '../services/api-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient,private apiService: ApiService) { }


  login(username: string, password: string) {
    const payload = {
      username,
      password
    };

    // Make a POST request to the login API endpoint
    this.apiService.loginUser(payload).subscribe(
      (response) => {
        // If login is successful, navigate to the dashboard page
        if (response.status === 200) {
          // Save the JWT token from the response in the localStorage
          localStorage.setItem('token', response.token);

          // Extract the user_id from the JWT token
          const decodedToken: any = jwt_decode(response.token);
          const userId: string = decodedToken.sub;
          // Redirect to the dashboard page with the extracted user_id
          this.router.navigate(['/dashboard', { userId: userId }]);
        } else {
      
          // Handle login failure, show an error message or perform other actions
        }
      },
      (error) => {
        // Handle error case, show an error message or perform other actions
      }
    );
  }
}
