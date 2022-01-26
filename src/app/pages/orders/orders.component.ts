import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from 'src/app/utils/data.utils';
import { OrderInvoice } from '../../components/model/order-invoice';
import { isDate } from '../../utils/date.utils';

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
  orderSearch: {
    from_date: Date,
    to_date: Date
  } = {
    from_date: null,
    to_date: null
  }

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
      this.networkService.getOrderDetail(rowData.id).subscribe((orderDetail) => {
        this.displayDetailModal = true;
        if (notEmpty(orderDetail)) {
          this.listDevices = orderDetail;
        }
      });
    }
  }

  processOrder() {
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
    
    this.networkService.putOrder(order).subscribe(val => {
      alert("Lưu Thành Công");
      this.getOrdersPending();
      this.displayDetailModal = false;
    });

  }

  onSearchOrder = (event) => {
    this.data = JSON.parse(JSON.stringify(this.originalData));
    if (notEmpty(this.orderSearch.from_date) && isDate(this.orderSearch.from_date)) {
      this.data = this.data.filter((x: OrderInvoice) => {
        return new Date(x.sale_date) >= new Date(this.orderSearch.from_date)
      });
    }

    if (notEmpty(this.orderSearch.to_date) && isDate(this.orderSearch.to_date)) {
      this.data = this.data.filter((x: OrderInvoice) => {
        return new Date(x.sale_date) <= new Date(this.orderSearch.to_date)
      });
    }
  }

}
