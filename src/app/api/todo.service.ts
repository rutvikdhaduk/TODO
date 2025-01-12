import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:8080'
  constructor(public http:HttpClient) { }

  addTodo(body) {
    this.http.post(`${this.url}`,body)
  }

  updateTodo(id,body) {
    this.http.put(`${this.url}/${id}`,body)
  }

  deleteTodo(id) {
    this.http.delete(`${this.url}/${id}`)
  }
}

export class Todo {
  name: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
}
