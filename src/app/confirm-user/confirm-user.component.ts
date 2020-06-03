import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onReturn() {
    this.router.navigate(['/transferer']);
  }

}
