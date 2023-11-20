import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, interval } from "rxjs";
import { AuthService } from "../auth.service";
import { UserInterface } from "../../assets/interfaces/user-interface";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  user: UserInterface | undefined;
  disabled: boolean = false;
  sendButtonValue = new BehaviorSubject<string>('Отправить');
  message: string = '';

  form: FormGroup = this.fb.group({
    login: ['', Validators.required]
  })

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  startTimer(seconds: number) {
    const sub = interval(1000).subscribe(() => {
      seconds--
      this.sendButtonValue.next(this.transformSecondsToMinutes(seconds))
    });
    setTimeout(() => {
      sub.unsubscribe();
      this.disabled = false;
      this.sendButtonValue.next('Отправить')
    }, seconds * 1000);
  }

  transformSecondsToMinutes(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return '0'+minutes + ':' + (value < 10 || value > 59 ? '0':'') + (value - minutes * 60);
  }

  login(){
    this.disabled = true;
    this.authService.login(this.form.value.login)
      .subscribe((res) => {
      this.user = res
        if(!this.user){
          const x = document.getElementById("error");
          x!.className = "show";
          setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 5000);
          this.startTimer(60);
        } else {
          this.disabled = false;
          this.message = `Вы успешно вошли, имя пользователя: ${this.user.name}`
        }
    })
  }

  resetUserName(){
    this.message = '';
  }
}
