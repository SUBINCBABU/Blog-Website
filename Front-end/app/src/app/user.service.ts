import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class userService {


  constructor(private client: HttpClient) { }

  baseUrl = "http://localhost:2000/"

  login(user: any) {
    return this.client.post(`${this.baseUrl}login`, user)
  }
  signup(user: any) {
    return this.client.post(`${this.baseUrl}signup`, user)
  }
  create(blog: any) {
    return this.client.post(`${this.baseUrl}create`, blog)

  }


  views(blog: any) {
    return this.client.post(`${this.baseUrl}views`, blog)

  }

  myblog() {
    return this.client.get(`${this.baseUrl}myblog`)
  }
  allblogs() {
    return this.client.get(`${this.baseUrl}allblogs`)
  }
  logout() {
    return this.client.get(`${this.baseUrl}logout`)
  }
  view(id: any) {
    return this.client.get(`${this.baseUrl}view/${id}`)
  }
  Like(data: any) {
    return this.client.post(`${this.baseUrl}like/${data}`,"")
  }
  comment(b_id: any,cmnt:any) {
    return this.client.post(`${this.baseUrl}comment/${b_id}`, cmnt)
  }
  replay(c_id: any, rply: any) {
    return this.client.post(`${this.baseUrl}replay/${c_id}`, rply)
  }
}
