import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NETWORK } from '../constant/constant';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class NetworkserviceService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  user: any = []

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllDevice() {
    const getAllDeviceAPI = `${NETWORK.API.Detail}`;
    return this.httpClient.get<any>(getAllDeviceAPI);
  }

  deleteDevice(data): Observable<any> {
    const deleteDeviceAPI = `${NETWORK.API.Device}/${data}`;
    return this.httpClient.delete(deleteDeviceAPI)
  }


  getAllUser() {

  }


  postAllUser(data): Observable<any> {
    const postAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.post<any>(postAllUserAPI, data, this.httpOptions)
  }


  deleteUser(data): Observable<any> {
    const deleteUserAPI = `${NETWORK.API.WiFi}/${data}`;
    return this.httpClient.delete(deleteUserAPI)
  }

  deleteCongtacvien(data): Observable<any> {
    const deleteCongtacvienAPI = `${NETWORK.API.Congtacvien}/${data}`;
    return this.httpClient.delete(deleteCongtacvienAPI)
  }

  updateAllUser(data): Observable<any> {
    const updateAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.put<any>(updateAllUserAPI, data, this.httpOptions)
  }


  updateAllDevices(data): Observable<any> {
    const updateAllDevicesAPI = `${NETWORK.API.UpdateDevice}`;
    return this.httpClient.put<any>(updateAllDevicesAPI, data, this.httpOptions)
  }

  postAllDevice(data): Observable<any> {
    const postAllDeviceAPI = `${NETWORK.API.Device}`;
    return this.httpClient.post<any>(postAllDeviceAPI, data, this.httpOptions)
  }

  updateDeviceStatus(data): Observable<any> {
    const UpdateDeviceStatusAPI = `${NETWORK.API.UpdateDeviceStatus}`;
    return this.httpClient.put<any>(UpdateDeviceStatusAPI, data, this.httpOptions)
  }

  updateDeviceNew(data): Observable<any> {
    const UpdateDeviceStatusAPI = `${NETWORK.API.UpdateDeviceNew}`;
    return this.httpClient.put<any>(UpdateDeviceStatusAPI, data, this.httpOptions)
  }

  // postFile(fileToUpload): Observable<any> {
  //   const endpoint = `http://tonylemobile.com:3000/api/upload`;

  //   return this.httpClient.post<any>(endpoint, fileToUpload, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'file'
  //     })
  //   })
  // }

  postFile(filesToUpload: any): Observable<any> {
    let url = 'http://tonylemobile.com:3000/api/upload';

    const formData: FormData = new FormData();

    console.log('file.data, file.data.name')
    console.log(filesToUpload.data, filesToUpload.name)
    formData.append('file', filesToUpload, filesToUpload.name);


    console.log(formData);

    let headers = new HttpHeaders();

    return this.httpClient.post(url, formData, {headers: headers});
  }

  postFileVideo(filesToUpload: any): Observable<any> {
    let url = 'http://tonylemobile.com:3000/api/uploadVideo';

    const formData: FormData = new FormData();

    console.log('file.data, file.data.name')
    console.log(filesToUpload.data, filesToUpload.name)
    formData.append('file', filesToUpload, filesToUpload.name);


    console.log(formData);

    let headers = new HttpHeaders();

    return this.httpClient.post(url, formData, {headers: headers});
  }

  getCustomers() {
    const customersURL = `${NETWORK.API.Customers}`;
    return this.httpClient.get<any>(customersURL);
  }

  searchCustomers(query: any, search_type = 'BIRTHDAY') {
    const searchCustomerUrl = `${NETWORK.API.Customers}\\search`;
    const data = {
      search_type,
      query
    };
    let headers = new HttpHeaders();
    return this.httpClient.post<any>(searchCustomerUrl, data, {headers: headers});
  }

  postCustomer(data) {
    const customersURL = `${NETWORK.API.Customers}`;
    let headers = new HttpHeaders();
    return this.httpClient.post<any>(customersURL, data, {headers: headers});
  }

  putCustomer(data) {
    const customersURL = `${NETWORK.API.Customers}`;
    let headers = new HttpHeaders();
    return this.httpClient.put<any>(customersURL, data, {headers: headers});
  }

  deleteCustomer(data) {
    const customersURL = `${NETWORK.API.Customers}/${data}`;
    return this.httpClient.delete<any>(customersURL);
  }

  getInvoices() {
    const invoicesUrl = `${NETWORK.API.Invoices}`;
    return this.httpClient.get<any>(invoicesUrl);
  }

  getInvoiceItems(invoice_id: number) {
    const invoiceItemsUrl = `${NETWORK.API.Invoices}\\items\\${invoice_id}`;
    return this.httpClient.get<any>(invoiceItemsUrl);
  }

  postInvoice(data) {
    const postInvoiceURL = `${NETWORK.API.Invoices}`;
    let headers = new HttpHeaders();
    return this.httpClient.post<any>(postInvoiceURL, data, {headers: headers});
  }

  getMobiles() {
    const customersURL = `${NETWORK.API.Mobiles}`;
    return this.httpClient.get<any>(customersURL);
  }

  postOrder(data) {
    const postInvoiceURL = `${NETWORK.API.OrderInvoices}`;
    let headers = new HttpHeaders();
    return this.httpClient.post<any>(postInvoiceURL, data, {headers: headers});
  }

  putOrder(data) {
    const postInvoiceURL = `${NETWORK.API.OrderInvoices}`;
    let headers = new HttpHeaders();
    return this.httpClient.put<any>(postInvoiceURL, data, {headers: headers});
  }

  getOrdersPending() {
    const postInvoiceURL = `${NETWORK.API.OrderInvoices}\\Pending`;
    return this.httpClient.get<any>(postInvoiceURL);
  }

  getOrdersCompleted() {
    const postInvoiceURL = `${NETWORK.API.OrderInvoices}\\Completed`;
    return this.httpClient.get<any>(postInvoiceURL);
  }
  getOrderDetail(orderId) {
    const postInvoiceURL = `${NETWORK.API.OrderInvoices}\\details\\${orderId}`;
    return this.httpClient.get<any>(postInvoiceURL);
  }

  deleteInvoice(data) {
    const invoicesUrl = `${NETWORK.API.Invoices}/${data}`;
    return this.httpClient.delete<any>(invoicesUrl);
  }

  putInvoice(data) {
    const invoicesUrl = `${NETWORK.API.Invoices}`;
    let headers = new HttpHeaders();
    return this.httpClient.put<any>(invoicesUrl, data, {headers: headers});
  }

  getStatistics(type, fromDate, toDate) {
    const postInvoiceURL = `${NETWORK.API.Statistics}?type=${type}&fromDate=${fromDate}&toDate=${toDate}`;
    return this.httpClient.get<any>(postInvoiceURL);
  }
  getDevices() {
    const devicesURL = `${NETWORK.API.Devices}`;
    return this.httpClient.get<any>(devicesURL);
  }

  getInvoiceReport = (id: number): any => {
    return this.httpClient.get(`${NETWORK.API.Invoices}/report/${id}`, {
      responseType: 'arraybuffer'
    })
  }
}
