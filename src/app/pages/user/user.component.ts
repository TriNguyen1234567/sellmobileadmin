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

  editData: any
  deviceUpdate = []
  danhmucform: FormGroup | any;
  categories: Category[];
  selectedCategory: any;
  // selectedCategory: string = 'air_pods_new';
  category = 'air_pods_new';
  summary = '';
  no = null;
  details = '';
  price = '';
  giamoi='';
  image = '';
  video = '';
  videoPath = '';
  videoPathName = '';
  name = '';
  remarks = '';
  guarantee = '';
  email = '';
  device = [];
  arrayImage = [];
  arrayVideo = ''
  image1 = '';
  image1Path = '';
  image1PathName = '';
  image2 = '';
  image2Path = '';
  image2PathName = '';
  image3 = '';
  image3Path = '';
  image3PathName = '';
  image4 = '';
  image4Path = '';
  image4PathName = '';
  image5 = '';
  image5Path = '';
  image5PathName = '';
  image6 = '';
  image6Path = '';
  image6PathName = '';
  image7 = '';
  image7Path = '';
  image7PathName = '';
  image8 = '';
  image8Path = '';
  image8PathName = '';
  image9 = '';
  image9Path = '';
  image9PathName = '';
  image10 = '';
  image10Path = '';
  image10PathName = '';

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
      { label: 'Air Pods', value: 'air_pods_new' },
      { label: 'Ipad New', value: 'ipad_new' },
      { label: 'Iphone New', value: 'iphone_new' },
      { label: 'Macbook Air', value: 'macbook_new' },
      { label: 'Macbook Pro', value: 'macbookpro' },
      { label: 'Sim Data Wifi New', value: 'sim_data_wifi_new' },
      { label: 'Apple watch New', value: 'apple_watch_new' },
      { label: 'Android', value: 'android' },
      { label: 'Phụ kiện', value: 'phukien' },
      { label: 'Sản phẩm khác', value: 'sanphamkhac' },
      { label: 'Dien thoai cu', value: 'dienthoaicu' }
    ]
    this.initForm()

  }

 

  ngOnInit() {

    console.log('this.editData', this.editData)
    if (this.editData.id) {
      this.danhmucform.controls['danhmucspform'].value=this.editData.category
      this.selectedCategory = this.editData.category
      this.category = this.editData.category
      this.name = this.editData.name
      this.summary = this.editData.summary
      // this.remarks = this.editData.remarks
      this.summary = this.editData.summary
      this.no = this.editData.no
      this.price = this.editData.price
      this.giamoi = this.editData.giamoi
      // this.guarantee = this.editData.guarantee
      // this.details = this.editData.details
      // this.video = this.editData.video
      // this.image1 = this.editData.image1
      // this.image1Path = 'http://tonylemobile.com' + this.image1
      // this.videoPath = 'http://tonylemobile.com' + this.video
      // this.image1PathName = this.image1Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.videoPathName = this.videoPath.replace('http://tonylemobile.com./assets/images/', '')
      // console.log(this.image1Path)
      // this.image2 = this.editData.image2
      // this.image2Path = 'http://tonylemobile.com' + this.image2
      // console.log(this.image2, this.image1Path)
      // this.image2PathName = this.image2Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image3 = this.editData.image3
      // this.image3Path = 'http://tonylemobile.com' + this.image3
      // this.image3PathName = this.image3Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image4 = this.editData.image4
      // this.image4Path = 'http://tonylemobile.com' + this.image4
      // this.image4PathName = this.image4Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image5 = this.editData.image5
      // console.log('this.image5', this.image5)
      // this.image5Path = 'http://tonylemobile.com' + this.image5
      // this.image5PathName = this.image5Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image6 = this.editData.image6
      // this.image6Path = 'http://tonylemobile.com' + this.image6
      // this.image6PathName = this.image6Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image7 = this.editData.image7
      // this.image7Path = 'http://tonylemobile.com' + this.image7
      // this.image7PathName = this.image6Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image8 = this.editData.image8
      // this.image8Path = 'http://tonylemobile.com' + this.image8
      // this.image8PathName = this.image8Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image9 = this.editData.image9
      // this.image9Path = 'http://tonylemobile.com' + this.image9
      // this.image9PathName = this.image9Path.replace('http://tonylemobile.com./assets/images/', '')
      // this.image10 = this.editData.image10
      // this.image10Path = 'http://tonylemobile.com' + this.image10
      // this.image10PathName = this.image10Path.replace('http://tonylemobile.com./assets/images/', '')
    }
    else {
      this.selectedCategory = 'air_pods_new';
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
      // if (this.arrayImage.length > 0) {
      //   if (this.image1) this.arrayImage.push(this.image1.replace('./assets/images/', ''))
      //   if (this.image2) this.arrayImage.push(this.image2.replace('./assets/images/', ''))
      //   if (this.image3) this.arrayImage.push(this.image3.replace('./assets/images/', ''))
      //   if (this.image4) this.arrayImage.push(this.image4.replace('./assets/images/', ''))
      //   if (this.image5) this.arrayImage.push(this.image5.replace('./assets/images/', ''))
      //   if (this.image6) this.arrayImage.push(this.image6.replace('./assets/images/', ''))
      //   if (this.image7) this.arrayImage.push(this.image7.replace('./assets/images/', ''))
      //   if (this.image8) this.arrayImage.push(this.image8.replace('./assets/images/', ''))
      //   if (this.image9) this.arrayImage.push(this.image9.replace('./assets/images/', ''))
      //   if (this.image10) this.arrayImage.push(this.image10.replace('./assets/images/', ''))



      //   if (this.arrayImage[0]) {
      //     this.image1 = './assets/images/' + this.arrayImage[0]
      //   }
      //   else this.image1 = null

      //   if (this.arrayImage[1]) {
      //     this.image2 = './assets/images/' + this.arrayImage[1]
      //   }
      //   else this.image2 = null

      //   if (this.arrayImage[2]) {
      //     this.image3 = './assets/images/' + this.arrayImage[2]
      //   }
      //   else this.image3 = null

      //   if (this.arrayImage[3]) {
      //     this.image4 = './assets/images/' + this.arrayImage[3]
      //   }
      //   else this.image4 = null

      //   if (this.arrayImage[4]) {
      //     this.image5 = './assets/images/' + this.arrayImage[4]
      //   }
      //   else this.image5 = null

      //   if (this.arrayImage[5]) {
      //     this.image6 = './assets/images/' + this.arrayImage[5]
      //   }
      //   else this.image6 = null

      //   if (this.arrayImage[6]) {
      //     this.image7 = './assets/images/' + this.arrayImage[6]
      //   }
      //   else this.image7 = null

      //   if (this.arrayImage[7]) {
      //     this.image8 = './assets/images/' + this.arrayImage[7]
      //   }
      //   else this.image8 = null

      //   if (this.arrayImage[8]) {
      //     this.image9 = './assets/images/' + this.arrayImage[8]
      //   }
      //   else this.image9 = null

      //   if (this.arrayImage[9]) {
      //     this.image10 = './assets/images/' + this.arrayImage[9]
      //   }
      //   else this.image10 = null

      // }

      this.deviceUpdate = [this.danhmucform.get('danhmucspform').value,
      this.summary,
      // this.details,
      this.price, 
      // this.image1, this.image2, this.video, this.image3, this.image4, this.image5, this.image6, 
      this.name,
      // this.remarks, this.guarantee, null,this.editData.active,this.image7,this.image8,this.image9,this.image10,
      this.no, this.giamoi, this.editData.id
      ]
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
      // this.arrayImage = this.image.split(',')
      // if (this.arrayImage[0]) {
      //   this.image1 = './assets/images/' + this.arrayImage[0]
      // }
      // else this.image1 = null

      // if (this.arrayImage[1]) {
      //   this.image2 = './assets/images/' + this.arrayImage[1]
      // }
      // else this.image2 = null

      // if (this.arrayImage[2]) {
      //   this.image3 = './assets/images/' + this.arrayImage[2]
      // }
      // else this.image3 = null

      // if (this.arrayImage[3]) {
      //   this.image4 = './assets/images/' + this.arrayImage[3]
      // }
      // else this.image4 = null

      // if (this.arrayImage[4]) {
      //   this.image5 = './assets/images/' + this.arrayImage[4]
      // }
      // else this.image5 = null

      // if (this.arrayImage[5]) {
      //   this.image6 = './assets/images/' + this.arrayImage[5]
      // }
      // else this.image6 = null

      // if (this.arrayImage[6]) {
      //   this.image7 = './assets/images/' + this.arrayImage[6]
      // }
      // else this.image7 = null

      // if (this.arrayImage[7]) {
      //   this.image8 = './assets/images/' + this.arrayImage[7]
      // }
      // else this.image8 = null

      // if (this.arrayImage[8]) {
      //   this.image9 = './assets/images/' + this.arrayImage[8]
      // }
      // else this.image9 = null

      // if (this.arrayImage[9]) {
      //   this.image10 = './assets/images/' + this.arrayImage[9]
      // }
      // else this.image10 = null

      console.log(this.arrayImage)
      this.device = [
        this.category,
        this.summary,
        // this.details,
        this.price,
        // this.image1,
        // this.image2,
        // this.video,
        // this.image3,
        // this.image4,
        // this.image5,
        // this.image6,
        // DEFAULT,
        this.name,
        // this.remarks,
        // this.guarantee,
        // this.email,
        // true,
        // this.image7,
        // this.image8,
        // this.image9,
        // this.image10,
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

  deleteImage10(image10Path) {
    this.image10 = null
  }

  deleteImage9(image9Path) {
    this.image9 = null
  }

  deleteImage8(image8Path) {
    this.image8 = null
  }

  deleteImage7(image7Path) {
    this.image7 = null
  }

  deleteImage6(image6Path) {
    this.image6 = null
  }

  deleteImage5(image5Path) {
    this.image5 = null
  }
  deleteImage4(image4Path) {
    this.image4 = null
  }
  deleteImage3(image3Path) {
    this.image3 = null
  }
  deleteImage2(image2Path) {
    this.image2 = null
  }
  deleteImage1(image1Path) {
    this.image1 = null
  }

}
