import { Injectable } from '@angular/core';
import { UserInterface } from "../assets/interfaces/user-interface";

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
      login: ['user@gmail.com', 'User User']
    }
  ];

  constructor() { }

  login(login: string) {
      return this.users.find((user) => (user.login.includes(login.toLowerCase())));
  }
}
