$(function(){
  
  function isOp(x) {
    var arrOp = ['+', '-', '*', '/'];
    return arrOp.includes(x);
  }
  function isNum(x) {
    var arrNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return arrNum.includes(x);
  }
  
  var str = '';
  var show = '';
  var number = false;
  var firstOp = true;
  var isDes = false;
  
  $('button').click(function() {
    
  // CLEAR button is pressed
    if ($(this).hasClass('clear')) {
      str = '';
      show = '0';
      firstOp = true;
      isDes = false;
      number = false;
    } 
  // EQUELS button is pressed 
    else if ($(this).hasClass('eq')) {
      if (str.length === 0) {
       show = '0';
      }
      else {
        isDes = false;
        number = false;
        firstOp = true;
        show = Math.round(eval(str) * 10000 + Number.EPSILON ) / 10000;
        str = show;
      }
    } 
  // digit limit
    else if (show.length > 8) {
      show = 'ERROR';
      str = '';
    } 
  // POINT use regulations
    else if ($(this).hasClass('des') && isDes === false) {
      if (isNum(str[str.length - 1]) || str[str.length - 1] === '0') {
        isDes = true;
        str += this.value;
        show += this.value;
        number = true;
      }
      else {
        isDes = true;
        str += '0.';
        show = '0.';
        number = true;
      }
    //  $('#number').text(show);
    } 
  // Numbers ewcept zero
    else if(isNum(this.value)) {
      // якщо перед цифрою є інші цифри
      if(isNum(str[str.length - 1]) || str[str.length - 1] === '.' || str[str.length - 1] === '0') { 
        str += this.value;
        show += this.value;  
      } 
     // якщо нема
      else {
        str += this.value;
        show = this.value; 
      } 
      number = true;
    }   
  // ZERO button is pressed
    else if (this.value === '0') {
      if (isOp(str[str.length - 1])) {
        str += this.value;
        show = this.value;
      }
      else if (show[show.length - 1] === '0' && number === false && isDes === false) {
        str += '.0';
        show += '.0';
        number = true;
        isDes = true;
      }
      else {
        str += this.value;
        show += this.value;  
      }
    }   
  // OPERATOR buttons 
  // operator for the first time and after a number
    else if (isOp(this.value) && firstOp === true) {
      str += this.value;
      firstOp = false; 
      isDes = false;
      number = false;
    } 
    // operator for the first time but with no numbers preceding
    else if (isOp(this.value) && firstOp === true && str.length === 0) {
      firstOp = false; 
      isDes = false;
      number = false;
      str = "0";
      show = '';
      str += this.value;
    } 
    // to avoid repetitions of operators
    else if (isOp(this.value) && firstOp === false && isOp(str[str.length - 1]) === false) {
      isDes = false;
      number = false;
      show = Math.round(eval(str) * 10000 + Number.EPSILON ) / 10000
      str = show + this.value;
    } 
   // SQUARE ROOT 
    else if ($(this).hasClass('sr') && isOp(str[str.length - 1]) === false) {
      var reg = /[+*\/-]/g;
      if (reg.test(str)) {
        for (var i = str.length - 1; i >= 0; i--) {
          if (isOp(str[i])) {
            var end = str.slice(i + 1);
            var start = str.slice(0, i + 1);
            str = start + Math.sqrt(end);
            isDes = false;
            number = false;
            show = Math.round(Math.sqrt(end) * 10000 + Number.EPSILON ) / 10000;
            i = 0;
          } 
        } 
      }
      else { 
        isDes = false;
        number = false;
        show = Math.round(Math.sqrt(str) * 10000 + Number.EPSILON ) / 10000;
        str = show;
      }
    }  
    $('#number').text(show);
  });
  
})

