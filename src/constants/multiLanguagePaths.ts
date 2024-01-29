import PagePaths from "constants/pagePaths";

const MultiLanguagePaths = [
    PagePaths.post().list(),
    PagePaths.post().edit(),
    PagePaths.post().term().edit(),
    PagePaths.post().term().list(),
    PagePaths.eCommerce().product().list(),
    PagePaths.eCommerce().product().edit(),
    PagePaths.eCommerce().product().term().edit(),
    PagePaths.eCommerce().product().term().list(),
    PagePaths.themeContent().post().list(),
    PagePaths.themeContent().post().edit(),
    PagePaths.themeContent().post().term().edit(),
    PagePaths.themeContent().post().term().list(),
    PagePaths.navigation().list(),
    PagePaths.navigation().edit(),
    PagePaths.component().edit(),
    PagePaths.settings().staticLanguages(),
    PagePaths.settings().seo()
]

export default MultiLanguagePaths;