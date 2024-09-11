import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TaskService } from 'src/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponseBase } from '@angular/common/http';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = [];
  todoData: any = [];
  statusTodo: any = [];
  passwordForm!: FormGroup;
  comp = 0;
  prog = 0;
  incomp = 0;
  can = 0;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.passwordForm = this.fb.group(
      {
        current_password: ['', Validators.required],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  private showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getTodo();
  }
  getUser() {
    this.taskService.getUser().subscribe(
      (user) => {
        console.log(user);
        this.userData = user;
      },
      (error) => {
        console.log('Error fetching tasks', error);
      }
    );
  }

  getTodo() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.todoData = tasks;
        this.statusTodo = this.todoData.map((el: { status: any }) => el.status);
        this.statusTodo.map((el: any) => {
          if (el == 'completed') {
            this.comp++;
          }
          if (el == 'incomplete') {
            this.incomp++;
          }
          if (el == 'progress') {
            this.prog++;
          }
          if (el == 'cancel') {
            this.can++;
          }
        });
        console.log(this.statusTodo);
      },
      (error) => {
        console.log('Error fetching tasks', error);
      }
    );
  }

  updatePassword() {
    console.log(this.passwordForm.getRawValue());
    this.taskService
      .updatePassword(this.passwordForm.getRawValue())
      .subscribe((response) => {
        if (response.status === 500) {
          this.showAlert('Server error');
        }
        if (response.status === 401) {
          this.showAlert('Invalid current password');
        }
        if (response.status === 200) {
          this.showAlert('Updated password successfully');
        }
      });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirm_password')!.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
}
