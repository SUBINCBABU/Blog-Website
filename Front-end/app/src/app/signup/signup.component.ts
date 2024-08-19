import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userService } from '../user.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent  implements OnInit{
  sform!:FormGroup
  notification=""
  constructor(private fb: FormBuilder,private  sservice:userService, private router:Router) { }
  ngOnInit(): void {
    
    this.sform=this.fb.group({
      name:"",
      email:"",
      password:""
    })
  }
  
  


sformget(form:FormGroup){
  const data={
    name:form.value.name,
    email:form.value.email,
    password:form.value.password
  }
  console.log(form.value.name);
  console.log(form.value.em);

  this.sservice.signup(data).subscribe((res:any)=>{
    console.log(res);

   if(res.status=="signup success")
    {
      this.router.navigateByUrl("/login")
 
   }
    
    
  })
}
    
  
}
