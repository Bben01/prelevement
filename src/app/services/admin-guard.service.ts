import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            user.getIdTokenResult().then( idTokenResult => {
              if (idTokenResult.claims["admin"]) {
                resolve(true);
              }
              else {
                this.router.navigate(['/transferer']);
                resolve(false);
              }
            });
          }
        );
      }
    );
  }
}