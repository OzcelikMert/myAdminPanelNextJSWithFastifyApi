import {PostTypeId} from "./postTypes";
import {PostTermTypeId} from "./postTermTypes";
import pagePathLib from "lib/pagePath.lib";

const PagePaths = {
    login() {
        return pagePathLib.setPath("login");
    },
    lock() {
        return pagePathLib.setPath("lock");
    },
    dashboard() {
        return pagePathLib.setPath("dashboard");
    },
    gallery() {
        let pathGallery = pagePathLib.setPath("gallery");

        return {
            self() {
                return pagePathLib.setPath(pathGallery);
            },
            upload() {
                return pagePathLib.setPath(pathGallery, "upload");
            },
            list() {
                return pagePathLib.setPath(pathGallery, "list");
            }
        }
    },
    component() {
        let pathComponent = pagePathLib.setPath("component");

        return {
            self() {
                return pagePathLib.setPath(pathComponent);
            },
            add() {
                return pagePathLib.setPath(pathComponent, "add");
            },
            edit(_id: string | number | undefined = ":_id") {
                return pagePathLib.setPath(pathComponent, "edit", _id);
            },
            list() {
                return pagePathLib.setPath(pathComponent, "list");
            }
        }
    },
    navigation() {
        let pathNavigation = pagePathLib.setPath("navigation");

        return {
            self() {
                return pagePathLib.setPath(pathNavigation);
            },
            add() {
                return pagePathLib.setPath(pathNavigation, "add");
            },
            edit(_id: string | number | undefined = ":_id") {
                return pagePathLib.setPath(pathNavigation, "edit", _id);
            },
            list() {
                return pagePathLib.setPath(pathNavigation, "list");
            }
        }
    },
    post(typeId: string | PostTypeId = ":postTypeId", firstPath: string | undefined = undefined) {
        let pathPost = pagePathLib.setPath(firstPath, "post", typeId);

        return {
            self() {
                return pagePathLib.setPath(pathPost);
            },
            add() {
                return pagePathLib.setPath(pathPost, "add");
            },
            edit(_id: string | number | undefined = ":_id") {
                return pagePathLib.setPath(pathPost, "edit", _id);
            },
            list() {
                return pagePathLib.setPath(pathPost, "list");
            },
            term(typeId: string | PostTermTypeId | undefined = ":termTypeId") {
                let pathTerm = pagePathLib.setPath(pathPost, "term", typeId);

                return {
                    self() {
                        return pagePathLib.setPath(pathTerm);
                    },
                    add() {
                        return pagePathLib.setPath(pathTerm, "add");
                    },
                    edit(_id: string | number | undefined = ":_id") {
                        return pagePathLib.setPath(pathTerm, "edit", _id);
                    },
                    list() {
                        return pagePathLib.setPath(pathTerm, "list");
                    },
                }
            }
        }
    },
    themeContent() {
        let pathThemeContent = pagePathLib.setPath("theme-content");

        return {
            self() {
                return pagePathLib.setPath(pathThemeContent);
            },
            post(typeId?: number) {
                return PagePaths.post(typeId, pathThemeContent);
            }
        }
    },
    eCommerce() {
        let pathEcommerce = pagePathLib.setPath("e-commerce");

        return {
            self() {
                return pagePathLib.setPath(pathEcommerce);
            },
            product() {
                return PagePaths.post(PostTypeId.Product, pagePathLib.setPath(pathEcommerce, "product"));
            },
            settings() {
                return pagePathLib.setPath(pathEcommerce, "settings");
            }
        }
    },
    settings() {
        let pathSettings = pagePathLib.setPath("settings");

        return {
            self() {
                return pagePathLib.setPath(pathSettings);
            },
            seo() {
                return pagePathLib.setPath(pathSettings, "seo");
            },
            general() {
                return pagePathLib.setPath(pathSettings, "general");
            },
            profile() {
                return pagePathLib.setPath(pathSettings, "profile");
            },
            changePassword() {
                return pagePathLib.setPath(pathSettings, "change-password");
            },
            staticLanguages() {
                return pagePathLib.setPath(pathSettings, "static-languages");
            },
            subscribers() {
                return pagePathLib.setPath(pathSettings, "subscribers");
            },
            contactForms() {
                return pagePathLib.setPath(pathSettings, "contact-forms");
            },
            socialMedia() {
                return pagePathLib.setPath(pathSettings, "social-media");
            },
            user() {
                let pathUser = pagePathLib.setPath(pathSettings, "user");

                return {
                    self() {
                        return pagePathLib.setPath(pathUser);
                    },
                    add() {
                        return pagePathLib.setPath(pathUser, "add");
                    },
                    edit(_id: string | number | undefined = ":_id") {
                        return pagePathLib.setPath(pathUser, "edit", _id);
                    },
                    list() {
                        return pagePathLib.setPath(pathUser, "list");
                    },
                }
            },
            language() {
                let pathLanguage = pagePathLib.setPath(pathSettings, "language");

                return {
                    self() {
                        return pagePathLib.setPath(pathLanguage);
                    },
                    add() {
                        return pagePathLib.setPath(pathLanguage, "add");
                    },
                    edit(_id: string | number | undefined = ":_id") {
                        return pagePathLib.setPath(pathLanguage, "edit", _id);
                    },
                    list() {
                        return pagePathLib.setPath(pathLanguage, "list");
                    },
                }
            }
        }
    }
}

export default PagePaths;