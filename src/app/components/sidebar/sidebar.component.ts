import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  // rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "DS Sản phẩm",
    // rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  // {
  //   path: "/wifi",
  //   title: "WiFi Tồn Kho",
  //   // rtlTitle: "لوحة القيادة",
  //   icon: "icon-world",
  //   class: ""
  // },
  // {
  //   path: "/wifidoicaplaisim",
  //   title: "WiFi Đợi Cấp Lại Sim",
  //   // rtlTitle: "لوحة القيادة",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "/icons",
  //   title: "DS ngừng bán",
  //   // rtlTitle: "الرموز",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "/maps",
  //   title: "Maps",
  //   rtlTitle: "خرائط",
  //   icon: "icon-pin",
  //   class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   rtlTitle: "إخطارات",
  //   icon: "icon-bell-55",
  //   class: ""
  // },

  {
    path: "/user",
    title: "Sản phẩm",
    // rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },

  // {
  //   path: "/typography",
  //   title: "DS Khách Hàng Tạm Ngưng",
  //   // rtlTitle: "طباعة",
  //   icon: "icon-align-center",
  //   class: ""
  // },
  // {
  //   path: "/tables",
  //   title: "DS Khách Hàng Hủy",
  //   // rtlTitle: "قائمة الجدول",
  //   icon: "icon-puzzle-10",
  //   class: ""
  // },
  
  // {
  //   path: "/rtl",
  //   title: "DS Khách Hàng Trả Lại",
  //   //rtlTitle: "ار تي ال",
  //   icon: "icon-world",
  //   class: ""
  // },

  // {
  //   path: "/chuatracoc",
  //   title: "DS KH Chưa Trả Cọc",
  //   //rtlTitle: "ار تي ال",
  //   icon: "icon-pin",
  //   class: ""
  // },

  // {
  //   path: "/congtacvien",
  //   title: "DANH SÁCH CỘNG TÁC VIÊN",
  //   //rtlTitle: "ار تي ال",
  //   icon: "icon-bell-55",
  //   class: ""
  // }
  {
    path: "/customers",
    title: "DS NGƯỜI BÁN",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/customer",
    title: "NGƯỜI BÁN",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/invoices",
    title: "DS THU MUA",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/invoice",
    title: "ĐƠN THU MUA",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  }

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
