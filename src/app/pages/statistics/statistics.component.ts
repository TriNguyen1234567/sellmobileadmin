import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DATE_CONSTANT,
  DEFAULT_BIRTHDAY_YEAR_RANGE,
  STATISTICS_DATE_LIMIT,
  STATISTICS_MONTH_LIMIT
} from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from '../../utils/data.utils';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  types: {
    label: string,
    value: string
  }[] = [
    {label: "Ngày", value: "day"},
    {label: "Tháng", value: "month"}
  ];
  yearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  dateFormat: DATE_CONSTANT.ORIGINAL_DATE_FORMAT;
  selectedType = this.types[0];
  invoices = [];
  orderInvoices = [];
  profits = [];
  totalProfit = 0;
  minToDate: Date;
  maxToDate: Date;
  statisticFilter: {
    type: string,
    from_date: Date,
    to_date: Date
  } = {
    type: 'day',
    from_date: null,
    to_date: null
  }

  constructor(public datepipe: DatePipe, private networkserviceService: NetworkserviceService,) {
  }

  ngOnInit() {
  }

  onSearch = (event) => {
    const fromDate = this.datepipe.transform(this.statisticFilter.from_date, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    const toDate = this.datepipe.transform(this.statisticFilter.to_date, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    if (notEmpty(fromDate) && notEmpty(toDate) && notEmpty(this.statisticFilter.type)) {
      this.networkserviceService.getStatistics(
        this.statisticFilter.type,
        this.datepipe.transform(fromDate, DATE_CONSTANT.TECHNICAL_DATE_FORMAT),
        this.datepipe.transform(toDate, DATE_CONSTANT.TECHNICAL_DATE_FORMAT)).subscribe(result => {
        this.invoices = result.invoice;
        this.orderInvoices = result.orderinvoice;
        this.calculate();
      })
    }

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
      this.profits = this.profits.sort(function (a, b) {
        if (a.dateyear === b.dateyear) {
          return a.datemonth - b.datemonth;
        } else {
          return a.dateyear - b.dateyear;
        }
      });
      this.totalProfit = this.profits.map(x => Number(x.profit)).reduce((a, b) => a + b, 0);
    } else {
      this.profits = this.profits.sort(function (a, b) {
        // convert date object into number to resolve issue in typescript
        return +new Date(a.sale_date) - +new Date(b.sale_date);
      });
      this.totalProfit = this.profits.map(x => Number(x.profit)).reduce((a, b) => a + b, 0);
    }
  }

  onTypeChange(event) {
    this.statisticFilter.type = event.value;
    this.statisticFilter.to_date = null;
    this.selectedType = event;
    this.invoices = [];
    this.orderInvoices = [];
    this.totalProfit = 0;
    if (notEmpty(this.statisticFilter.from_date)) {
      this.updateFilter(this.statisticFilter.from_date);
    }
  }

  onChangeFromDate = (event) => {
    this.updateFilter(event);
  }

  updateFilter = (fromDate: Date) => {
    if (notEmpty(fromDate)) {
      this.minToDate = fromDate;
      if (this.statisticFilter.type == 'month') {
        this.maxToDate = new Date(fromDate);
        this.maxToDate.setMonth(fromDate.getMonth() + STATISTICS_MONTH_LIMIT);
      } else {
        this.maxToDate = new Date(fromDate);
        this.maxToDate.setDate(fromDate.getDate() + STATISTICS_DATE_LIMIT);
      }
    }
  }
}
