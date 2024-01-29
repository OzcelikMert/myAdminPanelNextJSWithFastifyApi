declare global {
    interface String {
        replaceAll(find: string, replace: string): string
        replaceArray(find: Array<string>, replace: Array<string>): string
        removeLastChar(remove_count?: number): string
        encode(): string
        decode(): string
        convertKey(): string
        stripTags(): string
        convertSEOUrl(): string
        toCapitalizeCase(): string
        isUrl(): boolean
    }
    interface StringConstructor {
        createId(): string
    }
}

String.createId = function () {
    let dt = new Date().getTime();
    let id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return id;
}

String.prototype.replaceArray = function (find, replace) {
    let replaceString = this;
    for (let i = 0; i < find.length; i++) {
        replaceString = replaceString.replaceAll(find[i], replace[i]);
    }
    return replaceString.toString();
}
String.prototype.removeLastChar = function (remove_count = 1) {
    return this.slice(0,remove_count * -1);
}
String.prototype.encode = function () {
    return encodeURIComponent(this.toString());
}
String.prototype.decode = function () {
    return decodeURIComponent(this.toString());
}
String.prototype.convertKey = function () {
    return unescape(encodeURIComponent(this.convertSEOUrl()));
}
String.prototype.stripTags = function () {
    return this.replace(/<\/?[^>]+>/gi, '');
}
String.prototype.convertSEOUrl = function () {
    let $this = this.toString();
    $this = $this.toString().toLowerCase().trim().stripTags();
    $this = $this.replace("'", '');
    let tr = Array('ş','Ş','ı','I','İ','ğ','Ğ','ü','Ü','ö','Ö','Ç','ç','(',')','/',':',',','!');
    let eng = Array('s','s','i','i','i','g','g','u','u','o','o','c','c','','','_','_','','');
    $this = $this.replaceArray(tr, eng);
    $this = $this.replace(/[^-\w\s]/g, ''); // Remove unneeded characters
    $this = $this.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing spaces
    $this = $this.replace(/[-\s]+/g, '-'); // Convert spaces to hyphens
    return $this;
}
String.prototype.toCapitalizeCase = function () {
    const arr = this.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}
String.prototype.isUrl = function () {
    let url;

    try {
        url = new URL(this.toString());
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default {}