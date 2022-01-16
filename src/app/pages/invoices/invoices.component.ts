import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT } from '../../constant/common';
import { notEmpty } from '../../utils/data.utils';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  originalData = [];
  data = [];
  searchText = '';
  cols = [
    {field: 'name_vietnamese', header: 'name_vietnamese'},
    {field: 'sale_date', header: 'sale_date'},
    {field: 'quantity', header: 'quantity'},
    {field: 'total_money', header: 'total_money'},
  ];
  dateFormat = DATE_CONSTANT.ORIGINAL_DATE_FORMAT;
  displayDetailModal: boolean = false;
  listDevices = [];
  selectedDevice: any;

  constructor(
    private networkService: NetworkserviceService, private router: Router, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.networkService.getInvoices().subscribe(val => {
        this.originalData = val;
        this.data = JSON.parse(JSON.stringify(this.originalData));
      }
    )
  }

  onShowDetail(event, rowData) {
    if (notEmpty(rowData)) {
      this.networkService.getInvoiceItems(rowData.id).subscribe((invoiceDetail) => {
        this.displayDetailModal = true;
        if (notEmpty(invoiceDetail)) {
          this.listDevices = invoiceDetail.items;
        }
      });
    }
  }

  onSelectDevice(event) {
  }

  onDeSelectDevice(event) {
  }

  SearchChange() {
    if (this.searchText == '') {
      this.data = JSON.parse(JSON.stringify(this.originalData));
    } else {
      const tempDate = JSON.parse(JSON.stringify(this.originalData));
      this.data = tempDate.filter(x => {
        return x.name_vietnamese.includes(this.searchText) || x.sale_date == this.searchText;
      });
    }
  }

}
