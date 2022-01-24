import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from 'src/app/utils/data.utils';

@Component({
  selector: 'app-orders-completed',
  templateUrl: './orders-completed.component.html',
  styleUrls: ['./orders-completed.component.scss']
})
export class OrdersCompletedComponent implements OnInit {
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
  order: any;
  fromDate: Date;
  toDate: Date;
  yearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  constructor(
    private networkService: NetworkserviceService, private router: Router, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.getOrdersCompleted();
  }

  getOrdersCompleted () {
    this.networkService.getOrdersCompleted().subscribe(val => {
      this.originalData = val;
      this.data = JSON.parse(JSON.stringify(this.originalData));
    }
  )
  }

  onShowDetail(event, rowData) {
    if (notEmpty(rowData)) {
      this.order = rowData;
      console.log(rowData.id);
      
      this.networkService.getOrderDetail(rowData.id).subscribe((orderDetail) => {
        console.log(orderDetail);
        
        this.displayDetailModal = true;
        if (notEmpty(orderDetail)) {
          this.listDevices = orderDetail;
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

  dateChange() {
    this.data = this.originalData.filter(x => {
      var date = new Date(x.sale_date);
      if (this.fromDate && !this.toDate) {
        var fromDate = new Date(this.fromDate);
        return date >= fromDate;
      }
      if (this.toDate && !this.fromDate) {
        var toDate = new Date(this.toDate);
        return date <= toDate;
      }

      if (this.toDate && this.fromDate) {
        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);
        return date >= fromDate && date <= toDate;
      }

    });

  }

}
