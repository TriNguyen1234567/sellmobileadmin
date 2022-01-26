import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE, MOBILE_STATUSES, PEOPLE_JOBS } from '../../constant/common';
import { getAge } from '../../utils/date.utils';
import { isEmpty, notEmpty } from '../../utils/data.utils';
import { ExcelService } from 'src/app/services/excel.service';
import { Invoice } from '../../components/model/invoice';
import { Customer } from '../../components/model/customer';
import { Mobile } from '../../components/model/mobile';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  birthdayYearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  invoice: Invoice = {
    customer_id: 0, id: 0, quantity: 0, sale_date: undefined, total_money: 0
  };
  customer: Customer = {
    address: '', age: 0, birthday: undefined, id: 0, job: undefined, name_japanese: '', name_vietnamese: '', phone: ''
  };
  selectedJobs = PEOPLE_JOBS[0];
  birthday: Date;
  jobs = PEOPLE_JOBS;
  selectedStatus = MOBILE_STATUSES[0];
  mobiles: Mobile[] = [];
  status = MOBILE_STATUSES;
  customers = [];
  suggestCustomers: [];
  displaySuggestModal: boolean = false;
  displaySpinner: boolean = false;
  selectedCustomer: Customer = null;
  editData: any;
  sale_date: Date;
  customer_id = null;
  invoice_id = 0;

  constructor(private formBuilder: FormBuilder,
              private networkService: NetworkserviceService,
              private router: Router,
              public datePipe: DatePipe,
              public excelService: ExcelService) {
  }

  ngOnInit() {
    this.editData = window.history.state;
    if (this.editData.id) {
      this.networkService.getInvoiceItems(this.editData.id).subscribe((invoiceDetail: Invoice) => {
        if (notEmpty(invoiceDetail)) {
          this.mobiles = invoiceDetail.mobiles;
          this.customer_id = invoiceDetail.customer_id;
          this.invoice_id = invoiceDetail.invoice_id;
          this.customer = invoiceDetail.customer;
          this.birthday = new Date(this.customer.birthday);
          this.selectedJobs = this.jobs.find(x => x.value === this.customer.job);
          if (isEmpty(this.selectedJobs)) {
            this.selectedJobs = PEOPLE_JOBS[0];
            this.customer.job = this.selectedJobs.value;
          }
        }
      });
    }
  }

  onChangeStatus(value, index) {
    this.mobiles[index].status = value.value;
  }

  onChangeBirthday() {
    this.customer.birthday = this.datePipe.transform(this.birthday, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    this.customer.age = getAge(this.birthday);
    if (notEmpty(this.customer.birthday)) {
      this.displaySpinner = true;
      this.networkService.searchCustomers({birthday: this.customer.birthday})
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
  }

  addMobile() {
    this.mobiles.push({
      id: 0,
      name: null,
      imei: null,
      color: null,
      status: this.selectedStatus.value,
      price: 0,
      invoice_id: null,
    })
  }

  autofillCustomer(item) {
    if (item !== null) {
      this.customer = item;
      this.customer.birthday = this.datePipe.transform(item.birthday, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
      this.invoice.customer_id = this.customer.id;
      const job = this.jobs.find(x => x.value === this.customer.job);
      if (job) {
        this.selectedJobs = job;
        this.customer.job = job.value;
      } else {
        this.selectedJobs = PEOPLE_JOBS[0];
        this.customer.job = null;
      }
    } else {
      this.customer.id = null;
      this.customer.address = null;
      this.selectedJobs = PEOPLE_JOBS[0];
      this.customer.job = this.selectedJobs.value;
      this.customer.phone = null;
      this.invoice.customer_id = 0;
    }
  }

  onChangeJob(selectedJob) {
    this.customer.job = selectedJob.value;
  }

  get totalMoney() {
    return this.mobiles.map(mobile => Number(mobile.price)).reduce((a, b) => a + b, 0);
  }

  onSubmit() {
    if (this.invoice_id) {
      var date = new Date();
      this.invoice = {
        id: this.invoice_id,
        invoice_id: this.invoice_id,
        customer: this.customer,
        customer_id: this.customer.id ? this.customer.id : -1,
        mobiles: this.mobiles,
        sale_date: this.sale_date ? this.sale_date : this.datePipe.transform(date, 'yyyy-MM-dd'),
        total_money: this.totalMoney,
        quantity: this.mobiles.length,
      };
      this.networkService.putInvoice(this.invoice).subscribe(val => {
        alert("Lưu Thành Công");
        this.router.navigate(['/invoices']);
      });
    } else {
      var date = new Date();
      this.invoice = {
        id: this.invoice_id,
        customer: this.customer,
        customer_id: this.customer.id ? this.customer.id : -1,
        mobiles: this.mobiles,
        sale_date: this.sale_date ? this.sale_date : this.datePipe.transform(date, 'yyyy-MM-dd'),
        total_money: this.totalMoney,
        quantity: this.mobiles.length,
      };
      this.networkService.postInvoice(this.invoice).subscribe(val => {
        alert("Lưu Thành Công");
        this.router.navigate(['/invoices']);
      });
    }
  }

  onSelectCustomer(event) {
    this.autofillCustomer(event.data);
    this.displaySuggestModal = false;
  }

  onUnSelectCustomer(event) {
    this.displaySuggestModal = false;
  }

  removeMobile(index) {
    this.mobiles.splice(index, 1);
  }

  // Only Integer Numbers
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  delete() {
    let isDel = confirm("Bạn có chắc chắn muốn xóa đơn thu mua của '" + this.customer.name_vietnamese + "' không?");
    if (isDel == true) {
      this.networkService.deleteInvoice(this.editData.id).subscribe(
        data => {
          alert("Xóa Thành Công");
          this.router.navigate(['/invoices']);
          console.log("DELETE Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        })
    }
  }

  cancel() {
    this.router.navigate(['/invoices']);
  }

  exportExcel() {
    const data = this.mobiles.map((x, index) => {
      return {
        NO: index + 1,
        商品名: x.name,
        単価: x.color,
        状態: x.status,
        IMEI: x.imei,
        合計: x.price
      }
    })
    this.excelService.exportAsExcelFileFormat(data, this.customer, `${this.customer.name_vietnamese}`, this.datePipe.transform(this.editData.sale_date, DATE_CONSTANT.TECHNICAL_DATE_FORMAT), this.totalMoney);
  }

}
