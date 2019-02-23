import {
  Component,
  // ViewChild,
  OnInit,
  // ElementRef
} from '@angular/core';
import { Character } from '../../models';

@Component({
  selector: 'app-game-step-1',
  templateUrl: './game-step-1.component.html',
  styleUrls: ['./game-step-1.component.scss']
})
export class GameStepComponent implements OnInit {

  private character: Character = {
    name: 'Bobby',
    literate: false
  };

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

  public choices = [
    {
      id: 1,
      icon: 'arrow-circle-o-left',
      name: this.character.literate ? 'Exit' : this.caesarShift('Exit', this.SHIFT_NUM),
      description: 'Door 1'
    },
    {
      id: 2,
      icon: 'arrow-circle-o-right',
      name: this.character.literate ? 'De-atomizer' : this.caesarShift('De-atomizer', this.SHIFT_NUM),
      description: 'Door 2'
    }
  ];

  private WIDTH = 400;
  private HEIGHT = 300;

  // @ViewChild('layer1')
  // private layer1: ElementRef;

  // @ViewChild('layer2')
  // private layer2: ElementRef;

  // @ViewChild('layer3')
  // private layer3: ElementRef;

  private ctx1: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;
  private ctx3: CanvasRenderingContext2D;

  private x = this.WIDTH;
  private background = new Image();
  private kid = new Image();
  private foreground = new Image();

  ngOnInit() {

    // this.background.src ="https://i.ytimg.com/vi/PWtNdTbf-XQ/maxresdefault.jpg";
    // this.foreground.src = "https://html5.litten.com/layers/city.png";
    // this.kid.src = "https://content.mycutegraphics.com/graphics/kids/boy-carrying-football.png";
    // this.ctx1 = (<HTMLCanvasElement>this.layer1.nativeElement).getContext('2d');
    // this.ctx2 = (<HTMLCanvasElement>this.layer2.nativeElement).getContext('2d');
    // this.ctx3 = (<HTMLCanvasElement>this.layer3.nativeElement).getContext('2d');
    // this.drawAll, 20;
  }

  public makeChoice(id: number) {
    var choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
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


  private caesarShift(str: string, amount: number): string {

    // Wrap the amount
    if (amount < 0)
      return this.caesarShift(str, amount + 26);

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i ++) {

      // Get the character we'll be appending
      var c = str[i];

      // If it's a letter...
      if (c.match(/[a-z]/i)) {

        // Get its code
        var code = str.charCodeAt(i);

        // Uppercase letters
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

        // Lowercase letters
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

      }

      // Append
      output += c;

    }

    // All done!
    return output;

  };
}
