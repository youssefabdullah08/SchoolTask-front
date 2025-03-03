import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  students: any[] = [];
  subjects: any[] = [];
  newStudent: any = { name: '' };
  newSubject: any = { name: '' };

  constructor(private apiService: ApiCallsService) {
    this.loadStudents();
    this.loadSubjects();
  }

  loadStudents() {
    this.apiService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  loadSubjects() {
    this.apiService.getAllSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  addStudent() {
    if (this.newStudent.name) {
      this.apiService.addStudent(this.newStudent).subscribe({
        next: () => {
          this.loadStudents();
          this.newStudent = { name: '' };
        },
        error: (error) => {
          console.error('Failed to add student:', error);
        }
      });
    }
  }

  editStudent(student: any) {
    // Implement edit logic
    console.log('Editing student:', student);
  }

  deleteStudent(student: any) {
    this.apiService.deleteStudent(student.id).subscribe({
      next: () => {
        this.loadStudents();
      },
      error: (error) => {
        console.error('Failed to delete student:', error);
      }
    });
  }

  editSubject(subject: any) {
    // Implement edit logic
    console.log('Editing subject:', subject);
  }

  deleteSubject(subject: any) {
    this.apiService.deleteSubject(subject.id).subscribe({
      next: () => {
        this.loadSubjects();
      },
      error: (error) => {
        console.error('Failed to delete subject:', error);
      }
    });
  }
}
