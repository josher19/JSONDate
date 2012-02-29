# JSONDate

## Why? 

Older versions of browsers, including Android Webkit, do not support JSON formatted date strings.

If you do

    var d = new Date();
    var e = new Date(JSON.parse(JSON.stringify(d)));

you will get an `Invalid Date` on some browsers.


