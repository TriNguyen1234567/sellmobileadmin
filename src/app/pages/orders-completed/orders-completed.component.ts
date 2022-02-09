import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from 'src/app/utils/data.utils';
import { isDate } from '../../utils/date.utils';

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
  orderCompletedSearch: {
    from_date: Date | string,
    to_date: Date | string
  } = {
    from_date: null,
    to_date: null
  }

  constructor(
    private networkService: NetworkserviceService, private router: Router, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.getOrdersCompleted();
  }

  getOrdersCompleted() {
    this.networkService.getOrdersCompleted().subscribe(val => {
        this.originalData = val;
        this.data = JSON.parse(JSON.stringify(this.originalData));
      }
    )
  }

  onShowDetail(event, rowData) {
    this.listDevices = [];
    if (notEmpty(rowData)) {
      this.order = rowData;
      this.networkService.getOrderDetail(rowData.id).subscribe((orderDetail) => {
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

  onSearchOrderCompleted = (event) => {
    this.data = JSON.parse(JSON.stringify(this.originalData));
    if (notEmpty(this.orderCompletedSearch.from_date) && isDate(this.orderCompletedSearch.from_date)) {
      this.data = this.data.filter((x: any) => {
        const sent_date = new Date(x.sale_date);
        sent_date.setHours(0, 0, 0, 0);
        const from_date = new Date(this.orderCompletedSearch.from_date);
        from_date.setHours(0, 0, 0, 0);
        return sent_date >= from_date;
      });
    }
    if (notEmpty(this.orderCompletedSearch.to_date) && isDate(this.orderCompletedSearch.to_date)) {
      this.data = this.data.filter((x: any) => {
        const sent_date = new Date(x.sale_date);
        sent_date.setHours(0, 0, 0, 0);
        const to_date = new Date(this.orderCompletedSearch.to_date);
        to_date.setHours(0, 0, 0, 0);
        return sent_date <= to_date;
      });
    }
  }

}
