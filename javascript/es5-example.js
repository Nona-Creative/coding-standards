 // Always declare strict at top of modules
'use strict';

/**
 * Docblocks
 *
 * This method/class description
 * Make it as verbose as you need to
 * Think of the next developer that will work on this
 *
 * @param  {String}  stringVariable  Description of the string
 * @param  {Int}     intVariable     Desctiption of the int
 *   ...
 * @param  {Bool}    booleanVariable Description of the bool
 *
 * @return {Object}  someObject      Description of the object
 * @return {Array}   someArray       Description of the array
 *   ...
 * @return {Void}    Nothing is returned from this method
 */

// Single line comments

/**
 * Multi line comments
 */

// All operators except for unary should be wrapped with whitespace
var stringVariable= 'something';
var someOtherValue = value1 || false;
var anotherValue = !someOtherValue;
var underfinedVariable;

// Always use the literal syntax
var someObject = {};
var someArray = [];

var populatedObject = {
  someKey: 'String',
  someValue: true,
  someBool: false
}

// Use dot notation when accessing properties
var wantedValue = someObject.someValue;

// Use subscript notation when accessing properties with a variable
var someValue = 'something';
var wantedValue = someObject[someValue];

// Break strings that go past 80 chars like this
var errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// If Else If
if (!value2 && value1 === 'something') {
  value1 = 'nothing';
} else if (value3 <= 5) {
  value3++;
  value4 = value3 * 2;
}

// For
for (var j = 0; j < 5; j++) {
  console.log(j);
}

// Case
switch (j) {
  case 0:
    somethingCool(j);
    break;
  case 1:
    somethingElse(j);
    break;
  default:
    defaultThing(j);
}

// Do and While
var k = 0;

while (k < 5) {
  k++;
}

do {
  k--;
} while (k > 0)

// Try catch
try {
  something();
} catch(e) {
  errorHandler(e);
}

// immediately-invoked function expression (IIFE)
(function() {
  'use strict';
})();
