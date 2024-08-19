import { Component, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  id: any
  cform!: FormGroup
  blog_id: any
  selected_blog: any
  constructor(
    private lservice: userService, private router: Router, private active: ActivatedRoute, private fb: FormBuilder
  ) { }
  
  comment_length = 0
  like_length = 0
  comment = ''
  replay = ''
  liked: any
  ngOnInit(): void {
    this.blog_id = this.active.snapshot.params['id']
    console.log("view=",this.blog_id);
    this.lservice.view(this.blog_id).subscribe((data: any) => {
      //console.log("selected blog=", data);
      this.comment_length=data.comments.length

      this.selected_blog = data
      this.like_length = data.liked_Users.length
     // console.log("like" ,this.like_length);
      
      this.liked = data.status

    })




    





    this.cform = this.fb.group({

      email: "",
      password: ""
    })

  }



  addLike(id: any){
    this.lservice.Like(id).subscribe((data) => {
    })
    window.location.reload()
  }





  addComment(bid:any){
   // console.log("comment:",this.comment);
    
    let addcmnt={Comment:this.comment}
   // console.log("blog:",bid,"cid:",addcmnt.Comment);
    this.lservice.comment(bid,addcmnt).subscribe((data)=>{
     // console.log(data);
      
    })
    window.location.reload()
  }


  isShowComment = true;

  openCommentBox() {
    this.isShowComment = !this.isShowComment;
  }

  isShowReplay = true;

  openReplayBox() {
    this.isShowReplay= !this.isShowReplay;
  }



  addReplay(id:any,rply:any){
    let addrply={
      Replay:rply
    }
    console.log( "cid",id, "rply:",rply);
    this.lservice.replay(id,addrply).subscribe((data)=>{
      console.log(data);
      
    })
  window.location.reload()
  }
  

}

