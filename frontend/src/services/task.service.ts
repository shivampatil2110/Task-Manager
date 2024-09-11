import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }

  getTasks() {
    return this.http
      .get('http://localhost:5000/task', {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
  addTask(task: object) {
    return this.http.post('http://localhost:5000/task', task, {
      withCredentials: true,
    });
  }
  deleteTask(id: number) {
    return this.http.delete('http://localhost:5000/task/' + id, {
      withCredentials: true,
    });
  }
  updateTask(id: number, task: object) {
    return this.http.patch('http://localhost:5000/task/' + id, task, {
      withCredentials: true,
    });
  }
  registerUser(user: object) {
    return this.http
      .post('http://localhost:5000/signUp', user, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return of(error as HttpResponse<any>);
        })
      );
  }
  loginUser(user: object) {
    return this.http.post('http://localhost:5000/login', user, {
      withCredentials: true,
    });
  }
  logout() {
    return this.http.delete('http://localhost:5000/logout', {
      withCredentials: true,
    });
  }
  getUser() {
    return this.http.get('http://localhost:5000/user', {
      withCredentials: true,
    });
  }
  updatePassword(updatedPwd: object) {
    return this.http
      .patch('http://localhost:5000/updatePassword', updatedPwd, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return of(error as HttpResponse<any>);
        })
      );
  }
}
