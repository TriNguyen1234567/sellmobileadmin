import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { DATE_CONSTANT, DEFAULT_BIRTHDAY_YEAR_RANGE } from '../../constant/common';
import { notEmpty } from '../../utils/data.utils';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  yearRange = DEFAULT_BIRTHDAY_YEAR_RANGE;
  originalData = [];
  data = [];
  searchNameText = '';
  searchSaleDate = '';
  cols = [
    {field: 'name_vietnamese', header: 'name_vietnamese'},
    {field: 'sale_date', header: 'sale_date'},
    {field: 'quantity', header: 'quantity'},
    {field: 'total_money', header: 'total_money'},
  ];
  dateFormat = DATE_CONSTANT.ORIGINAL_DATE_FORMAT;
  displayDetailModal: boolean = false;
  listDevices = [];
  selectedDevice: any;
  invoiceSearch: {
    name: string,
    sale_date: Date,
  } = {
    name: null,
    sale_date: null
  };

  constructor(
    private networkService: NetworkserviceService, private router: Router, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.networkService.getInvoices().subscribe(val => {
        this.originalData = val;
        this.data = JSON.parse(JSON.stringify(this.originalData));
      }
    )
  }

  onShowDetail(event, rowData) {
    if (notEmpty(rowData)) {
      this.networkService.getInvoiceItems(rowData.id).subscribe((invoiceDetail) => {
        this.displayDetailModal = true;
        if (notEmpty(invoiceDetail)) {
          this.listDevices = invoiceDetail.items;
        }
      });
    }
  }

  onSelectDevice(event) {
  }

  onDeSelectDevice(event) {
  }

  SearchChange() {
    if (this.searchNameText == '' && this.searchSaleDate == '') {
      this.data = JSON.parse(JSON.stringify(this.originalData));
    } else {
      const tempData = JSON.parse(JSON.stringify(this.originalData));
      if (this.searchNameText != '' && this.searchSaleDate != '') {
        this.data = tempData.filter(x => {
          return x.name_vietnamese.includes(this.searchNameText) && this.datepipe.transform(x.sale_date, 'dd-MM-yyyy') == this.searchSaleDate;
        });
      } else if (this.searchNameText != '') {
        this.data = tempData.filter(x => {
          return x.name_vietnamese.includes(this.searchNameText);
        });
      } else if (this.searchSaleDate != '') {
        this.data = tempData.filter(x => {
          return this.datepipe.transform(x.sale_date, 'dd-MM-yyyy') == this.searchSaleDate;
        });
      }
    }
  }

  onSearchInvoices = ($event) => {
    this.data = JSON.parse(JSON.stringify(this.originalData));
    if (notEmpty(this.invoiceSearch.name)) {
      this.data = this.data.filter(x => {
        return x.name_vietnamese.toLowerCase().includes(this.invoiceSearch.name.toLowerCase())
      });
    }

    if (notEmpty(this.invoiceSearch.sale_date)) {
      this.data = this.data.filter(x => {
        return this.datepipe.transform(x.sale_date, 'dd-MM-yyyy') == this.datepipe.transform(this.invoiceSearch.sale_date, 'dd-MM-yyyy');
      });
    }
  }

  navigateToAddInvoice = () => {
    this.router.navigateByUrl('invoice');
  }

  onRowEditInit(rowData) {
    this.router.navigate(['/invoice'], {state: rowData});
  }

  onRowDelete(val, index) {
    let isDel = confirm("Bạn có chắc chắn muốn xóa đơn thu mua của '" + val.name_vietnamese + "' không?");
    if (isDel == true) {
      this.networkService.deleteInvoice(val.id).subscribe(
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

}
