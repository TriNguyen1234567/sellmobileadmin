import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE, PEOPLE_JOBS } from '../../constant/common';
import { getAge } from '../../utils/date.utils';

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
  selectedJobs: any = '';
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
    const job = this.jobs.find(x => x.value === this.customer.job);
    if (job) {
      this.selectedJobs = job;
    }
  }

  ngOnInit() {
    this.editData = window.history.state;
    if (this.editData.id) {
      this.getData();
    }
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
    var data = [];
    Object.keys(this.customer).forEach(x => {
      data.push(this.customer[x]);
    });

    if (this.customer.id) {
      this.networkserviceService.putCustomer(data).subscribe(x => {
          this.router.navigateByUrl('customers')
        },
        error => {

          console.log("Error", error);

        });
    } else {
      this.networkserviceService.postCustomer(data).subscribe(x => {
          this.router.navigateByUrl('customers')
        },
        error => {
          console.log("Error", error);

        });
    }

  }

}
