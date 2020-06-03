import { PieceService } from './../services/piece.service';
import { Post } from './../models/post.model';
import { Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private pieceService: PieceService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => { 
      let explaination = document.getElementById("explaination");
      explaination.style.opacity = "1";
    }, 250);
  }

  disableSubmit() {
    return this.pieceService.utilisRestantes <= 0;
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      comment: '',
    });
  }

  onSavePost() {
    const name = this.postForm.get('name').value;
    const comment = this.postForm.get('comment').value;
    let pieceId = this.pieceService.use();
    const newPost = new Post(name, pieceId, comment);
    this.postsService.createNewPost(newPost);
    // TODO: A afficher recu (creer une nouvelle page)
    this.router.navigate(['/confirm']);
  }

}
