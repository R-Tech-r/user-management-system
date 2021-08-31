import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
// import { AdminComponent } from './admin/admin.module';
// import { LoginComponent } from './login/login.component';
// import { AdminComponent } from './admin/admin.component';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const adminsModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // }, 
    //     path: 'admin',
    //     component: AdminComponent,
    //     canActivate: [AuthGuard],
    //     data: { roles: [Role.Admin] }
    // }
    // { path: 'admin', loadChildren: adminsModule, canActivate: [AuthGuard] ,data: { roles: [Role.Admin] }  },
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard], data: { roles: [Role.User] },
    { path: 'admin', loadChildren: adminsModule, canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]  },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }