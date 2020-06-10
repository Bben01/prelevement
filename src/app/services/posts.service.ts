import { AuthService } from './auth.service';
import { Post } from './../models/post.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable()
export class PostsService {
  posts: Post[] = [];
  user: {"auth": boolean, "admin": boolean, "uid": string};
  postSubject = new Subject<Post[]>();
  userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: {"auth": boolean, "admin": boolean, "uid": string}) => {
        this.user = user;
        this.getPosts();
      });
    this.authService.emitUser();
  }

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  savePost() {
    firebase.database().ref('/posts_id/' + this.user["uid"]).set(this.posts);
  }

  getPosts() {
    console.log("isAdmin:", this.user["admin"])
    if (this.user["admin"]) {
      this.getAdminPosts();
    }
    else if (this.user["uid"]) {
      this.getUserPost(this.user["uid"]);
    }
  }

  getUserPost(uid: string) {
    firebase.database().ref('/posts_id/' + uid)
      .on('value', (data: firebase.database.DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }

  getAdminPosts() {
    firebase.database().ref('/posts_id')
      .on('value', (data: firebase.database.DataSnapshot) => {
        // TODO: Je crois quil faut voir comment le data est formatté
        this.posts = [];
        if(data.val()) {
          for(let userPosts in data.val()) {
            this.posts = this.posts.concat(data.val()[userPosts]);
          }
          console.log(this.posts);
        }
        this.emitPosts();
      });
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePost();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePost();
    this.emitPosts();
  }
}
