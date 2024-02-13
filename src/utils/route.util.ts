import {IPagePropCommon} from "types/pageProps";

const change = (route: IPagePropCommon["router"], path: string, as?: string) => {
    return route.push(path, as ?? path, {shallow: true})
}

export const RouteUtil = {
    change: change
}