import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectViewAllComponent } from './project-view-all/project-view-all.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { YourWorkComponent } from './your-work/your-work.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    CardDetailsComponent,
    CreateTasksComponent,
    ProjectCreateComponent,
    ProjectViewAllComponent,
    YourWorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-US'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
