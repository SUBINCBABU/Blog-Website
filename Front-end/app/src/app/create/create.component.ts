import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  bform!: FormGroup
  notification = ""
  constructor(private fb: FormBuilder, private sservice: userService, private router: Router) { }
  ngOnInit(): void {

    this.bform = this.fb.group({
      title: "",
      image: "",
      description: ""
    })
  }




  bformget(form: FormGroup) {
    const data = {
      title: form.value.title,
      image: form.value.image,
      description: form.value.description
    }
    console.log(form.value.title);
    this.sservice.create(data).subscribe((res: any) => {
      console.log(res);

      if (res.status == "success") {
        this.router.navigateByUrl("/myblog")

      }


    })
  }


}

