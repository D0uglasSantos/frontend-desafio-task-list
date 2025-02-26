import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskRegistrationComponent } from './pages/task-registration/task-registration.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'registro', component: TaskRegistrationComponent },
  { path: 'lista', component: TaskListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }