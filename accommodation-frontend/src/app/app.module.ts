import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AccommodationDisplayComponent } from './accommodation-display/accommodation-display.component';
import {MatIconModule} from '@angular/material/icon';

import { CallbackComponent } from './callback/callback.component';
import { InterceptorService } from './services/interceptor.service';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { BookAccommodationComponent } from './book-accommodation/book-accommodation.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { BookedAccommodationOverviewComponent } from './booked-accommodation-overview/booked-accommodation-overview.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditPriceComponent } from './edit-price/edit-price.component';
import { CustomPriceComponent } from './custom-price/custom-price.component';
import { AvailabilityComponent } from './availability/availability.component';
import { EditAvailabilityComponent } from './edit-availability/edit-availability.component';
import { ApproveComponent } from './approve/approve.component';

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
    HeaderComponent,
    BookedAccommodationOverviewComponent,
    AccommodationsComponent,
    EditPriceComponent,
    CustomPriceComponent,
    AvailabilityComponent,
    EditAvailabilityComponent,
    ApproveComponent
  ],
  imports: [
    MatCheckboxModule,
    MatMenuModule,
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
    MatCheckboxModule,
    MatIconModule
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
