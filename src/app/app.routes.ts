import { Routes } from '@angular/router';
import { JobseekerLayoutComponent } from './job_seeker/jobseeker-layout/jobseeker-layout.component';
import { HomeComponent } from './job_seeker/home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AboutComponent } from './job_seeker/about/about.component';
import { ContactComponent } from './job_seeker/contact/contact.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { ManageCategoryComponent } from './admin/category/manage-category/manage-category.component';
import { UpdateCategoryComponent } from './admin/category/update-category/update-category.component';
import { ProfileComponent } from './profile/profile.component';
import { userGuard } from './guard/user/user.guard';
import { AddJobComponent } from './admin/job/add-job/add-job.component';
import { ManageJobsComponent } from './admin/job/manage-jobs/manage-jobs.component';
import { UpddateJobComponent } from './admin/job/upddate-job/upddate-job.component';
import { ManageApplicationsComponent } from './admin/manage-applications/manage-applications.component';
import { ManageJobseekersComponent } from './admin/manage-jobseekers/manage-jobseekers.component';
import { ViewCategoriesComponent } from './job_seeker/view-categories/view-categories.component';
import { ViewJobsComponent } from './job_seeker/view-jobs/view-jobs.component';
import { ViewJobsByCategoryComponent } from './job_seeker/view-jobs-by-category/view-jobs-by-category.component';
import { ViewJobDetailComponent } from './job_seeker/view-job-detail/view-job-detail.component';
import { ApplicationsComponent } from './job_seeker/applications/applications.component';
import { ContactsComponent } from './admin/contacts/contacts.component';

export const routes: Routes = [

    {
        path: '', redirectTo: "/home", pathMatch: 'full'
    },

    {
        path: '', component: JobseekerLayoutComponent, children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'about', component: AboutComponent
            },
            {
                path: 'contact', component: ContactComponent
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'register', component: RegisterComponent
            },
            {
                path: 'profile', component: ProfileComponent, canActivate: [userGuard]
            },
            {
                path: 'applications', component: ApplicationsComponent, canActivate: [userGuard]
            },
            {
                path: 'category/view', component: ViewCategoriesComponent
            },
            {
                path: 'jobs/view', component: ViewJobsComponent
            },

            {
                path: 'jobs/category/:id', component: ViewJobsByCategoryComponent
            },
            {
                path: 'job/detail/:id', component: ViewJobDetailComponent
            },

        ]
    },


    {
        path: 'admin', component: AdminLayoutComponent, children: [
            {
                path: 'dashboard', component: DashboardComponent
            },
            {
                path: 'category/add', component: AddCategoryComponent
            },
            {
                path: 'category/manage', component: ManageCategoryComponent
            },
            {
                path: 'category/update/:id', component: UpdateCategoryComponent
            },
            {
                path: 'job/add', component: AddJobComponent
            },
            {
                path: 'job/manage', component: ManageJobsComponent
            },
            {
                path: 'job/update/:id', component: UpddateJobComponent
            },
            {
                path: 'applications/manage', component: ManageApplicationsComponent
            },
            {
                path: 'users/manage', component: ManageJobseekersComponent
            },
            {
                path: 'contacts', component: ContactsComponent
            },

        ]
    }


];
