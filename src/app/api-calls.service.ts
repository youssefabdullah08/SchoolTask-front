import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  private BaseUrl: string = "https://localhost:7036";

  constructor(private http: HttpClient) { }

  login(credentials: {studentEmail: string, password: string}): Observable<any> {
    return this.http.post(`${this.BaseUrl}/api/Auth/login`, credentials);
  }

  register(userData: {
    firstName: string,
    lastName: string,
    studentEmail: string,
    password: string,
    confirmPassword: string
  }): Observable<any> {
    return this.http.post(`${this.BaseUrl}/api/Auth/register`, userData);
  }
  getAllStudents(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/api/Student/GetAllStudents`);
  }

  getAllSubjects(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/api/Subject/Get`); 
  }

  addStudent(student: { name: string }): Observable<any> {
    return this.http.post(`${this.BaseUrl}/api/Student/AddStudent`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.BaseUrl}/api/Student/DeleteStudent/${id}`);
  }

  addSubject(subject: { name: string }): Observable<any> {
    return this.http.post(`${this.BaseUrl}/api/Subject/Add`, subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.BaseUrl}/api/Subject/Delete/${id}`);
  }
}
