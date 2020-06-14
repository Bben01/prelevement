import { PieceService } from './../services/piece.service';
import { Post } from './../models/post.model';
import { Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { data } from '../../assets/TextTeroumaAlts'
import { CookieService } from 'ngx-cookie-service';

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
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => {
      let explanation = document.getElementById("explanation");
      explanation.style.opacity = "1";
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
      name: [this.cookieService.get("name"), Validators.required],
      surname: [this.cookieService.get("surname"), Validators.required],
      phone: [this.cookieService.get("phone"), [Validators.required,
      Validators.pattern(this.phonePattern)]],
      email: [this.cookieService.get("email"), [Validators.required, Validators.email]],
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
    this.saveCookie(name, surname, phone, email);
    this.router.navigate(['/confirm']);
  }

  saveCookie(name: string, surname: string, phone: string, email: string) {
    this.cookieService.set("name", name);
    this.cookieService.set("surname", surname);
    this.cookieService.set("phone", phone);
    this.cookieService.set("email", email);
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