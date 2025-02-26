import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://json-server-desafio-task-list.onrender.com/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }
  
  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, task); 
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}