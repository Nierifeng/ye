import { NgOptimizedImage } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';

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

  public async saveImage(): Promise<void> {
    this.saveImageToGallery(this.imgSrc);
  }

  private async saveImageToGallery(imageUrl: string) {
    try {
      // 获取图片数据
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      debugger
      // 将图片保存到文件系统
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: blob as any,
        directory: Directory.Library,
      });

      // 将保存的文件移动到相册
      await Filesystem.copy({
        from: savedFile.uri,
        to: fileName,
        directory: Directory.Cache,
        toDirectory: Directory.External,
      });
      console.log('Image saved to gallery');
    } catch (error) {
      console.error('Error saving image to gallery', error);
    }
  }

  // 保存到相册
  public async saveToAlbum(): Promise<void> {}

  public ngOnInit(): void {
    // this.updateImgUrl();
  }
}
