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

    valid_units = ['gal','l','mi','km','lbs','kg'],  // lowercase

    invalid_error = ["number", "unit", "number and unit"],

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

    let formatMatchPosition = cleaned.search(new RegExp(checkFormatPattern, 'i'),
        unitPosition = cleaned.search(new RegExp(checkUnitPattern, 'i'));

    if (formatMatchPosition) === -1){
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
    if (!valid_units.include(result.unit.toLowerCase())) throw new Error(invalid_error[1]);

    if (type == 'number') return result.number;
    if (type == 'unit') return result.unit;
  }

  this.getNum = function(input) {
    var result;
    return splitInputPart(input, 'number');
  };

  this.getUnit = function(input) {
    var result;
    return splitInputPart(input, 'unit');
  };

  this.getReturnUnit = function(initUnit) {
    var result;

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    return result;
  };

}

module.exports = ConvertHandler;
