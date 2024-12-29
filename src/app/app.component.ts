import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  dataList: any[] = []; // 用來儲存從 localStorage 獲取的資料
  displayedColumns: string[] = ['name', 'phone', 'animalControl', 'noodolControl', 'date', 'time', 'cutlery', 'remark', 'price', 'actions'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const data = localStorage.getItem('order1Data');
    if (data) {
      this.dataList = JSON.parse(data);
    } else {
      this.dataList = [];
    }
  }

  saveData(): void {
    localStorage.setItem('order1Data', JSON.stringify(this.dataList));
  }

  getPrice(element: any): number {
    if (element.animalControl === '原味') {
      return 90;

    } else if (!element.animalControl) { // 檢查 null 或 undefined
      return 0;
    } return 100;
  }



  editRecord(index: number): void {
    const record = this.dataList[index];
    // const updatedRecord = prompt('請修改資料 (JSON 格式)', JSON.stringify(record));
    // if (updatedRecord) {
    //   try {
    //     this.dataList[index] = JSON.parse(updatedRecord); // 將修改後的資料更新至 dataList
    //     this.saveData(); // 儲存到 localStorage
    //     alert('資料已成功修改！');
    //   } catch (e) {
    //     alert('格式錯誤，請輸入有效的 JSON');
    //   }
    // }

    const dialogRef = this.dialog.open(AddComponent, {
      width: '80%',
      data: record, // 傳遞資料到對話框
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // 更新資料並儲存至 localStorage
        this.dataList[index] = result;
        this.saveData();
        alert('資料已成功更新！');
      }
    });




  }

  deleteRecord(index: number): void {
    if (confirm('確定要刪除此筆資料嗎？')) {
      this.dataList.splice(index, 1); // 刪除對應的資料
      this.saveData(); // 儲存到 localStorage
      alert('資料已刪除！');
    }

    setTimeout(() => { window.location.reload(); }, 100);
  }












  title = 'restaurantms';
  orderData: any;
  readonly dialog = inject(MatDialog);


  openDialog() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '80%',
    });

    // 訂閱對話框關閉事件，接收回傳的資料
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderData = result; // 儲存回傳的資料

      }
    });
  }













}
