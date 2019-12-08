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
  const unit_conversion_map = {
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

    checkNumberPattern = "^"  // number part at start of string
                       + "("  // optional number-part group
                       +   "-?"  // optional negative number
                       +   "("  // optional fraction numerator
                       +     "(\d+\.)?"  // optional prefix decimal group
                       +     "\d+"  // integer or decimal place
                       +   "\/"  //  fraction separator and start of fraction denominator group
                       +   ")?"  // end optional fraction numerator group
                       +   "(\d+\.)?" // optional prefix decimal group
                       +   "\d+"  // integer or decimal place
                       + ")?",  // end optional number-part group

    checkFormatPattern = checkNumberPattern + checkUnitPattern;

    let formatMatchPosition = cleaned.search(new RegExp(checkFormatPattern, 'i')),
        unitPosition = cleaned.search(new RegExp(checkUnitPattern, 'i'));

    if (formatMatchPosition === -1){
        // no match at all
        if (unitPosition > 0) throw new Error(invalid_error[0]); // can detect unit, then number is the problem
        // can't detect unit, so both number and unit is the problem
        throw new Error(invalid_error[2]);
    }

    if (unitPosition === 0) {  // no numbr given, default to 1
        result.number = 1;
    } else if (unitPosition > 0 ){
        result.number = cleaned.slice(0, unitPosition);
    } else {
        throw new Error(invalid_error[1]);
    }
    result.unit = cleaned.slice(unitPosition);

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
    return unit_language_map[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit){
        case 'gal':
            return initNum / galToL;
            break;
        case 'l':
            return initNum * galToL;
            break;
        case 'lbs':
            return initNum / lbsToKg;
            break;
        case 'kg':
            return initNum * lbsToKg;
            break;
        case 'mi':
            return initNum / miToKm;
            break;
        case 'km':
            return initNum * miToKm;
            break;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
