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
      surname: ['', Validators.required],
      phone: ['', [Validators.required, 
        Validators.pattern("^[0-9]*$"), 
        Validators.minLength(10), 
        Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      comment: ''
    });
  }

  onSavePost() {
    const name = this.postForm.get('name').value;
    const surname = this.postForm.get('surname').value;
    const phone = this.postForm.get('phone').value;
    const email = this.postForm.get('email').value;
    const comment = this.postForm.get('comment').value;
    let pieceId = this.pieceService.use();
    const newPost = new Post(name, pieceId, comment, surname, phone, email);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/confirm']);
  }

}
