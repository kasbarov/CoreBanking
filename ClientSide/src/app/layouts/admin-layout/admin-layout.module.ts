import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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

import {  
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerService } from '../../customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from '../../util/notifier.service';
import { AccountComponent } from '../../account/account.component';
import { AccountService } from '../../account/account.service';
import { CreatecAccountComponent } from '../../account/create-account.component';
import { DepositComponent } from '../../account/deposit.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,    
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CustomerComponent,
    CreatecCustomerComponent,
    AccountComponent,
    CreatecAccountComponent, 
    DepositComponent
  ],
  providers :[
    CustomerService,
    AccountService,
  ]
})

export class AdminLayoutModule {}
