import {
  Component, ViewChild, OnInit, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-game-step',
  templateUrl: './game-step.component.html',
  styleUrls: ['./game-step.component.scss']
})
export class GameStepComponent implements OnInit {

  public choices = [
    {
      icon: 'filter',
      name: 'Exit'
    }
  ];

  private WIDTH = 400;
  private HEIGHT = 300;

  @ViewChild('layer1')
  private layer1: ElementRef;

  @ViewChild('layer2')
  private layer2: ElementRef;

  @ViewChild('layer3')
  private layer3: ElementRef;

  private ctx1: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;
  private ctx3: CanvasRenderingContext2D;

  private x = this.WIDTH;
  private background = new Image();
  private kid = new Image();
  private foreground = new Image();

  ngOnInit() {

    this.background.src ="https://i.ytimg.com/vi/PWtNdTbf-XQ/maxresdefault.jpg";
    this.foreground.src = "https://html5.litten.com/layers/city.png";
    this.kid.src = "https://content.mycutegraphics.com/graphics/kids/boy-carrying-football.png";
    this.ctx1 = (<HTMLCanvasElement>this.layer1.nativeElement).getContext('2d');
    this.ctx2 = (<HTMLCanvasElement>this.layer2.nativeElement).getContext('2d');
    this.ctx3 = (<HTMLCanvasElement>this.layer3.nativeElement).getContext('2d');
    this.drawAll, 20;
  }

  public makeChoice() {

  }

  private drawAll() {
    this.drawBackground();
    this.drawKid();
    this.drawForeground();
  }

  private drawBackground() {
    this.ctx2.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx2.drawImage(this.background, 0, 0);
  }


  private drawForeground() {
    this.ctx3.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx3.drawImage(this.foreground, 0, 0);
  }

  private drawKid() {
    if(this.x>3){
      this.ctx1.clearRect(0, 0, this.WIDTH, this.HEIGHT);  // clear canvas
      this.ctx1.drawImage(this.kid, this.x, 0);                       // draw image at current position
      // x -= 4;
      console.log(this.x);
      if (this.x > 0) this.x-=4;
    }
  }

}
