import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserInterface } from "../../assets/interfaces/user-interface";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  user: UserInterface | undefined;
  interval: any;
  disabled: boolean = false;
  minutes: string = '01:00';
  message: string = '';

  form: FormGroup = this.fb.group({
    login: ['', Validators.required]
  })

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  startTimer(interval: number) {
    this.interval = setInterval(() => {
      if (interval === 0) {
        this.disabled = false;
        clearInterval(this.interval);
      } else {
        interval--;
        this.minutes = this.transformSecondsToMinutes(interval)
      }
    }, 1000);
  }

  transformSecondsToMinutes(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return '0'+minutes + ':' + (value < 10 || value > 59 ? '0':'') + (value - minutes * 60);
  }

  login(){
    this.disabled = true;
    this.user = this.authService.login(this.form.value.login);

    if(!this.user){
      const x = document.getElementById("error");
      x!.className = "show";
      setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
      this.startTimer(60);
    } else {
      this.disabled = false;
      this.message = `Вы успешно вошли, имя пользователя: ${this.user.name}`
    }
  }

  resetUserName(){
    this.message = '';
  }
}
