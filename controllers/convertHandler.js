/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {


  /* shared function for format parsing
   * takes in parameters:
   *    input String
   *    type ("number" || "unit")
   *
   * returns result according to input `type`:
   *     "number": <float> or <INVALID_ERROR>
   *     "unit": <string> or <INVALID_ERROR>,
   *
   * INVALID_ERROR Enum [
   *   "invalid number",
   *   "invalid unit",
   *   "invalid number and unit"
   * ]
   *
   *
   **/
  const r = String.raw,  // for literal string-templating

  unit_conversion_map = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
  },

  valid_units = Object.keys(unit_conversion_map),  // lowercase

  unit_language_map = {  // using American Spelling, plural
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
  },

  invalid_error = ["invalid number", "invalid unit", "invalid number and unit"];

  function splitInputPart(input, type) {
    if (!["number", "unit"].includes(type)) {
        throw new Error("invalid or missing `type` input!");
    }
    // sanitization
    const cleaned = input.trim(),

    result = {
        number: null,
        unit: null,
    },

    // grab the index of first char

    // lookbehind accepted but only supported in
    // chrome/android/opera/node (webkit V8 engine)
    //const RegexCheck = /(?<=^(\d+\.)?\d+)[a-z]+$/i;

    // workaround without lookbehind
    // take in optional fractions and decimals with a measurement unit

    checkUnitPattern = "[a-z]+$", // unit at end of string

    /*
    checkNumberPattern = "^"  // number part at start of string
                       + "(?:"  // optional non-capturing number-part group
                       +   "(?:"  // optional non-capturing fraction numerator including `/`
                       +     "("  // group #1 of numerator number
                       +       r`(?:\d+\.)?`  // optional prefix decimal group including `.`
                       +       r`\d+`  // integer or decimal place
                       +     ")"  // end capturing group #1 of numerator number
                       +     r`\/`  //  fraction separator and start of fraction denominator group
                       +   ")?"  // end non-capturing optional fraction numerator group
                       +   "("  // group #2 denominator group or number group
                       +   r`(?:\d+\.)?` // optional non-capturing prefix decimal group
                       +   r`\d+`  // integer or decimal place
                       +   ")"  // end group #2 denominator group or number group
                       + ")?",  // end optional non-capturing number-part group
    */
    checkNumberPattern = r`^(?:(?:((?:\d+\.)?\d+)\/)?((?:\d+\.)?\d+))?`,

    checkFormatPattern = checkNumberPattern + checkUnitPattern;

    let formatMatchPosition = cleaned.search(new RegExp(checkFormatPattern, 'i')),
        unitPosition = cleaned.search(new RegExp(checkUnitPattern, 'i'));

    result.unit = cleaned.slice(unitPosition);

    if (formatMatchPosition === -1){
        // no match at all
        if (unitPosition > 0 && valid_units.includes(result.unit.toLowerCase())) {
            throw new Error(invalid_error[0]); // can detect unit, then number is the problem
        }
        // can't detect unit, so both number and unit is the problem
        throw new Error(invalid_error[2]);
    }

    if (unitPosition === 0) {  // no numbr given, default to 1
        result.number = 1;
    } else if (unitPosition > 0 ){
        let numPart = cleaned.slice(0, unitPosition),
        parseGroups = numPart.match(new RegExp(checkNumberPattern, 'i'))
        if (parseGroups[1] !== undefined) {
            result.number = parseFloat(parseGroups[1]) / parseFloat(parseGroups[2]);
        } else {
            result.number = parseFloat(numPart);
        }
    } else {
        throw new Error(invalid_error[1]);
    }

    // last layer of validation
    //if (!valid_units.include(result.unit.toLowerCase())) return invalid_error[1];
    if (!valid_units.includes(result.unit.toLowerCase())) throw new Error(invalid_error[1]);

    if (type == 'number') return result.number;
    if (type == 'unit') return result.unit;
  }

  this.getNum = function(input) {
    return splitInputPart(input, 'number');
  };

  this.getUnit = function(input) {
    return splitInputPart(input, 'unit');
  };

  this.getReturnUnit = function(initUnit) {
    return unit_conversion_map[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    return unit_language_map[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit.toLowerCase()){
        case 'gal':
            return initNum * galToL;
            break;
        case 'l':
            return initNum / galToL;
            break;
        case 'lbs':
            return initNum * lbsToKg;
            break;
        case 'kg':
            return initNum / lbsToKg;
            break;
        case 'mi':
            return initNum * miToKm;
            break;
        case 'km':
            return initNum / miToKm;
            break;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum.toFixed(5)} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
