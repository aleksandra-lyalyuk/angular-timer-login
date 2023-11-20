import { Injectable } from '@angular/core';
import { UserInterface } from "../assets/interfaces/user-interface";
import { delay, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: UserInterface[] = [
    {
      id: 1,
      name: 'Aleksandra Lyalyuk',
      login: ['aleksandralaluk@gmail.com', 'aleksandra lyalyuk']
    },
    {
      id: 2,
      name: 'User User',
      login: ['user@gmail.com', 'user user']
    }
  ];

  constructor() { }

  login(login: string) {
    return of(this.users.find((user) => (user.login.includes(login.toLowerCase())))).pipe(
      delay(1000)
    );
   }

}
