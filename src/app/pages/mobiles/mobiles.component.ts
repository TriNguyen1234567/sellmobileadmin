import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { notEmpty } from '../../utils/data.utils';
import { Mobile } from '../../components/model/mobile';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.scss']
})
export class MobilesComponent implements OnInit {

  originalData = [];
  data = [];
  searchNameText = '';
  searchImeiText = '';
  listDevices = [];
  displayDetailModal: boolean = false;
  mobileSearch: {
    name: string,
    imei: string
  } = {
    name: null,
    imei: null
  }

  constructor(private networkService: NetworkserviceService, public datepipe: DatePipe) {
  }

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

  onSearchMobiles(event) {
    this.data = JSON.parse(JSON.stringify(this.originalData));
    if (notEmpty(this.mobileSearch.name)) {
      this.data = this.data.filter((x: Mobile) => x.name.includes(this.mobileSearch.name));
    }
    if (notEmpty(this.mobileSearch.imei)) {
      this.data = this.data.filter((x: Mobile) => x.imei.includes(this.mobileSearch.imei));
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
