import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    this.generateWorkbook(worksheet, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const date = new Date();
    FileSaver.saveAs(data, fileName + '_export_' + `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}` + EXCEL_EXTENSION);
  }

  public exportAsExcelFileFormat(json, customer, excelFileName: string, sale_date, total_money): void {
   var saleDateArray = sale_date.split('-');
   var saleDateFormat = `${saleDateArray[0]}年 ${saleDateArray[1]}月${saleDateArray[2]}日`
   var birthdayArray = customer.birthday.split('-');
   var birthdayFormat = `${birthdayArray[0]}年 ${birthdayArray[1]}月${birthdayArray[2]}日`
    // Create info file part
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['', 'Tony Le Mobile株式会社'],
      ['', '', '', '', '', '東京都公安委員会許可　第 304372117441 号'],
      ['', '買取 申 込. 書          ', '', '', '', '', saleDateFormat],
      [],
      ['フリガナ:', '', customer.name_japanese, '生年月日', birthdayFormat, '', customer.age + '歳'],
      ['お名前:', '', customer.name_vietnamese, '電話番号', customer.phone, 'ご職業'],
      ['住所', '', '〒286-0134 千葉県成田市東和田351-1レオパレスブリッジ１０９', '', '', '', '', customer.job]
    ]);

    worksheet['!merges'] = [{ s: { r: 0, c: 1 }, e: { r: 0, c: 7 } }, 
      { s: { r: 1, c: 5 }, e: { r: 1, c: 7 } }, 
      { s: { r: 2, c: 1 }, e: { r: 2, c: 4 } }, 
      { s: { r: 2, c: 6 }, e: { r: 2, c: 7 } },
      { s: { r: 4, c: 0 }, e: { r: 4, c: 1 }}, { s: { r: 4, c: 4 }, e: { r: 4, c: 5 } },
      { s: { r: 5, c: 0 }, e: { r: 5, c: 1 }}, { s: { r: 5, c: 4 }, e: { r: 5, c: 5 } }, { s: { r: 5, c: 5 }, e: { r: 5, c: 6 }},
      { s: { r: 6, c: 0 }, e: { r: 6, c: 1 }}, { s: { r: 6, c:  2}, e: { r: 6, c: 6 }}, { s: { r: 6, c: 7 }, e: { r: 6, c: 8 }}, 
    ]

    // Create checklist table
    // Get header array
     const header = Object.keys(json[0]);

    XLSX.utils.sheet_add_json(worksheet, json, { header: header, origin: 'A10' });

    XLSX.utils.sheet_add_aoa(worksheet, [
      [json.length + 1, '合計', '', '', json.length, total_money],
      [],
      ['1.盗難・詐欺行為・不正契約等で入手した商品は買取をお断り致します。（不正入手が発覚した場合は返金・損害賠償請求致します。）'],
      ['2.提出された身分証明書が偽造・第三者のものであった場合は買取をお断り致します。'],
      ['3.携帯電話の場合、遠隔ロック等をされた場合は返金請求致します。'],
      ['4.商品の状態により、仮見積もりより減額となる場合があります。'],
      ['5.オールリセットされていない携帯電話は着払い返送させていただきます。'],
      ['6.本査定にて金額にご納得頂けない場合も商品着払い返送させていただきます。'],
      ['7.未使用品の商品に関してはご購入時のレシート等を添付して頂く場合がございます。'],
      ['8.未成年の方からの商品の買取は（保護者の同意書がない限り）お断りしております。上記確認事項に同意しましたので、買取を依頼致します。'],
      [ '', '東京都公安委員会許可　第 304372117441 号'],
      [ '', '', '', '', '署名:', '']
    ], { origin: -1 });

    this.generateWorkbook(worksheet, excelFileName);
  }

  generateWorkbook(worksheet: XLSX.WorkSheet, excelFileName: string) {
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
}
