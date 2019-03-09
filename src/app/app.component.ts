import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculater';
  displayPanel = '';
  setDisplayPanel = (result) => {
    this.displayPanel = result.toString();
  }
  operand1:number;
  operand2:number;
  operation = '';

  buttonPress = (src) => {
    if (typeof (src) == 'number' || src == '.') {
      if (this.displayPanel && this.operation == '') {
        this.displayPanel += src;
      } else {
        this.setDisplayPanel(src);
      }
    } else if (['+', '-', '/', '*'].indexOf(src) > -1) {
      this.operand1 = Number(this.displayPanel);
      this.operation = src;
    } else {
      this.operand2 = Number(src);
      switch (this.operation) {
        case '+':
          this.setDisplayPanel(this.operand1 + this.operand2);
          break;
        case '-':
          this.setDisplayPanel(this.operand1 - this.operand2);
          break;
        case '/':
          this.setDisplayPanel(this.operand1 / this.operand2);
          break;
        case '*':
          this.setDisplayPanel(this.operand1 * this.operand2);
          break;
        this.operation = '';
      }
    }
  }
}
