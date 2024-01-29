import {PagePropCommonDocument} from "types/pageProps";

export default {
    change(route: PagePropCommonDocument["router"], path: string, as?: string) {
        return route.push(path, as ?? path, {shallow: true})
    }
}