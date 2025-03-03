import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
      }
    ]
  }
  ,
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  }
];
