import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from '../../utils/data.utils';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  data: any = [];
  originalData: any = [];
  searchText = '';
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
    if (notEmpty(this.searchText)) {
      const tempDate = JSON.parse(JSON.stringify(this.originalData));
      this.data = tempDate.filter(x => {
        return x.name_vietnamese.includes(this.searchText) || x.birthday.toLowerCase() == this.searchText.toLowerCase().trim() || x.phone.includes(this.searchText);
      });
    } else {
      this.data = JSON.parse(JSON.stringify(this.originalData));
    }
  }
}
