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
    const customersURL = `${NETWORK.API.Invoices}`;
    return this.httpClient.get<any>(customersURL);
  }

  getInvoiceItems(invoice_id: number) {
    const invoiceItemsUrl = `${NETWORK.API.Invoices}\\items\\${invoice_id}`;
    return this.httpClient.get<any>(invoiceItemsUrl);
  }

  getCustomerByBirthday(birthday) {
    let params = new HttpParams().set('birthday', birthday);
    const customerByBirthday = `${NETWORK.API.GetCustomerByBirthday}`;

    return this.httpClient.get<any>(customerByBirthday, {params: params});
  }

  postInvoice(data) {
    const postInvoiceURL = `${NETWORK.API.Invoices}`;
    let headers = new HttpHeaders();
    return this.httpClient.post<any>(postInvoiceURL, data, {headers: headers});
  }
}
