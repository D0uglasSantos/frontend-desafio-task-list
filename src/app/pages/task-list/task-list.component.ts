import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, FontAwesomeModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  editingTask: any = {};
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  taskIdToDelete: number | null = null;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmationModal')
  deleteConfirmationModal!: TemplateRef<any>;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar tarefas.');
      },
    });
  }

  editTask(task: any): void {
    this.editingTask = { ...task };
    this.modalService.open(this.editModal);
  }

  updateTask(): void {
    this.taskService
      .updateTask(this.editingTask.id, this.editingTask)
      .subscribe({
        next: () => {
          this.toastr.success('Tarefa atualizada com sucesso!');
          this.loadTasks();
          this.modalService.dismissAll();
        },
        error: (error) => {
          this.toastr.error('Erro ao atualizar tarefa.');
        },
      });
  }

  deleteTask(taskId: number): void {
    this.taskIdToDelete = taskId;
    this.modalService.open(this.deleteConfirmationModal);
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  confirmDeleteTask(): void {
    if (this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete).subscribe({
        next: () => {
          this.toastr.success('Tarefa excluída com sucesso!');
          this.loadTasks();
          this.modalService.dismissAll();
          this.taskIdToDelete = null;
        },
        error: (error) => {
          this.toastr.error('Erro ao excluir tarefa.');
        },
      });
    }
  }
}
