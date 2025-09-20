import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { RedirectIfAuthGuard } from './auth/redirect-if-auth.guard';
import { GameResolver } from './pages/game/game.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [RedirectIfAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [RedirectIfAuthGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'game/:id',
        loadComponent: () => import('./pages/game/game.component').then(m => m.GameComponent),
        canActivate: [authGuard],
        resolve: { game: GameResolver }
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
