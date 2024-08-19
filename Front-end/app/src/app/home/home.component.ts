import { Component } from '@angular/core';
import { userService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  img: string = ""
  ttl: string = ""
  dsptn: string = ""
  user_blog: any
  constructor(
    private lservice: userService, private router: Router
  ) { }

  ngOnInit(): void {
    this.lservice.allblogs().subscribe((data: any) => {
      //console.log("response",data);

      const data1 = data

      const maxLength: number = 200; // Maximum length for truncation
      // Truncate strings in place
      data1.forEach((data: { description: string; }) => {
        if (data.description.length > maxLength) {
          data.description = data.description.substring(0, maxLength);
        }
      });

      //console.log(data1);

      this.user_blog = data
    })
  }





  getView(blog: any) {
    //console.log("blog id:",blog);
    this.router.navigateByUrl(`view/${blog}`)
    //     this.lservice.view(blog._id).subscribe((data:any)=>{
    // console.log("response",data);

    //    })

  }

}
