import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE, PEOPLE_JOBS } from '../../constant/common';
import { getAge } from '../../utils/date.utils';
import { Customer } from '../../components/model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  birthdayYearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  editData: any;
  customerForm: FormGroup | any;
  customer: any = {};
  jobs = PEOPLE_JOBS;
  selectedJobs = PEOPLE_JOBS[0];
  birthday: Date;

  constructor(private formBuilder: FormBuilder,
              private networkserviceService: NetworkserviceService,
              private router: Router,
              public datepipe: DatePipe) {
  }

  getData() {
    this.customer = {
      id: this.editData.id,
      name_vietnamese: this.editData.name_vietnamese,
      name_japanese: this.editData.name_japanese,
      birthday: this.editData.birthday,
      age: this.editData.age,
      address: this.editData.address,
      phone: this.editData.phone,
      job: this.editData.job
    }

    this.birthday = new Date(this.customer.birthday);
    const job = this.jobs.find(job => job.value === this.customer.job);
    if (job) {
      this.selectedJobs = job;
    }
  }

  ngOnInit() {
    this.editData = window.history.state;
    if (this.editData.id) {
      this.getData();
    }
    this.customer.job = this.selectedJobs.value;
  }

  onChangeJob() {
    this.customer.job = this.selectedJobs.value;
  }

  birthdayChange() {
    this.customer.birthday = this.datepipe.transform(this.birthday, DATE_CONSTANT.TECHNICAL_DATE_FORMAT);
    this.customer.age = getAge(this.birthday);
  }

  onCancel() {
    this.router.navigateByUrl('customers')
  }

  onSubmit() {
    if (this.customer.id) {
      this.networkserviceService.putCustomer(this.customer as Customer).subscribe(x => {
          alert("Lưu Thành Công");
          this.router.navigateByUrl('customers')
        },
        error => {

          console.log("Error", error);

        });
    } else {
      this.networkserviceService.postCustomer(this.customer as Customer).subscribe(x => {
          alert("Lưu Thành Công");
          this.router.navigateByUrl('customers')
        },
        error => {
          console.log("Error", error);

        });
    }

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

}
