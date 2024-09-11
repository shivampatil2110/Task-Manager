import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { TaskService } from 'src/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  loginForm!: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    let user = this.loginForm.getRawValue();
    this.taskService.loginUser(user).subscribe(
      (result) => {
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.showAlert('Incorrect credentials. Please try again.');
      }
    );
    console.log(this.loginForm.value);
  }
}
