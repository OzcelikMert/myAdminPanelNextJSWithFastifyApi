import {PagePropCommonDocument} from "types/pageProps";

const change = (route: PagePropCommonDocument["router"], path: string, as?: string) => {
    return route.push(path, as ?? path, {shallow: true})
}

export default {
    change: change
}