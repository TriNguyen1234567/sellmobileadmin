import { Component, OnInit } from "@angular/core";
import { notEmpty } from '../../utils/data.utils';
import { User } from '../model/user';
import { USER_ROLE, USERS } from '../../constant/common';

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
];

export const WEB_THU_MUA_ROUTES: RouteInfo[] = [
  {
    path: "/customers",
    title: "QUẢN LÝ NGƯỜI BÁN",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/invoices",
    title: "QUẢN LÝ ĐƠN THU MUA",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/mobiles",
    title: "DS MÁY TRONG KHO",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/orders",
    title: "DS ĐH ĐANG XỬ LÝ",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/ordersComplete",
    title: "DS ĐH HOÀN THÀNH",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/statistics",
    title: "QUẢN LÝ THU CHI",
    //rtlTitle: "ار تي ال",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/devices",
    title: "QUẢN LÝ MÁY",
    icon: "icon-single-02",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  webThuMuaMenuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.webThuMuaMenuItems = WEB_THU_MUA_ROUTES.filter(menuItem => {
      let userData = localStorage.getItem('user');
      let user: User = null;
      if (notEmpty(userData)) {
        user = JSON.parse(userData);
        return menuItem.path === '/statistics' && user.role == USER_ROLE.EMPLOYEE ? false : menuItem;
      }
      return menuItem;
    });
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
