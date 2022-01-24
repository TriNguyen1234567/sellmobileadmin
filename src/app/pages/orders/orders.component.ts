import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from 'src/app/utils/data.utils';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  originalData = [];
  data = [];
  searchText = '';
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
    this.getOrdersPending();
  }

  getOrdersPending() {
    this.networkService.getOrdersPending().subscribe(val => {
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

  processOrder() {
    console.log(this.listDevices);

    const mobiles = this.listDevices.map(x => {
      return {
        id: x.mobileid,
        price: x.price
      };
    });
    const total_money = mobiles.map(mobile => mobile['price']).reduce((a, b) => a + b, 0)
    const order = {
      mobiles,
      id: this.order.id, sale_date: this.order.sale_date, total_money, quantity: this.order.quantity
    }
    console.log(order);
    this.networkService.putOrder(order).subscribe(val => {
      alert("Lưu Thành Công");
      console.log(order);
      console.log(val);
      this.getOrdersPending();
      this.displayDetailModal = false;
    });

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
