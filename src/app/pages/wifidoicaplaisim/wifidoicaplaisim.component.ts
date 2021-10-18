import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { network } from 'src/app/components/model/network';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wifidoicaplaisim',
  templateUrl: './wifidoicaplaisim.component.html',
  styleUrls: ['./wifidoicaplaisim.component.scss']
})
export class WifidoicaplaisimComponent implements OnInit {

  data: network[] = [];
  dataAll: any
  wifiform: FormGroup | any;
  cols: any[];
  wifidata: any
  luuwifidata: any
  wifidataupdate: any
  clonedData: { [s: string]: network; } = {};
  displayDialog: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.initForm();
    this.onFormChanges();
  }

  ngOnInit() {
    this.cols = [

      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'sdtsim', header: 'SDT SIM' },
      { field: 'masim', header: 'Mã SIM' },

    ];
 }

  initForm() {
    this.wifiform = this.formBuilder.group({
      mawifi: new FormControl(null),
      sdtsim: new FormControl(null),
      masim: new FormControl(null),

    })
  }

  onFormChanges() {
    this.wifiform.valueChanges.subscribe(res => {

      this.wifidata = res
  

    });

  }

  selectNetWithButton(value) {

  }

  onRowEditInit(val) {
    this.clonedData[val] = { ...val };
    
  }

  onRowEditSave(val) {
    this.wifidataupdate = [
      null,
      null,
      null,
      null,
      null,
      true,
      null,
      null,
      null,
      val.sdtsim,
      val.masim,
      
      'sudung',
      null,
      null,
      val.congtacvien,
      null,
      
      val.mawifi,
    ]
    this.networkserviceService.updateAllUser(this.wifidataupdate).subscribe(
      data => {
        alert("WiFi đã được cấp lại thành công. Chuyển qua Ds Wifi tồn kho");

        this.ngOnInit();
        console.log("POST Request is successful ", data);
      },
      error => {

        console.log("Error", error);

      })
 
  }

  onRowEditCancel(val, index) {
    this.data[index] = this.clonedData[val];
    delete this.clonedData[val];

  }

  onRowDelete(val) {
    let isDel = confirm("Bạn có muốn xóa WiFi này không?");
    if(isDel==true){
      this.networkserviceService.deleteUser(val.mawifi).subscribe(
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

  

  // save() {

  //   let isDup = false
  //   for (let i = 0; i < this.dataAll.length; i++) {
  //     if (this.dataAll[i].mawifi === this.wifidata.mawifi) {
  //       isDup = true
  //       break;
  //     }
  //   }
  //   if (isDup == false) {
  //     if (this.wifidata.mawifi && this.wifidata.masim && this.wifidata.sdtsim) {
  //       this.luuwifidata = [
  //         this.wifidata.mawifi,
  //         this.wifidata.sdtsim,
  //         this.wifidata.masim,
  //         , null, null, null, null, null, true, null, null,'sudung',null,null
  //       ]
  //       this.networkserviceService.postAllUser(this.luuwifidata).subscribe(
  //         data => {
  //           alert("Lưu Thành Công");
  //           this.displayDialog=false
  //           this.ngOnInit()
  //           console.log("POST Request is successful ", data);
  //         },
  //         error => {

  //           console.log("Error", error);

  //         })
  //     }
  //     else {
  //       alert("Điền thông tin vào ô * trống");
  //     }
  //   }
  //   else {
  //     alert("Mã WiFi đã tồn tại")
  //   }
  // }
  // cancel(){
  //   this.displayDialog=false
  // }
  exportExcel() {
  
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "DanhSachKH_HUY");

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
