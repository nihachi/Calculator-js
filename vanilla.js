function getId(ID) {
  return document.getElementById(ID);
}

function print(val) {
  getId('screen').innerHTML = val || globals.tempVal;
}

var globals = {
  tempVal: '0',
  oldTempVal: undefined,
  symbol: [],
  numbers: [],
  stopBackspace: false
};

function clicked() {
  if (globals.tempVal === '0' || globals.tempVal === '') {
    if (this.innerHTML === '0') {
      return;
    }
    globals.tempVal = '';
  }

  //IF NUMBER BUTTON IS CLICKED
  if (/number/.test(this.className)) {
    globals.tempVal += this.innerHTML;
    print();
  }
  //OPERATORS
  else {
    switch(this.id) {
      case 'bPlus':
        calculate('+');
        break;
      case 'bMinus':
        calculate('-');
        break;
      case 'bTimes':
        calculate('*');
        break;
      case 'bDivide':
        calculate('/');
        break;
      case 'bClear':
        globals.stopBackspace = false;
        globals.tempVal = '0';
        globals.oldTempVal = '0';
        globals.symbol.length = 0;
        globals.numbers.length = 0;
        print();
        break;
      case 'bEquals':
        calculate('=');
        break;
      case 'bDot':
        if (globals.tempVal.toString().indexOf('.') === -1) {
          globals.tempVal += '.';
        }
        break;
      case 'bBackspace':
        if (!globals.stopBackspace) {
          var temp = globals.tempVal.split('');
          if (temp.length === 1) {
            globals.tempVal = '0';
          }
          else {
            temp.pop();
            globals.tempVal = temp.reduce(function(a,b) {
              return a.concat(b);
            });
          }
          print();
        }
        break;
    }
  }
}

function calculate(sym) {

  if (sym === '=' || globals.symbol.length > 0) {

    if (globals.tempVal !== '') {
      globals.numbers.push(globals.tempVal);
    }

    switch(globals.symbol[globals.symbol.length - 1]) {
      case '+':
        globals.oldTempVal = +globals.oldTempVal + (+globals.numbers[globals.numbers.length - 1]);
        break;
      case '-':
        globals.oldTempVal = +globals.oldTempVal - (+globals.numbers[globals.numbers.length - 1]);
        break;
      case '/':
        globals.oldTempVal = +globals.oldTempVal / (+globals.numbers[globals.numbers.length - 1]);
        break;
      case '*':
        globals.oldTempVal = +globals.oldTempVal * (+globals.numbers[globals.numbers.length - 1]);
        break;
      default:
        console.log(error);
        break;
    }
    if (sym !== '=') {
      globals.symbol.push(sym);
    }
    else {
      globals.stopBackspace = true;
    }

    print(globals.oldTempVal);
    globals.tempVal = '0';
  }
  else {
    globals.oldTempVal = globals.tempVal;
    globals.tempVal = '';
    globals.symbol.push(sym);
    print(sym);
  }

}

window.onload = function() {

  //CLICKS ON BUTTONS
  var buttons = document.getElementsByClassName('btn');

  for (var btn = 0; btn < buttons.length; btn++) {
    buttons[btn].addEventListener('click', clicked);
  }

  print();

};