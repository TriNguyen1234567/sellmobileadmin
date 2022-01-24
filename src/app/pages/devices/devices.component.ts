import { Component, OnInit } from '@angular/core';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  originalData = [];
  data = [];
  searchNameText = '';
  searchImeiText = '';

  constructor(private networkService: NetworkserviceService, public datepipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.networkService.getDevices().subscribe(val => {
      this.originalData = val;
      this.data = JSON.parse(JSON.stringify(this.originalData));
      this.data.forEach(x => x['isSelected'] = false);
    })
  }

  onShowInvoice(rowData){
    rowData.id = rowData.invoice_id;
    this.router.navigate(['/invoice'], {state: rowData});
  }

  SearchChange() {
    if (this.searchNameText == '' && this.searchImeiText == '') {
      this.data = JSON.parse(JSON.stringify(this.originalData));
    } 
    else {
      const tempData = JSON.parse(JSON.stringify(this.originalData));
      if(this.searchNameText != '' && this.searchImeiText != ''){
        this.data = tempData.filter(x => {
          return x.name.includes(this.searchNameText) && x.imei.includes(this.searchImeiText);
        });
      }
      else if(this.searchNameText != ''){
        this.data = tempData.filter(x => {
          return x.name.includes(this.searchNameText) ;
        });
      }
      else if(this.searchImeiText != ''){
        this.data = tempData.filter(x => {
          return x.imei.includes(this.searchImeiText) ;
        });
      }
    }
  }

}
