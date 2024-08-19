import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../user.service';
import { log } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  sform!:FormGroup
  isLoggedIn:boolean=false
  constructor(private fb: FormBuilder,private lservice:userService,private router:Router) { }
  ngOnInit(): void {
    
    this.sform=this.fb.group({
      
      email:"",
      password:""
    })
  }
  
 


sformget(form:FormGroup){
  const data={
   
    email:form.value.email,
    password:form.value.password
  }
  console.log(form.value.email);
  console.log(form.value.password);

 this.lservice.login(data).subscribe((res:any)=>{
  console.log(res);
  this.router.navigateByUrl("/myblog")
 })
}


  
}
