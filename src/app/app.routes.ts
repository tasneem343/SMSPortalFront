import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
  { path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent) },
  { path: 'templates', loadComponent: () => import('./Pages/templates/templates.component').then(m => m.TemplatesComponent) },
  { path: 'createtemplate', loadComponent: () => import('./Pages/createtemplate/createtemplate.component').then(m => m.CreatetemplateComponent) },
  { path: 'sendcsvmessage', loadComponent: () => import('./Pages/send-by-csv/send-by-csv.component').then(m => m.SendByCSVComponent) },
  { path: 'edittemplate', loadComponent: () => import('./Pages/edittemplate/edittemplate.component').then(m => m.EdittemplateComponent) },
  { path: 'sendmessages', loadComponent: () => import('./Pages/sendmessages/sendmessages.component').then(m => m.SendmessagesComponent) },
  { path: 'messagehistory', loadComponent: () => import('./Pages/message-history/message-history.component').then(m => m.MessageHistoryComponent) },
  { path: 'reports', loadComponent: () => import('./Pages/reports/reports.component').then(m => m.ReportsComponent) },
];