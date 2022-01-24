import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from '../../utils/data.utils';
import { DEFAULT_BIRTHDAY_YEAR_RANGE } from '../../constant/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  data: any = [];
  originalData: any = [];
  searchName = '';
  searchPhone = '';
  searchBirthday = '';
  cols = [
    {field: 'name_vietnamese', header: 'name_vietnamese'},
    {field: 'name_japanese', header: 'name_japanese'},
    {field: 'birthday', header: 'birthday'},
    {field: 'age', header: 'age'},
    {field: 'address', header: 'address'},
    {field: 'phone', header: 'phone'},
    {field: 'job', header: 'job'},
  ];
  isSearching: boolean = false;

  birthdayYearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;

  customerSearch: {
    name: string,
    phone: string,
    birthday: Date,
  } = {
    name: null,
    phone: null,
    birthday: null
  }

  constructor(
    private networkserviceService: NetworkserviceService,
    private router: Router,
    public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.networkserviceService.getCustomers().subscribe(val => {
        this.originalData = val;
        this.originalData.forEach(element => {
          element.birthday = this.datepipe.transform(element.birthday, 'dd-MM-yyyy');
        });
        this.data = JSON.parse(JSON.stringify(this.originalData));
      }
    )
  }

  onRowEditInit(rowData) {
    this.router.navigate(['/customer'], {state: rowData});
  }

  onRowDelete(val, index) {
    let isDel = confirm("Bạn có muốn xóa thông tin người bán '" + val.name_vietnamese + "' không?");
    if (isDel == true) {
      this.networkserviceService.deleteCustomer(val.id).subscribe(
        data => {
          alert("Xóa Thành Công");
          location.reload();
          console.log("DELETE Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        })
    }
  }

  onSearchCustomer(event) {
    console.log('>>>> this: customerSearch: ', this.customerSearch);
    // const tempDate = JSON.parse(JSON.stringify(this.originalData));
    // if (notEmpty(this.searchName) && notEmpty(this.searchPhone && notEmpty(this.searchBirthday))) {
    //   this.data = tempDate.filter(x => {
    //     return x.name_vietnamese.includes(this.searchName) && x.phone.includes(this.searchPhone) && x.birthday.toLowerCase() == this.searchBirthday.toLowerCase().trim();
    //   });
    // }
    // else if(notEmpty(this.searchName) && notEmpty(this.searchPhone)){
    //   this.data = tempDate.filter(x => {
    //     return x.name_vietnamese.includes(this.searchName) && x.phone.includes(this.searchPhone);
    //   });
    // }
    // else if(notEmpty(this.searchPhone) && notEmpty(this.searchBirthday)){
    //   this.data = tempDate.filter(x => {
    //     return x.phone.includes(this.searchPhone) &&  x.birthday.toLowerCase() == this.searchBirthday.toLowerCase().trim();
    //   });
    // }
    // else if(notEmpty(this.searchName) && notEmpty(this.searchBirthday)){
    //   this.data = tempDate.filter(x => {
    //     return x.name_vietnamese.includes(this.searchName) && x.birthday.toLowerCase() == this.searchBirthday.toLowerCase().trim();
    //   });
    // }
    // else if(notEmpty(this.searchName)){
    //   console.log(this.searchName);
    //
    //   this.data = tempDate.filter(x => {
    //     return x.name_vietnamese.includes(this.searchName);
    //   });
    // }
    // else if(notEmpty(this.searchPhone)){
    //   this.data = tempDate.filter(x => {
    //     return x.phone.includes(this.searchPhone);
    //   });
    // }
    // else if(notEmpty(this.searchBirthday)){
    //   this.data = tempDate.filter(x => {
    //     return  x.birthday.toLowerCase() == this.searchBirthday.toLowerCase().trim();
    //   });
    // }
    // else {
    //   this.data = JSON.parse(JSON.stringify(this.originalData));
    // }
  }

  navigateToAddCustomer() {
    this.router.navigateByUrl('customer');
  }
}
