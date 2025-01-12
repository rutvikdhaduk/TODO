import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-todo',
  standalone: true,
  imports: [],
  templateUrl: './show-todo.component.html',
  styleUrl: './show-todo.component.scss'
})
export class ShowTodoComponent implements OnInit{
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('456');
  }
}
