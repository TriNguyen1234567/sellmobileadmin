import { Component, OnInit } from "@angular/core";
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

interface Category {
  label: string,
  value: string
}

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {

  them = 1
  editData: any
  deviceUpdate = []
  danhmucform: FormGroup | any;
  categories: Category[];
  selectedCategory: any;
  // selectedCategory: string = 'air_pods_new';
  category = 'iphone';

  summary = '';
  summary2 = '';
  summary3 = '';
  summary4 = '';
  summary5 = '';
  summary6 = '';
  summary7 = '';

  no = null;
  no2 = null;
  no3 = null;
  no4 = null;
  no5 = null;
  no6 = null;
  no7 = null;

  details = '';

  price = '';
  price2 = '';
  price3 = '';
  price4 = '';
  price5 = '';
  price6 = '';
  price7 = '';

  giamoi = '';
  giamoi2 = '';
  giamoi3 = '';
  giamoi4 = '';
  giamoi5 = '';
  giamoi6 = '';
  giamoi7 = '';

  image = '';
  video = '';
  videoPath = '';
  videoPathName = '';
  name = '';
  remarks = '';
  guarantee = '';
  email = '';
  device = [];
  device2 = [];
  device3 = [];
  device4 = [];
  device5 = [];
  device6 = [];
  device7 = [];
  arrayImage = [];
  arrayVideo = ''


  uploadedFiles: any[] = [];
  fileToUpload: File = null;

  uplo: File
  uploVideo: File

  data: any

  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.editData = window.history.state
    this.categories = [
      { label: 'Iphone', value: 'iphone' },
      { label: 'Ipad', value: 'ipad' },
      { label: 'Apple Watch', value: 'applewatch' },
      { label: 'Au', value: 'au' },
      { label: 'Docomo', value: 'docomo' },
      { label: 'Softbank', value: 'softbank' },
      { label: 'UQ Mobile', value: 'uqmobile' },
      { label: 'Y Mobile', value: 'ymobile' },
      { label: 'イヤホン', value: 'イヤホン' },
      { label: 'その他', value: 'その他' },
      // { label: 'Dien thoai cu', value: 'dienthoaicu' }
    ]
    this.initForm()

  }



  ngOnInit() {

    console.log('this.editData', this.editData)
    if (this.editData.id) {
      this.danhmucform.controls['danhmucspform'].value = this.editData.category
      this.selectedCategory = this.editData.category
      this.category = this.editData.category
      this.name = this.editData.name
      this.summary = this.editData.summary
      // this.remarks = this.editData.remarks
      this.summary = this.editData.summary
      this.no = this.editData.no
      this.price = this.editData.price
      this.giamoi = this.editData.giamoi
    }
    else {
      this.selectedCategory = 'iphone';
    }
  }

  initForm() {
    this.danhmucform = this.formBuilder.group({
      danhmucspform: new FormControl(null)

    })
  }

  onFormChanges() {



  }

  submit() {

    if (this.editData.id) {

      this.deviceUpdate = [this.danhmucform.get('danhmucspform').value,
      this.summary,
      // this.details,
      this.price,

      this.name,

      this.no, this.giamoi, this.editData.id
      ]
      console.log('this.deviceUpdate', this.deviceUpdate)
      this.networkserviceService.updateAllDevices(this.deviceUpdate).subscribe(
        data => {
          alert("Lưu Thành Công");

          console.log("POST Request is successful ", data);
          this.router.navigateByUrl('dashboard')
        },
        error => {

          console.log("Error", error);

        })
    }
    else {
      if (this.summary != '') {
        console.log(this.arrayImage)
        this.device = [
          this.category,
          this.summary,
          // this.details,
          this.price,
          this.name,
          this.no,
          // true,
          this.giamoi
        ]
        console.log(this.device)

        this.networkserviceService.postAllDevice(this.device).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);

            this.router.navigateByUrl('dashboard')
          },
          error => {

            console.log("Error", error);

          })
      }


      if (this.summary2 != '') {
        this.device2 = [
          this.category,
          this.summary2,
          // this.details,
          this.price2,
          this.name,
          this.no2,
          // true,
          this.giamoi2
        ]
        console.log(this.device2)

        this.networkserviceService.postAllDevice(this.device2).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);

            this.router.navigateByUrl('dashboard')
          },
          error => {

            console.log("Error", error);

          })
      }

      if (this.summary3 != '') {
        this.device3 = [
          this.category,
          this.summary3,
          // this.details,
          this.price3,
          this.name,
          this.no3,
          // true,
          this.giamoi3
        ]
        console.log(this.device3)

        this.networkserviceService.postAllDevice(this.device3).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);


          },
          error => {

            console.log("Error", error);

          })
      }

      if (this.summary4 != '') {
        this.device4 = [
          this.category,
          this.summary4,
          // this.details,
          this.price4,
          this.name,
          this.no4,
          // true,
          this.giamoi4
        ]
        console.log(this.device4)

        this.networkserviceService.postAllDevice(this.device4).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);


          },
          error => {

            console.log("Error", error);

          })
      }


      if (this.summary5 != '') {
        this.device5 = [
          this.category,
          this.summary5,
          // this.details,
          this.price5,
          this.name,
          this.no5,
          // true,
          this.giamoi5
        ]
        console.log(this.device5)

        this.networkserviceService.postAllDevice(this.device5).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);


          },
          error => {

            console.log("Error", error);

          })
      }


      if (this.summary6 != '') {
        this.device6 = [
          this.category,
          this.summary6,
          // this.details,
          this.price6,
          this.name,
          this.no6,
          // true,
          this.giamoi6
        ]
        console.log(this.device6)

        this.networkserviceService.postAllDevice(this.device6).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);


          },
          error => {

            console.log("Error", error);

          })
      }


      if (this.summary7 != '') {
        this.device7 = [
          this.category,
          this.summary7,
          // this.details,
          this.price7,
          this.name,
          this.no7,
          // true,
          this.giamoi7
        ]
        console.log(this.device7)

        this.networkserviceService.postAllDevice(this.device7).subscribe(
          data => {
            alert("Lưu Thành Công");

            console.log("POST Request is successful ", data);


          },
          error => {

            console.log("Error", error);

          })
      }










    }

  }

  onchange() {

  }

  cancel() {
    this.router.navigateByUrl('dashboard')
  }

  onChangeCategory(val) {
    this.category = val.value
  }






  //     // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  //   }


  onUpload(event) {
    for (let file of event.files) {
      this.uplo = file;
      this.uploadFileToActivity();
      this.arrayImage.push(file.name)

    }
    alert('Upload Thành Công');
    // this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.networkserviceService.postFile(this.uplo).subscribe(data => {
      // alert('Success');
      console.log('success');
    }, error => {
      console.log(error);
    });
  }

  onUploadVideo(event) {
    for (let file of event.files) {
      this.uploVideo = file;
      this.uploadFileToActivityVideo();
      this.video = file.name

    }
    alert('Upload Thành Công');
    // this.uploadFileToActivity();
  }
  uploadFileToActivityVideo() {
    this.networkserviceService.postFileVideo(this.uploVideo).subscribe(data => {
      // alert('Success');
      console.log('success');
    }, error => {
      console.log(error);
    });
  }

  deleteVideo(image6Path) {
    this.video = null
  }


  themnhacungcap() {
    this.them = this.them + 1
  }

}
