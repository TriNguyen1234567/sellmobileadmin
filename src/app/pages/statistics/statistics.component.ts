import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  types = [
    { label: "Ngày", value: "day" },
    { label: "Tháng", value: "month" }
  ];
  fromDate: Date;
  toDate: Date;
  yearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  selectedType = this.types[0];
  invoices = [];
  orderInvoices = [];
  profits = [];
  totalProfit = 0;
  minToDate: Date;
  maxToDate: Date;

  constructor(public datepipe: DatePipe, private networkserviceService: NetworkserviceService,) { }

  ngOnInit() {
  }

  search() {
    var fromDate = this.datepipe.transform(this.fromDate, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    var toDate = this.datepipe.transform(this.toDate, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    this.networkserviceService.getStatistics(this.selectedType.value, fromDate, toDate).subscribe(result => {
      this.invoices = result.invoice;
      this.orderInvoices = result.orderinvoice;
      this.calculate();
    })

  }
  calculate() {
    this.profits = [];
    this.orderInvoices.forEach(x => {
      if (this.selectedType.value === 'day') {
        var invoice = this.invoices.find(y => y.sale_date == x.sale_date);
        var profit = 0;
        if (invoice) {
          profit = x.total_money - invoice.total_money;
        } else {
          profit = +x.total_money
        }
        this.profits.push({
          sale_date: x.sale_date,
          profit: profit
        });
      }

      if (this.selectedType.value === 'month') {
        var invoice = this.invoices.find(y => y.datemonth == x.datemonth && y.dateyear == x.dateyear);
        var profit = 0;
        if (invoice) {
          profit = x.total_money - invoice.total_money;
        } else {
          profit = +x.total_money
        }
        this.profits.push({
          datemonth: x.datemonth,
          dateyear: x.dateyear,
          profit: profit
        });
      }

    });
    this.invoices.forEach(x => {
      if (this.selectedType.value === 'day') {
        var orderInvoice = this.orderInvoices.find(y => y.sale_date == x.sale_date);
        if (!orderInvoice) {
          this.profits.push({
            sale_date: x.sale_date,
            profit: -x.total_money
          });
        }
      }
      if (this.selectedType.value === 'month') {
        var orderInvoice = this.orderInvoices.find(y => y.datemonth == x.datemonth && y.dateyear == x.dateyear);
        if (!orderInvoice) {
          this.profits.push({
            datemonth: x.datemonth,
            dateyear: x.dateyear,
            profit: -x.total_money
          });
        }
      }

    });
    if (this.selectedType.value === 'month') {
      this.profits = this.profits.sort(function(a, b) {
        if (a.dateyear === b.dateyear) {
          return a.datemonth - b.datemonth;
        } else {
          return a.dateyear - b.dateyear;
        }
      });
      this.totalProfit = this.profits.map(x => Number(x.profit)).reduce((a, b) => a + b, 0);
    } else {
      this.profits = this.profits.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(a.sale_date) - +new Date(b.sale_date);
      });
      this.totalProfit = this.profits.map(x => Number(x.profit)).reduce((a, b) => a + b, 0);
    }
  }

  fromDateChange(event:Date) {
    this.toDate = null;
    this.minToDate = event;
    var temp = new Date(event);
    if (this.selectedType.value === 'month') { 
      temp.setMonth(event.getMonth() +5);
    } else {
      temp.setDate(event.getDate() +5);
    }
    this.maxToDate = temp;
  }

  typeChange() {
    this.invoices = [];
    this.orderInvoices = [];
    this.totalProfit = 0; if (this.fromDate) {
      this.fromDateChange(this.fromDate);
    }
  }
}
