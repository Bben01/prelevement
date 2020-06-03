import { PieceService } from './../services/piece.service';
import { Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { Post } from './../models/post.model';
import { Component, OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  expand: boolean[];
  isDate: boolean = true;
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router, private pieceService: PieceService) { }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
    this.expand = new Array(this.posts.length).fill(false)
  }

  onDeletePost(post: Post) {
    this.pieceService.addOne(post.pieceId);
    this.postsService.removePost(post);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  getDate(index: number) {
    return new Date(this.posts[index].date);
  }

  sortByPiece() {
    this.isDate = !this.isDate;
    this.posts.sort((a, b) => {
      return this.isDate ? a.date - b.date : a.pieceId - b.pieceId;
    })
  }
}
