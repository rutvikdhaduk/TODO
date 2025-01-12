import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'task',
    pathMatch:'full'
  },
  {
    path: 'task',
    loadComponent: () => import('./component/add-todo/add-todo.component').then(m => m.AddTodoComponent)
  },
  {
    path: 'data',
    loadComponent: () => import('./component/show-todo/show-todo.component').then(m => m.ShowTodoComponent)
  },
];
