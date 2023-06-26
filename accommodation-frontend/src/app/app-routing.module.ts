import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { AccommodationDisplayComponent } from './accommodation-display/accommodation-display.component';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { BookAccommodationComponent } from './book-accommodation/book-accommodation.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { HostAuthGuard } from './guards/host-auth.guard';
import { GuestAuthGuard } from './guards/guest-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'sign-up', component: SingUpComponent, canActivate: [NotAuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard],  },
  { path: 'accommodation-display/:id', component: AccommodationDisplayComponent },
  // { path: 'book-accommodation/:id', component: BookAccommodationComponent, canActivate: [GuestAuthGuard] },
  { path: 'create-accommodation', component: CreateAccommodationComponent, canActivate: [HostAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
