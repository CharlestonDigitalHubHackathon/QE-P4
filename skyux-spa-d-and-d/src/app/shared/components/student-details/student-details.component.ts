import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {

  public gameStarted = false;

  @Input()
  public sid: string;

  public startGame() {
    console.log('Starting the game');
    this.gameStarted = true;
  }

}
