import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SingUpComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
