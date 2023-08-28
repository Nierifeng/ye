import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lottery',
  templateUrl: 'lottery.page.html',
  styleUrls: ['lottery.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LotteryPage implements OnInit {
  public daLeTou: string = '';
  public shuangSeqiu: string = '';
  constructor() {}
  public ngOnInit(): void {
    this.generateNumber();
  }

  public generateNumber() {
    console.log(1);
    this.daLeTou = this.generateDaLeTouRandomArray();
    this.shuangSeqiu = this.generateSSQRandomNumbers();
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

    return [...selectedBlueBalls, ...selectedYellowBalls].join(',');
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
    return [...selectedRedBalls, selectedBlueBall].join(',');
  }
}
