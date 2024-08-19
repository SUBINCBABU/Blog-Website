import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myblog',
  standalone: true,
  imports: [],
  templateUrl: './myblog.component.html',
  styleUrl: './myblog.component.css'
})
export class MyblogComponent implements OnInit{
  user_blog:any
  message:any
  msag="please login"
  constructor(
    private lservice:userService,private router:Router
  ){}
  ngOnInit(): void {
   this.lservice.myblog().subscribe((data:any)=>{
console.log("response",data);

if(data=="please login for view")
{
  this.message=data
  alert(this.message)
  this.router.navigateByUrl("/login")


}
else{
  const data1 = data.blogs

const maxLength: number = 200; // Maximum length for truncation
// Truncate strings in place
data1.forEach((data: { description: string; }) => {
  if (data.description.length > maxLength) {
    data.description = data.description.substring(0, maxLength);
  }
});


this.user_blog=data.blogs
   }
  
}

  )}
 
 
  getView(blog: any) {
    //console.log("blog id:",blog);
    this.router.navigateByUrl(`view/${blog}`)
    //     this.lservice.view(blog._id).subscribe((data:any)=>{
    // console.log("response",data);

    //    })

  } 

}
