import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private userId!: string;

  setUser(userId:string){
    this.userId=userId
  }
  getUser():string{
    return this.userId
  }
}
