import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { RestaurantDataService } from '../restaurant-data.service';

interface Animal {
  name: string;
  sound: string;
}
interface noodol {
  name2: string;
  sound2: string;
}

@Component({
  selector: 'app-add',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatTimepickerModule,
    MatDialogClose, MatButtonModule, MatFormFieldModule, FormsModule,
    MatInputModule, MatRadioModule, MatDatepickerModule, MatDatepickerModule,
    MatSelectModule, HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  orderForm: FormGroup = new FormGroup({});
  needCutlery: string = ''; // 定義變數並初始化
  valuet: Date = new Date(); // 定義變數並初始化
  data123: RestaurantDataService = new RestaurantDataService();
  dataList: RestaurantDataService[] = [];//定義變數並初始化

  // constructor(
  //   private fb: FormBuilder,
  //   public dialogRef: MatDialogRef<AddComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {
  //   // 初始化表單
  //   this.orderForm = this.fb.group({
  //     name: ['', Validators.required],
  //     phone: ['', [Validators.required, Validators.pattern('09[0-9]{8}')]],
  //     animalControl: ['', Validators.required], //口味
  //     noodolControl: ['', Validators.required],
  //     date: ['', Validators.required],
  //     time: ['', Validators.required],
  //     cutlery: ['', Validators.required],
  //     remark: ['']
  //   });

  // }
  constructor(private restaurantDataService: RestaurantDataService,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.dataList = this.restaurantDataService.getData(); // 從服務中取得初始資料
    if (data) {
      this.orderForm.patchValue(data); // 將資料填入表單
    }
  }
  createForm() {
    const currentDate = new Date();

    this.orderForm = new FormGroup({
      name: new FormControl(this.restaurantDataService.name, [Validators.required]),
      phone: new FormControl(this.restaurantDataService.phone, [Validators.required, Validators.pattern('09[0-9]{8}')]),
      animalControl: new FormControl(this.restaurantDataService.animalControl, Validators.required),
      noodolControl: new FormControl(this.restaurantDataService.noodolControl, Validators.required),
      date: new FormControl(currentDate, Validators.required),
      time: new FormControl(currentDate, Validators.required),
      cutlery: new FormControl(this.restaurantDataService.cutlery, Validators.required),
      remark: new FormControl(this.restaurantDataService.remark),
    })
  }


  confirm() {
    const formData = this.orderForm.value; // 取得表單資料

    // 防止 date 或 time 格式錯誤
    let formattedDate = '';
    let formattedTime = '';

    if (formData.date) {
      const dateObj = new Date(formData.date); // 確保是 Date 物件
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      } else {
        console.error('日期格式錯誤:', formData.date);
      }
    }

    if (formData.time) {
      const timeObj = new Date(formData.time); // 確保是 Date 物件
      if (!isNaN(timeObj.getTime())) {
        formattedTime = timeObj.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else {
        console.error('時間格式錯誤:', formData.time);
      }
    }

    // 新增資料時套用格式化的日期與時間
    const newData = {
      ...formData,
      date: formattedDate,
      time: formattedTime,
    };

    this.restaurantDataService.addData(newData); // 利用服務新增資料
    this.dataList = this.restaurantDataService.getData(); // 更新本地列表
    this.dialogRef.close(newData); // 關閉對話框並傳遞資料


    setTimeout(() => { window.location.reload(); }, 100);


  }


  // 關閉按鈕：不傳遞資料直接關閉對話框
  close() {
    this.dialogRef.close(null);
  }



  animalControlName = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    { name: '原味', sound: '簡單就是好吃!' },
    { name: '牛奶', sound: '香醇可口!' },
    { name: '辣味', sound: '辣得過癮!' },
    { name: '泡菜', sound: '酸辣爽口!' },
    { name: '咖哩', sound: '濃郁香辣!' },
  ];

  noodolControl = new FormControl<noodol | null>(null, Validators.required);
  selectFormControln = new FormControl('', Validators.required);
  noodols: noodol[] = [
    { name2: '鍋燒意麵', sound2: '經典不敗!' },
    { name2: '烏龍麵', sound2: 'Q彈滑順!' },
    { name2: '雞絲麵', sound2: '絲滑入口!' },

  ];






}
