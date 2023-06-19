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
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    EditProfileComponent,
    HomeComponent
  ],
  imports: [
    MatIconModule,
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
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
