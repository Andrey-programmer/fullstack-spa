import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']    
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(
    private auth: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  form:FormGroup
  aSub: Subscription

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]
      )
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Теперь вы можете войти в систему, используя свои данные
        MaterialService.toast('Теперь вы можете войти в систему')
      } else if (params['accessDenied']) {
        // Пожалуйста, авторизуйтесь в системе!
        MaterialService.toast('Авторизуйтесь в системе')
      } else if (params['sessionFailed']){
        MaterialService.toast('Пожалуйста авторизуйтесь заново')
      }
    })
  }

 
  onSubmit() {
    /* const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    } */
    //Отключаем форму на время запроса
    this.form.disable()

    const user: User = this.form.value
    
    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/overview'])
        console.log('Login success')
      },
      (error) => {
        MaterialService.toast(error.error.message)
        // console.log(JSON.stringify(error.error.message))
        //Включаем форму если ошибка авторизации
        this.form.enable()
      } 
    )

  }
  ngOnDestroy() {
    if(this.aSub) {
      this.aSub.unsubscribe()
    } 
  }

}
