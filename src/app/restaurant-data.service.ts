import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {

  private dataKey = 'order1Data'; // 定義 LocalStorage 的 key
  name: string = '';
  phone: string = '';
  animalControl: string = '';
  noodolControl: string = '';
  date: string = '';
  time: string = '';
  cutlery: string = '';
  remark: string = '';

  constructor() {
    // 預設值初始化（可選）
    this.name = '';
    this.phone = '';
    this.animalControl = '';
    this.noodolControl = '';
    this.date = '';
    this.time = '';
    this.cutlery = '';
    this.remark = '';
  }

  // 取得所有資料
  getData(): any[] {
    const data = localStorage.getItem(this.dataKey);
    return data ? JSON.parse(data) : [];
  }

  // 儲存資料
  saveData(data: any[]): void {
    localStorage.setItem(this.dataKey, JSON.stringify(data));
  }

  // 新增單筆資料
  addData(newData: any): void {
    const dataList = this.getData();
    dataList.unshift(newData);
    this.saveData(dataList);
  }

  // 清空所有資料
  clearData(): void {
    localStorage.removeItem(this.dataKey);
  }
}
