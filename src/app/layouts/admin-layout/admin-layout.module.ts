import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


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
    //  RtlComponent
  ]
})
export class AdminLayoutModule { }
