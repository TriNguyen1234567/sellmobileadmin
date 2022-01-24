import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DEFAULT_BIRTHDAY_YEAR_RANGE } from 'src/app/constant/common';
import { NetworkserviceService } from 'src/app/services/networkservice.service';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.scss']
})
export class MobilesComponent implements OnInit {

  constructor(private networkService: NetworkserviceService, public datepipe: DatePipe) { }
  originalData = [];
  data = [];
  searchNameText = '';
  searchImeiText = '';
  listDevices = [];
  displayDetailModal: boolean = false;
  birthdayYearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  ngOnInit() {
    this.getMobiles();
  }

  getMobiles() {
    this.networkService.getMobiles().subscribe(val => {
      this.originalData = val;
      this.data = JSON.parse(JSON.stringify(this.originalData));
      this.data.forEach(x => x['isSelected'] = false);
    })
  }

  SearchChange() {
    if (this.searchNameText == '' && this.searchImeiText == '') {
      this.data = JSON.parse(JSON.stringify(this.originalData));
    } else {
      const tempDate = JSON.parse(JSON.stringify(this.originalData));
      this.data = tempDate.filter(x => x.name.includes(this.searchNameText)  && x.imei.includes(this.searchImeiText));
    }
  }

  onShowDetail() {
    this.listDevices = this.data.filter(x => x['isSelected'] == true);
    this.listDevices.forEach(x => x['salePrice'] = 0)
    this.displayDetailModal = true;
  }

  onRowEditInit(data) {
    const index = this.listDevices.findIndex(x => x.id = data.id)
    if (index > -1) {
      this.listDevices.splice(index, 1);
    }
  }
  createOrder() {
    var date = new Date();
    const mobiles = this.listDevices.map(x => {
      return {
        id: x.id,
        salePrice: x['salePrice']
      };
    });
    const total_money = mobiles.map(mobile => mobile['salePrice']).reduce((a, b) => a + b, 0)
    const order = {
      mobiles,
      sale_date: this.datepipe.transform(date, 'yyyy-MM-dd'), total_money, quantity: mobiles.length
    }
    this.networkService.postOrder(order).subscribe(val => {
      alert("Lưu Thành Công");
      this.getMobiles();
      this.displayDetailModal = false;
    });

  }

}
