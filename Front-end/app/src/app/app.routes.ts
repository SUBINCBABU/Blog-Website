import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyblogComponent } from './myblog/myblog.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
    
    {path:"",component:HomeComponent},
    { path: 'login',component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path: "myblog",component:MyblogComponent},
    {path:"create",component:CreateComponent},
    {path:"view/:id",component:ViewComponent}

];
