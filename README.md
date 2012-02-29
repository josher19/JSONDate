# JSONDate

## Why? 

Older versions of browsers, including Android Webkit, do not support JSON formatted date strings.

If you do

    var d = new Date();
    var e = new Date(JSON.parse(JSON.stringify(d)));

you will get an `Invalid Date` on some browsers.

### Example

    var now = new Date();
    var asJson = JSON.parse(JSON.stringify(now));  // "2012-02-28T05:29:16.431Z"
    var json_date = now.toJSON(); // ditto
    if (self.console) console.log(json_date === asJson); // true
    var today = new Date( json_date );  // 'Invalid Date' for some older browsers, including Webkit.
    var created = Date.create( json_date ); // Ditto

## Proposed solution:

    Date.fromJSON(dateString);  // convert from JSON format (ISO8601_DateString) to a Javascript Date
    Date.isInvalid(date); // return true if date is an 'Invalid Date'

and the unit tests would basically be:

    Date.fromJSON( d.toJSON() ) == d // true for all valid Dates d
    Date.fromJSON( dstr ).toJSON() == dstr // true for all valid JSON datestrings.

