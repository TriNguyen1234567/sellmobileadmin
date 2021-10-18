import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { network } from 'src/app/components/model/network';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-congtacvien',
  templateUrl: './congtacvien.component.html',
  styleUrls: ['./congtacvien.component.scss']
})
export class CongtacvienComponent implements OnInit {

  data: any;
  congtacvienform: FormGroup | any;
  cols: any[];
  congtacviendata: any
  luucongtacviendata: any
  congtacviendataupdate: any
  clonedData: { [s: string]: network; } = {};
  displayDialog: boolean;

  constructor(private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.initForm();
    this.onFormChanges();
  }

  ngOnInit() {

    this.cols = [
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'facebook', header: 'Fb' },
      { field: 'sdt', header: 'Số Điện Thoại' },
      { field: 'diachi', header: 'Địa Chỉ' }


    ];
   
  }

  initForm() {
    this.congtacvienform = this.formBuilder.group({
      hoten: new FormControl(null),
      facebook: new FormControl(null),
      sdt: new FormControl(null),
      diachi: new FormControl(null),

    })
  }

  onFormChanges() {
    this.congtacvienform.valueChanges.subscribe(res => {
      this.congtacviendata = res
    });

  }


  onRowEditInit(val) {
    this.clonedData[val] = { ...val };

  }

  onRowEditSave(val) {
    this.congtacviendataupdate = [


      val.facebook,
      val.sdt,
      val.diachi,
      val.hoten
    ]


  }

  onRowEditCancel(val, index) {
    this.data[index] = this.clonedData[val];
    delete this.clonedData[val];

  }

  onRowDelete(val) {
    let isDel = confirm("Bạn có muốn xóa Cong tac vien này không?");
    if (isDel == true) {
      this.networkserviceService.deleteCongtacvien(val.hoten).subscribe(
        data => {
          alert("Xóa Thành Công");
          this.ngOnInit();
          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
    }


  }

  showDialogToAdd() {

    this.displayDialog = true;
  }

  save() {
    if (this.data) {
      if (this.congtacviendata.hoten != this.data.hoten) {
        this.luucongtacviendata = [this.congtacviendata.hoten, this.congtacviendata.facebook,
        this.congtacviendata.sdt, this.congtacviendata.diachi]
       
      }


      else {
        alert("Cong tac vien đã tồn tại")
      }
    }
  }
  cancel() {
    this.displayDialog = false
  }
  exportExcel() {

    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Congtacvien");

  }

  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }
}
