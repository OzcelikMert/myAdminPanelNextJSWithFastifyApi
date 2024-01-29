import React, {Component} from "react";

function setDataWithKeys(data: any, keys: string[], value: any, isArrayPush: boolean = false) {
    let key = keys[0];
    if (keys.length === 1){
        if(isArrayPush){
            if(Array.isArray(data[key])){
                data[key].push(value)
            }else {
                data[key] = [value];
            }
        }else {
            data[key] = value;
        }
    }else{
        if(typeof data[key] === "undefined"){
            data[key] = {};
        }

        data[key] = setDataWithKeys(data[key], keys.slice(1), value, isArrayPush);
    }

    return data;
}

class HandleForm {
    static onChangeInput(event: React.ChangeEvent<any>, component: Component) {
        component.setState((state: any) => {
            let value: any = null;
            if(event.target.type === "checkbox") {
                value = event.target.checked ? 1 : 0;
            }else{
                value = event.target.value;
            }
            state = setDataWithKeys(state, event.target.name.split("."), value);
            return state;
        })
    }

    static onChangeSelect(name: any, value: any, component: Component) {
        let keys = name.split(".");
        component.setState((state: any) => {
            if(Array.isArray(value)){
                state = setDataWithKeys(state, keys, []);
                value.forEach(item => {
                    let data = (typeof item.value !== "undefined") ? item.value : item;
                    state = setDataWithKeys(state, keys, data, true);
                })
            }else {
                state = setDataWithKeys(state, keys, value);
            }
            return state;
        });
    }
}

export default HandleForm;