import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { SystemLayoutComponent } from './shared/layouts/system-layout/system-layout.component'
import { RegisterPageComponent } from './register-page/register-page.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SystemLayoutComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 