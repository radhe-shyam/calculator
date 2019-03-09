import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculater';
  displayPanel = '';
  clearDisplayPanel = true;
  setDisplayPanel = (result) => {
    this.displayPanel = (result || '').toString();
  }
  isOperator = (sym) => {
    return (['+', '-', '/', '*'].indexOf(sym) > -1);
  }
  removeLastChar = (src) => {
    return src.substr(0, src.length - 1);
  }
  isValidDecimal = (src) => {
    let allowDecimal = true;
    for (let i = src.length - 2; i > 0; i--) {
      if (src[i] == '.') {
        allowDecimal = false;
      }
      if (this.isOperator(src[i])) {
        break;
      }
    }
    return allowDecimal;
  }

  buttonPress = (src) => {
    let lastChar = this.displayPanel[this.displayPanel.length - 1] || '';
    let stringToEval = this.displayPanel;
    if (src == '=') {
      if (this.isOperator(lastChar)) {
        stringToEval = this.removeLastChar(this.displayPanel);
      }
      this.clearDisplayPanel = true;
      return this.setDisplayPanel(eval(stringToEval));
    }
    if (this.clearDisplayPanel) {
      this.setDisplayPanel('');
      this.clearDisplayPanel = false;
    }
    lastChar = this.displayPanel[this.displayPanel.length - 1] || '';
    stringToEval = this.displayPanel;

    if (src == '.') {
      if (this.isOperator(lastChar) || lastChar == '') {
        src = "0."
      } else if (lastChar == '.' || !this.isValidDecimal(stringToEval)) {
        src = '';
      }
    } else if (this.isOperator(src)) {
      if (this.isOperator(lastChar)) {
        stringToEval = this.removeLastChar(stringToEval);
      } else if (lastChar == '.') {
        src = '0' + src;
      } else if (lastChar == '' && (src == '*' || src == '/')) {
        src = '';
      }
    }
    this.setDisplayPanel(stringToEval += src);
  }
}
