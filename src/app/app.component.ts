import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prelevement';
  constructor () {
    const firebaseConfig = {
      apiKey: "AIzaSyBhBk6PFhNqIufPFwpZEZIKpzeQ_XUBtX0",
      authDomain: "prelevement-d6389.firebaseapp.com",
      databaseURL: "https://prelevement-d6389.firebaseio.com",
      projectId: "prelevement-d6389",
      storageBucket: "prelevement-d6389.appspot.com",
      messagingSenderId: "838127573362",
      appId: "1:838127573362:web:b6de8758072455d174a5eb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // const functions = firebase.functions();
  }
}
