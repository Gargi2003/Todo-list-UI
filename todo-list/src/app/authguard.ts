import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      // Make a request to the server to validate the token
      return this.authService.validateToken().pipe(
        map((response) => {
          // Token is valid, user is authenticated
          console.log("response from authguard"+response)
          return true;
        }),
        catchError((error) => {
          // Token is invalid or expired, redirect to login
          console.log("response from authguard"+error)
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      // Token is not present, redirect to login
      console.log("response from authguard"+"token not present")
      this.router.navigate(['/login']);
      return of(false);
    }
  }

}
