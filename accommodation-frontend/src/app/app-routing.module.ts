import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AccommodationDisplayComponent } from './accommodation-display/accommodation-display.component';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'sign-up', component: SingUpComponent },
  { path: '', component: HomeComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'accommodation-display/:id', component: AccommodationDisplayComponent },
  { path: 'create-accommodation', component: CreateAccommodationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
