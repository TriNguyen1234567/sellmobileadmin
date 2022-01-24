import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";


import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";

import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { WifiComponent } from "../../pages/wifi/wifi.component"
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { CongtacvienComponent } from "../../pages/congtacvien/congtacvien.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { ChuatracocComponent } from 'src/app/pages/chuatracoc/chuatracoc.component';
import { WifidoicaplaisimComponent } from 'src/app/pages/wifidoicaplaisim/wifidoicaplaisim.component';

import {FileUploadModule} from 'primeng/fileupload';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { CustomersComponent } from "src/app/pages/customers/customers.component";
import { CustomerComponent } from "src/app/pages/customer/customer.component";
import { InvoicesComponent } from "src/app/pages/invoices/invoices.component";
import { InvoiceComponent } from "src/app/pages/invoice/invoice.component";
import { JobTitlePipe } from '../../shared/pipes/job-title.pipe';
import { DeviceStatusPipe } from '../../shared/pipes/device-status.pipe';
import { MobilesComponent } from "src/app/pages/mobiles/mobiles.component";
import { OrdersComponent } from "src/app/pages/orders/orders.component";
import { OrdersCompletedComponent } from "src/app/pages/orders-completed/orders-completed.component";
import { StatisticsComponent } from "src/app/pages/statistics/statistics.component";
import { ExcelService } from "src/app/services/excel.service";
import { DevicesComponent } from "src/app/pages/devices/devices.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    InputSwitchModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    ToggleButtonModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    WifiComponent,
    CongtacvienComponent,
    ChuatracocComponent,
    WifidoicaplaisimComponent,
    CustomersComponent,
    CustomerComponent,
    InvoicesComponent,
    InvoiceComponent,
    JobTitlePipe,
    DeviceStatusPipe,
    MobilesComponent,
    OrdersComponent,
    OrdersCompletedComponent,
    StatisticsComponent,
    DevicesComponent
    //  RtlComponent
  ],
  providers: [
    DatePipe,
    JobTitlePipe,
    DeviceStatusPipe,
    ExcelService
  ]
})
export class AdminLayoutModule { }
