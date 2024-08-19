import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyblogComponent } from './myblog/myblog.component';
import { Router } from '@angular/router';
import { userService } from './user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private service:userService ,private router:Router){}
  title = 'app';
  display = false;
  display1 = false;
  Logout(){
this.service.logout().subscribe((data)=>{
  console.log(data);
  
  this.router.navigateByUrl("/login")
})
  }
  
}
