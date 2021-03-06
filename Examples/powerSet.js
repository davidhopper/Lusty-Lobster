//powerset for letters
var powerSet = function(string) {
  if(string === undefined) {
    string = '';
  }

  var letters = {};
  for(var i = 0; i < string.length; i++) {
    letters[string[i]] = true;
  }

  string = Object.keys(letters).join('');

  var solutions = [];
  var recurse = function(index, subset) {
    if(index >= string.length) {
      solutions.push(subset);
      return;
    }

    recurse(index + 1, subset);
    recurse(index + 1, subset + string[index]);
  };

  recurse(0, '');

  return solutions.sort();
};

//powerset for complete words
var powerSetWord = function(string) {
  if(string === undefined) {
    string = '';
  }

  string = string.split(' ');

  var letters = {};
  for(var i = 0; i < string.length; i++) {
    letters[string[i]] = true;
  }

  var solutions = [];
  var recurse = function(index, subset) {
    if(index >= string.length) {
      solutions.push(subset);
      return;
    }

    recurse(index + 1, subset);
    recurse(index + 1, subset + ' ' + string[index] + ' '); //can take ' ' away in the middle if concatenation is required
  };

  recurse(0, '');

  return solutions.sort();
};

var str = ["I cry into wool, Crimson stains remain, alone,  Like shit on the moon.", "a springtime ribbit awash in dump truck headlights-- green gravel pancakes", "There once was a man called Bob, who... oh shit, that's wrong --that's a limerick!", "oh yellow flower! how you make my allergies bloom like spring morning."];

console.log(powerSetWord(str[0]));
