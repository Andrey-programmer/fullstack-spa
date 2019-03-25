import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component:  RegisterPageComponent},
    ]
  },
  {
    path: '', loadChildren: './shared/layouts/system-layout/system-layouts.module#SystemLayoutsModule'
  }
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
