import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authguard';
import { CardDetailsComponent } from './card-details/card-details.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectViewAllComponent } from './project-view-all/project-view-all.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'create-project', component: ProjectCreateComponent, canActivate: [AuthGuard] },
  { path: 'view-all-project', component: ProjectViewAllComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cardDetails', component: CardDetailsComponent ,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
