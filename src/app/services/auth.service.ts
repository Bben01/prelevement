import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth'
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  user: {"auth": boolean, "admin": boolean, "uid": string} =  {"auth": false, "admin": false, "uid": null};
  userSubject = new Subject<{}>();
  authSubject = new Subject<boolean>();

  constructor () {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.user = {"auth": true, "admin": false, "uid": user["uid"]};
          user.getIdTokenResult().then( (idTokenResult) => {
            if (idTokenResult.claims["admin"]) {
              this.user["admin"] = true;
              this.emitUser();
            }
          });
        } else {
          this.user = {"auth": false, "admin": false, "uid": null};
        }
        this.emitUser();
        this.emitAuthStatus();
      }
    );
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  emitAuthStatus() {
    this.authSubject.next(this.user["auth"]);
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}