JSONDate = (function() {
	function isoDate(r, tz) {
		// log(arguments);
		return fixTimezone(new Date(r[0], r[1] - 1, r[2], r[3], r[4], r[5], r[6] || 0), tz);
	}

	function noop(it) {
		return it;
	}

	function asDate(strValue, tz) {
		return isoDate(strValue.split(/[-T:Z\."]/).filter(noop), tz);
	}

	// date.setHours(date.getUTCHours()); date.setUTCMinutes(date.getUTCMinutes());
	function fixTimezone(date, tz) {
		if (null == tz) {
			tz = date.getTimezoneOffset() / 60 || 0;
		}
		if (tz) {
			date.setHours(date.getHours() - tz);
		}
		return date;
	}
	function isBadDate(d) { 
		return String(d) === "Invalid Date"  || String(d.getFullYear()) === "NaN"; 
	}
	function fromJSON(dstr) {
		var d = Date.create ? Date.create(dstr) : new Date(dstr);
		if (isBadDate(d)) {
			d = asDate(dstr);
		}
		return d;
	}

	return { fromJSON: fromJSON, isInvalidDate:isBadDate, toDate:asDate }
})();

// todo: Unit Tests, decide about timezone support
/*
    JSONDate.fromJSON( d.toJSON() ) == d // true for all valid Dates d
    JSONDate.fromJSON( dstr ).toJSON() == dstr // true for all valid JSON datestrings.
*/
