import { PieceService } from './services/piece.service';
import { PostsService } from './services/posts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SigninComponent } from './signin/signin.component';
import { AddPieceComponent } from './add-piece/add-piece.component';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { ManageComponent } from './manage/manage.component';
import { ManagePiecesComponent } from './manage-pieces/manage-pieces.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    SigninComponent,
    AddPieceComponent,
    PostsComponent,
    HeaderComponent,
    ConfirmUserComponent,
    ManageComponent,
    ManagePiecesComponent,
  ],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MarkdownModule.forChild(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [AuthService, PostsService, AuthGuardService, PieceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
