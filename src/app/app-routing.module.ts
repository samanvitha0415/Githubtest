import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'analytical',
    loadChildren: () => import('./analytical/analytical.module').then(m => m.AnalyticalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mim',
    loadChildren: () => import('./mim/mim.module').then(m => m.MIMModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
