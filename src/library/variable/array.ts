declare global {
    interface Array<T> {
        indexOfKey(key: string, value: any): number
        findSingle(key: string, value: any): T | undefined
        findMulti(key: string, value: any | any[], isLike?: boolean): this
        orderBy(key: string | "", sort_type: `asc` | `desc`): this
        serializeObject(): object,
        remove(index: number, deleteCount?: number): void;
    }
}

function convertQueryData(data: any): string {
    return JSON.stringify({
        d: typeof data === "number" ?
            data.toString()
            : data
    });
}

Array.prototype.indexOfKey = function (key, value) {
    let findIndex = -1;
    if(typeof value !== "undefined"){
        findIndex = this.map(data => {
            let _data: any = data;
            if(typeof key === "string"){
                if(key.length > 0){
                    for(const name of key.split(".")) {
                        if(typeof _data !== "undefined"){
                            _data = _data[name];
                        }
                    }
                }
            }
            return convertQueryData(_data);
        }).indexOf(convertQueryData(value))
    }
    return findIndex;
}
Array.prototype.findSingle = function (key, value) {
    return this.find(function (data) {
        let query: boolean = false;

        if(typeof value !== "undefined"){
            let _data = data;
            if(typeof key === "string"){
                if(key.length > 0){
                    for(const name of key.split(".")) {
                        if(typeof _data !== "undefined"){
                            _data = _data[name];
                        }
                    }
                }
            }
            query = convertQueryData(_data) == convertQueryData(value);
        }

        return query;
    });
}
Array.prototype.findMulti = function (key, value, isLike = true) {
    let founds = Array();
    this.find(function (data) {
        let query: boolean = false;
        if(typeof value !== "undefined"){
            let _data = data;
            if(typeof key === "string"){
                if(key.length > 0){
                    for(const name of key.split(".")) {
                        if(typeof _data !== "undefined"){
                            _data = _data[name];
                        }
                    }
                }
            }
            if(Array.isArray(value)){
                query = value.map(v => convertQueryData(v)).includes(convertQueryData(_data));
            }else {
                query = convertQueryData(_data) == convertQueryData(value);
            }
        }
        if (query === isLike) founds.push(Object.assign(data));
    });
    return founds;
}
Array.prototype.orderBy = function (key, sort_type) {
    return this.sort(function (a, b) {
        if (key !== "" && (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))) {
            // property doesn't exist on either object
            return 0;
        }

        let keyA = (key != "") ? a[key] : a;
        let keyB = (key != "") ? b[key] : b;

        const varA = (typeof keyA === 'string')
            ? keyA.toUpperCase() : keyA;
        const varB = (typeof keyB === 'string')
            ? keyB.toUpperCase() : keyB;

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (sort_type === "desc") ? (comparison * -1) : comparison
        );
    });
}
Array.prototype.serializeObject = function () {
    let result: any = {};
    this.forEach((item: {name: string, value: any}) => {
        result[item.name] = item.value;
    })
    return result;
}
Array.prototype.remove = function (index, deleteCount = 1) {
    this.splice(index, deleteCount)
}

export default {}