import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/lib/storage';

@Component( {
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
} )
export class Tab2Page implements OnInit {

  public numericalValue: number = 1000;

  private clickKey: string = ( new Date ).toLocaleDateString();

  private storageService = inject( StorageService );

  public clickAmount: number = 0;

  ngOnInit(): void {
    this.getClickAmount();
  }

  addFloatingText() {
    this.getClickAmount();
    let doc = document.querySelector( '#content' )!;
    let video = document.getElementById( 'video' )!;
    let newElement = document.createElement( 'div' );
    newElement.className = 'fade-text';
    newElement.innerHTML = `+功德${this.clickAmount}`;
    doc.insertBefore( newElement, doc.firstChild );
    if ( video instanceof HTMLMediaElement ) {
      video.currentTime = 0;
      video.play();
    }
    setTimeout( () => {
      doc.removeChild( newElement );
    }, 1500 );
  }

  private getClickAmount(): void {
    if ( this.clickAmount == 0 ) {
      this.clickAmount = this.storageService.getData<number>( this.clickKey ) || 0;
    }
    this.clickAmount += 1;
    this.storageService.addData( this.clickKey, this.clickAmount );
  }
}
