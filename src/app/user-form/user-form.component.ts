import { PieceService } from './../services/piece.service';
import { Post } from './../models/post.model';
import { Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { data } from '../../assets/TextTeroumaAlts'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  postForm: FormGroup;
  phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

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

  displayText() {
    const quantity = this.postForm.get('quantity').value;
    const type = this.postForm.get('type').value;
    const tab = data[quantity];
    const val = tab ? tab[type] : '';
    return val;
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required,
      Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
      quantity: ['', Validators.required],
      type: ['', Validators.required],
      comment: ''
    });
  }

  getValidStatus(id: string) {
    if (this.postForm.get(id).touched) {
      return (this.postForm.get(id).valid) ? "is-valid" : "is-invalid";
    }
    return "";
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

  getFormValidationErrors(id: string) {
    const controlErrors: ValidationErrors = this.postForm.get(id).errors;
    if (!controlErrors) {
      return "";
    }
    if (controlErrors['required']) {
      return "Ce champ est obligatoire"
    }
    if (controlErrors['pattern']) {
      return "Le numéro de télephone est invalide";
    }
    if (controlErrors['email']) {
      return "L'addresse mail est invalide";
    }

  }
}