import { Component, OnInit } from '@angular/core';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { notEmpty } from '../../utils/data.utils';
import { DATE_CONSTANT } from '../../constant/common';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  originalData = [];
  data = [];
  searchNameText = '';
  searchImeiText = '';
  dateFormat = DATE_CONSTANT.ORIGINAL_DATE_FORMAT;

  deviceFilter: {
    name: string,
    imei: string,
    customer_name: string,
  } = {
    name: '',
    imei: '',
    customer_name: ''
  }

  constructor(private networkService: NetworkserviceService, public datepipe: DatePipe, private router: Router) {
  }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.networkService.getDevices().subscribe(val => {
      this.originalData = val;
      this.data = JSON.parse(JSON.stringify(this.originalData));
      this.data.forEach(x => x['isSelected'] = false);
    })
  }

  onShowInvoice(rowData) {
    rowData.id = rowData.invoice_id;
    this.router.navigate(['/invoice'], {state: rowData});
  }

  onSearchDevice = (event) => {
    this.data = JSON.parse(JSON.stringify(this.originalData));
    if (notEmpty(this.deviceFilter.name)) {
      this.data = this.data.filter(x => {
        return x.name.toLowerCase().includes(this.deviceFilter.name.toLowerCase());
      });
    }
    if (notEmpty(this.deviceFilter.imei)) {
      this.data = this.data.filter(x => {
        return x.imei.toLowerCase().includes(this.deviceFilter.imei.toLowerCase());
      });
    }

    if (notEmpty(this.deviceFilter.customer_name)) {
      this.data = this.data.filter(x => {
        return x.name_vietnamese.toLowerCase().includes(this.deviceFilter.customer_name.toLowerCase());
      });
    }
  }

}
