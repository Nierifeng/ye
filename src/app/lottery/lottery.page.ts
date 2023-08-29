import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  selector: 'app-lottery',
  templateUrl: 'lottery.page.html',
  styleUrls: ['lottery.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule],
})
export class LotteryPage implements OnInit {
  public daLeTou: string = '';
  public daLeTouLastPoolDraw?: CaiPiaoData;
  public shuangSeqiu: string = '';
  public shuangSeqiuLastPoolDraw?: CaiPiaoData;
  public constructor(private httpServer: HttpClient) {}

  private httpParams = {
    format: 'json',
    __caller__: 'wap',
    __version__: '1.0.0',
    __verno__: 1,
    cat1: 'gameOpenInfo',
    dpc: 1,
  };

  public ngOnInit(): void {
    this.generateNumber();
    this.showLastInfo('daLeTou');
    this.showLastInfo('shuangSeqiu');
  }

  public generateNumber() {
    this.daLeTou = this.generateDaLeTouRandomArray();
    this.shuangSeqiu = this.generateSSQRandomNumbers();
  }

  public showLastInfo(type: 'daLeTou' | 'shuangSeqiu') {
    this.httpServer
      .get<HttpResponse>(
        'https://mix.lottery.sina.com.cn/gateway/index/entry/',
        {
          params: {
            ...this.httpParams,
            lottoType: type === 'daLeTou' ? 201 : 101,
          },
        }
      )
      .subscribe((res) => {
        type === 'daLeTou'
          ? (this.daLeTouLastPoolDraw = {
              ...res.result?.data,
              allResults: [
                ...(res.result?.data.redResults ?? []),
                ...(res.result?.data.blueResults ?? []),
              ].join(' '),
            })
          : (this.shuangSeqiuLastPoolDraw = {
              ...res.result?.data,
              allResults: [
                ...(res.result?.data.redResults ?? []),
                ...(res.result?.data.blueResults ?? []),
              ].join(' '),
            });
      });
  }

  private generateDaLeTouRandomArray(): string {
    const blueBalls = Array.from({ length: 35 }, (_, index) =>
      (index + 1).toString().padStart(2, '0')
    );
    const yellowBalls = Array.from({ length: 12 }, (_, index) =>
      (index + 1).toString().padStart(2, '0')
    );

    const selectedBlueBalls = [];
    while (selectedBlueBalls.length < 5) {
      const randomIndex = Math.floor(Math.random() * blueBalls.length);
      const selectedBall = blueBalls.splice(randomIndex, 1)[0];
      selectedBlueBalls.push(selectedBall);
    }

    const selectedYellowBalls = [];
    while (selectedYellowBalls.length < 2) {
      const randomIndex = Math.floor(Math.random() * yellowBalls.length);
      const selectedBall = yellowBalls.splice(randomIndex, 1)[0];
      selectedYellowBalls.push(selectedBall);
    }

    return [...selectedBlueBalls, ...selectedYellowBalls].join(' ');
  }

  private generateSSQRandomNumbers(): string {
    const redBalls = Array.from({ length: 33 }, (_, index) =>
      (index + 1).toString().padStart(2, '0')
    );
    const blueBalls = Array.from({ length: 16 }, (_, index) =>
      (index + 1).toString().padStart(2, '0')
    );

    const selectedRedBalls = [];
    while (selectedRedBalls.length < 6) {
      const randomIndex = Math.floor(Math.random() * redBalls.length);
      const selectedBall = redBalls.splice(randomIndex, 1)[0];
      selectedRedBalls.push(selectedBall);
    }

    const selectedBlueBall =
      blueBalls[Math.floor(Math.random() * blueBalls.length)];
    return [...selectedRedBalls, selectedBlueBall].join(' ');
  }
}
