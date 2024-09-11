import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './Authentication/signup/signup.component';
import { LoginComponent } from './Authentication/login/login.component';
import { TodoCardComponent } from './dashboard/todo/todo-card/todo-card.component';
import { TodoInputComponent } from './dashboard/todo/todo-input/todo-input.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { Page404Component } from './TODO view/page-404/page-404.component';
import { TodoModalComponent } from './TODO view/support view/todo-modal/todo-modal.component';
import { UpdateModalComponent } from './TODO view/support view/update-modal/update-modal.component';
import { ProfileComponent } from './dashboard/header/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './dashboard/todo/todo.component';
import { CompletedComponent } from './dashboard/header/completed/completed.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TodoCardComponent,
    TodoInputComponent,
    HeaderComponent,
    Page404Component,
    TodoModalComponent,
    UpdateModalComponent,
    ProfileComponent,
    DashboardComponent,
    TodoComponent,
    CompletedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
