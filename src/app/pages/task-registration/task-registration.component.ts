import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-registration.component.html',
})
export class TaskRegistrationComponent {
  task = { name: '', date: '', description: '' };

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  onSubmit() {

    if (!this.task.name || !this.task.date || !this.task.description) {
      this.toastr.error('Por favor, preencha todos os campos.', 'Erro de Validação');
      return;
    }

    this.taskService.addTask(this.task).subscribe({
      next: (response) => {
        this.toastr.success('Tarefa cadastrada com sucesso!', 'Sucesso');
        this.task = { name: '', date: '', description: '' };
      },
      error: (error) => {
        this.toastr.error('Erro ao cadastrar tarefa.', 'Erro');
      }
    });
  }
}
