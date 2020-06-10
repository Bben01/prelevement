import { PieceService } from './../services/piece.service';
import { Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { Post } from './../models/post.model';
import { Component, OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  getDate(index: number) {
    return new Date(this.posts[index].date);
  }
}
