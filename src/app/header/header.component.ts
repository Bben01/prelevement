import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.userSubject.subscribe(user => {
      if(user) {
        this.isAuth = true;
        this.isAdmin = user["admin"];
      } else {
        this.isAuth = false;
        this.isAdmin = false;
      }
    })
    this.authService.emitUser();
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  onPosts() {
    this.router.navigate(['/posts']);
  }

  onRajouter() {
    this.router.navigate(['/pieces']);
  }

}