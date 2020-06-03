import { ManageComponent } from './manage/manage.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { PostsComponent } from './posts/posts.component';
import { SigninComponent } from './signin/signin.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'transferer', component: UserFormComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'confirm', component: ConfirmUserComponent},
  { path: 'posts', canActivate: [AuthGuardService], component: PostsComponent},
  { path: 'pieces', canActivate: [AuthGuardService], component: ManageComponent},
  { path: '', component: UserFormComponent, pathMatch: 'full'},
  { path: '**', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
