import { Component, inject, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Clipboard } from '@capacitor/clipboard';
import { NgOptimizedImage } from '@angular/common';
import { lastValueFrom } from 'rxjs';

interface HttpResponse {
  result?: {
    data: CaiPiaoData;
  };
}

interface CaiPiaoData {
  redResults?: Array<string>;
  blueResults?: Array<string>;
  allResults?: string;
  openTime?: string;
  nextOpenTime?: string;
  issueNo?: string;
  nextIssueNo?: string;
}

@Component({
  selector: 'app-lbxx',
  templateUrl: 'lbxx.page.html',
  styleUrls: ['lbxx.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, NgOptimizedImage],
})
export class LbxxPage implements OnInit {
  public daLeTou: string = '';
  public daLeTouLastPoolDraw?: CaiPiaoData;
  public shuangSeqiu: string = '';
  public shuangSeqiuLastPoolDraw?: CaiPiaoData;

  public http: HttpClient = inject(HttpClient);

  public constructor() {}

  public imgSrc: string = 'https://api-stu-card.alal.me/api/Minio/random/image?buckName=lbxx';

  public updateImgUrl(): void {
    fetch(
      'https://api-stu-card.alal.me/api/Minio/random/image?buckName=lbxx'
    ).then((res) => {
      res.blob().then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          this.imgSrc = reader.result as string;
        };
      });
    });
  }

  public ngOnInit(): void {
    // this.updateImgUrl();
  }
}
