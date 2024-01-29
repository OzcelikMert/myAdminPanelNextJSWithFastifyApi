declare type ForeachParamFunctionDocument = (key: string, value: any) => any;

class Statement{
    /**
     * @param _value
     * Checks your entered value Ex: if(_value === case_key)
     * @param _case
     * Usage: [ ["default", () => any] ]
     * @returns
     */
    static Switch(_value: any, _case: Array<Array<any>>) : any {
        let result = null,
            default_value: any = null;

        // @ts-ignore
        for (let [key, value] of Object.entries(_case)) {
            if (value.length !== 2 || typeof value[1] !== `function`) continue;
            key = value[0];
            if(key === "default" && result === null) {
                default_value = value[1];
            }else if(_value === key) {
                result = value[1]();
            }
        }

        return result !== null ? result : default_value();
    }

    /**
     *
     * @param data
     * @param _function
     * Usage: (key: any, value: any) => {}
     */
    static Foreach(data: any, _function: ForeachParamFunctionDocument) : any {
        let result = Array<any>();
        // @ts-ignore
        for (let [key, value] of Object.entries(data)) {
            try{
                let returnValue = _function(key, value);
                if(typeof returnValue === "undefined") continue;
                result.push(returnValue);
            }catch (ex){}
        }
        return result;
    }
}

export default Statement;


