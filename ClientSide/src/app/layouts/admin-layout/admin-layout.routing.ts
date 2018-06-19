import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CustomerComponent } from '../../customer/customer.component';
import { CreatecCustomerComponent } from '../../customer/createc-customer.component';
import { AccountComponent } from '../../account/account.component';
import { CreatecAccountComponent } from '../../account/create-account.component';
import { DepositComponent } from '../../account/deposit.component';
import { WithdrawComponent } from '../../account/withdraw.component';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginComponent } from '../../login/login.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    
    { path: 'dashboard',      component: DashboardComponent,  canActivate: [AuthGuard] },
    { path: 'customer',     component: CustomerComponent ,  canActivate: [AuthGuard]},
    { path: 'customer/create',     component: CreatecCustomerComponent,  canActivate: [AuthGuard] },
    { path: 'customer/accounts', component: AccountComponent,  canActivate: [AuthGuard] },
    { path: 'customer/accounts/deposit', component: DepositComponent ,  canActivate: [AuthGuard]},
    { path: 'customer/accounts/withdraw', component: WithdrawComponent, canActivate: [AuthGuard] },
    { path: 'account/create/:id',     component: CreatecAccountComponent ,  canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent ,  canActivate: [AuthGuard]},
    { path: 'table-list',     component: TableListComponent,  canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent ,  canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent ,  canActivate: [AuthGuard]},
    { path: 'maps',           component: MapsComponent,  canActivate: [AuthGuard] },
    { path: 'notifications',  component: NotificationsComponent,  canActivate: [AuthGuard] },
    { path: 'upgrade',        component: UpgradeComponent,  canActivate: [AuthGuard] },
];
