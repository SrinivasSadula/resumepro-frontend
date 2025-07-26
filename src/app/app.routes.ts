import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Resume } from './resume/resume';
import { Landing } from './landing/landing';
import { Payment } from './payment/payment';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: Landing },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'resume', component: Resume },
    { path: 'payment', component: Payment, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/landing' }
];
