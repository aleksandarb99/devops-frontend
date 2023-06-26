import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AccommodationDisplayComponent } from './accommodation-display/accommodation-display.component';

import { CallbackComponent } from './callback/callback.component';
import { InterceptorService } from './services/interceptor.service';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { BookAccommodationComponent } from './book-accommodation/book-accommodation.component';
import { BookedAccommodationOverviewComponent } from './booked-accommodation-overview/booked-accommodation-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    EditProfileComponent,
    HomeComponent,
    CallbackComponent,
    AccommodationDisplayComponent,
    CallbackComponent,
    CreateAccommodationComponent,
    BookAccommodationComponent,
    BookedAccommodationOverviewComponent
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
