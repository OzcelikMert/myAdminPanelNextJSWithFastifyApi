declare global {
    interface Date {
        addDays(n: any): void
        nextDay() : void
        addMonths(n: any): void
        addYears(n: any): void
        getStringWithMask(mask: string | DateMask, utc?: boolean) : string
        diffMinutes(date: Date): Number
        diffDays(date: Date): Number
    }
}

export enum DateMask {
    ALL = "yyyy-mm-dd HH:MM:ss",
    UNIFIED_ALL = "yyyymmddHHMMss",
    DATE = "yyyy-mm-dd"
}

Date.prototype.addDays = function (n) {
    this.setDate(this.getDate() + n);
}
Date.prototype.nextDay = function () {
    this.addDays(1);
};
Date.prototype.addMonths = function (n) {
    this.setMonth(this.getMonth() + n);
};
Date.prototype.addYears = function (n) {
    this.setFullYear(this.getFullYear() + n);
}
Date.prototype.getStringWithMask = function (mask, utc = false) {
    let date: any = this;
    let i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    let token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g;

    function pad(val: any, len: any = 0) : any {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    }

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
        mask = date;
        date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
        mask = mask.slice(4);
        utc = true;
    }

    const _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
            d: d,
            dd: pad(d),
            ddd: i18n.dayNames[D],
            dddd: i18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: i18n.monthNames[m],
            mmmm: i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? "a" : "p",
            tt: H < 12 ? "am" : "pm",
            T: H < 12 ? "A" : "P",
            TT: H < 12 ? "AM" : "PM",
            // @ts-ignore
            Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            // @ts-ignore
            S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

    return mask.replace(token, function ($0) {
        // @ts-ignore
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
};
Date.prototype.diffMinutes = function (date) {
    let diff =(date.getTime() - this.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
}
Date.prototype.diffDays = function (date) {
    let diff = (date.getTime() - this.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.ceil(diff);
}

export default {}