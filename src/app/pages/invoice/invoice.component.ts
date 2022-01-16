import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE, MOBILE_STATUSES, PEOPLE_JOBS } from '../../constant/common';
import { getAge } from '../../utils/date.utils';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  birthdayYearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  invoice: any = {};
  customer: any = {};
  selectedJobs: any = '';
  birthday: Date;
  jobs = PEOPLE_JOBS;
  mobiles = [
    {
      name: null,
      imei: null,
      color: null,
      status: null,
      price: 0,
    }
  ];
  status = MOBILE_STATUSES;
  selectedStatus: any = '';
  customers = [];
  suggestCustomers: [];
  displaySuggestModal: boolean = false;
  displaySpinner: boolean = false;
  selectedCustomer = null;

  constructor(private formBuilder: FormBuilder,
              private networkserviceService: NetworkserviceService,
              private router: Router,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.networkserviceService.getCustomers().subscribe(val => {
      this.customers = val;
      this.customers.forEach(element => {
        element.birthday = this.datepipe.transform(element.birthday, 'dd-MM-yyyy');
      });
    });
  }

  onChangeStatus(value, index) {
    this.mobiles[index].status = value.value;
  }

  onChangeBirthday() {
    this.customer.birthday = this.datepipe.transform(this.birthday, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    this.customer.age = getAge(this.birthday);
    this.displaySpinner = true;
    this.networkserviceService.searchCustomers({birthday: this.customer.birthday})
      .subscribe(result => {
        if (result !== null && result.length > 0) {
          this.suggestCustomers = result;
          this.displaySuggestModal = true;
        } else {
          // Fill with null mean clear
          this.autofillCustomer(null);
        }
        this.displaySpinner = false;
      })
  }

  addMobile() {
    this.mobiles.push({
      name: null,
      imei: null,
      color: null,
      status: null,
      price: 0,
    })
  }

  autofillCustomer(item) {
    if (item !== null) {
      this.customer = item;
      this.invoice.customer_id = this.customer.id;
      const job = this.jobs.find(x => x.value === this.customer.job);
      if (job) {
        this.selectedJobs = job;
        this.customer.job = job.value;
      } else {
        this.selectedJobs = null;
        this.customer.job = null;
      }
    } else {
      this.customer.id = null;
      this.customer.address = null;
      this.customer.job = null;
      this.customer.phone = null;
      this.invoice.customer_id = 0;
    }

  }

  onChangeJob(selectedJob) {
    this.customer.job = selectedJob.value;
  }

  get totalMoney() {
    return this.mobiles.map(mobile => mobile.price).reduce((a, b) => a + b, 0);
  }

  onSubmit() {
    var date = new Date();
    this.invoice = {
      customer: this.customer,
      customer_id: this.customer.id ? this.customer.id : -1,
      mobiles: this.mobiles,
      sale_date: this.datepipe.transform(date, 'yyyy-MM-dd'),
      total_money: this.totalMoney,
      quantity: this.mobiles.length
    };
    this.networkserviceService.postInvoice(this.invoice).subscribe(val => {
      alert("Lưu Thành Công");
      console.log(this.invoice);
      console.log(val);
    });
  }

  onSelectCustomer(event) {
    this.autofillCustomer(event.data);
    this.displaySuggestModal = false;
  }

  onUnSelectCustomer(event) {
    this.displaySuggestModal = false;
  }

}
