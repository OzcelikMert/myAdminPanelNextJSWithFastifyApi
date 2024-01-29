import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {ThemeForm, ThemeFormSelect, ThemeFormType,} from "components/theme/form"
import {PagePropCommonDocument} from "types/pageProps";
import {PostTermTypeId, PostTermTypes, PostTypeId, StatusId} from "constants/index";
import V from "library/variable";
import HandleForm from "library/react/handles/form";
import ThemeChooseImage from "components/theme/chooseImage";
import postTermService from "services/postTerm.service";
import staticContentLib from "lib/staticContent.lib";
import imageSourceLib from "lib/imageSource.lib";
import {PostTermUpdateOneParamDocument} from "types/services/postTerm";
import Swal from "sweetalert2";
import Image from "next/image"
import PostLib from "lib/post.lib";
import postLib from "lib/post.lib";
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {
    mainTabActiveKey: string
    items: ThemeFormSelectValueDocument[]
    status: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    mainTitle: string
    formData: PostTermUpdateOneParamDocument,
    isSelectionImage: boolean
};

type PageProps = {
    isModal?: boolean
    _id?: string
    postTypeId?: PostTypeId
    typeId?: PostTermTypeId
} & PagePropCommonDocument;

export default class PagePostTermAdd extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        let _id = this.props._id ?? this.props.router.query._id as string ?? "";
        let typeId = this.props.typeId ?? this.props.router.query.termTypeId ?? 1;
        let postTypeId = this.props.postTypeId ?? this.props.router.query.postTypeId ?? 1;
        this.state = {
            mainTabActiveKey: `general`,
            items: [],
            status: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: _id,
                typeId: Number(typeId),
                postTypeId: Number(postTypeId),
                mainId: "",
                statusId: 0,
                rank: 0,
                contents: {
                    langId: this.props.getStateApp.pageData.langId,
                    image: "",
                    title: "",
                    url: "",
                }
            },
            isSelectionImage: false
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        if([PostTermTypeId.Category, PostTermTypeId.Variations].includes(this.state.formData.typeId)){
            await this.getItems();
        }
        this.getStatus();
        if (this.state.formData._id) {
            await this.getItem();
        }
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: Readonly<PageProps>) {
        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
            this.props.setStateApp({
                isPageLoading: true
            }, async () => {
                await this.getItem();
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            ...postLib.getPageTitles({
                t: this.props.t,
                postTypeId: this.state.formData.postTypeId,
                termTypeId: this.state.formData.typeId
            }),
            this.props.t(this.state.formData._id ? "edit" : "add")
        ];

        if (this.state.formData._id) {
            titles.push(this.state.mainTitle)
        }

        this.props.setBreadCrumb(titles);
    }

    getStatus() {
        this.setState((state: PageState) => {
            state.status = staticContentLib.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress,
                StatusId.Pending
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getItems() {
        let typeId = this.state.formData.typeId == PostTermTypeId.Variations
            ? [PostTermTypeId.Attributes]
            : [this.state.formData.typeId];
        let resData = await postTermService.getMany({
            typeId: typeId,
            postTypeId: this.state.formData.postTypeId,
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active
        });
        if (resData.status) {
            this.setState((state: PageState) => {
                state.items = [{value: "", label: this.props.t("notSelected")}];
                resData.data.forEach(item => {
                    if (!V.isEmpty(this.state.formData._id)) {
                        if (this.state.formData._id == item._id) return;
                    }
                    state.items.push({
                        value: item._id,
                        label: item.contents?.title || this.props.t("[noLangAdd]")
                    });
                });
                return state;
            })
        }
    }

    async getItem() {
        let resData = await postTermService.getOne({
            _id: this.state.formData._id,
            typeId: this.state.formData.typeId,
            postTypeId: this.state.formData.postTypeId,
            langId: this.props.getStateApp.pageData.langId
        });
        if (resData.status) {
            if (resData.data) {
                const item = resData.data;
                this.setState((state: PageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        mainId: item.mainId?._id || "",
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            langId: this.props.getStateApp.pageData.langId
                        }
                    }

                    if (this.props.getStateApp.pageData.langId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }
                    return state;
                }, () => {
                    this.setPageTitle();
                })
            } else {
                this.navigatePage();
            }
        }
    }

    navigatePage() {
        let postTypeId = this.state.formData.postTypeId;
        let postTermTypeId = this.state.formData.typeId;
        let pagePath = PostLib.getPagePath(postTypeId);
        let path = pagePath.term(postTermTypeId).list()
        this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;
            let resData = await ((params._id)
                ? postTermService.updateOne(params)
                : postTermService.add(params));
            if (this.state.formData.typeId == PostTermTypeId.Category && resData.status) {
                await this.getItems();
            }

            this.setState((state: PageState) => {
                if (resData.status) {
                    state.formData = {
                        ...state.formData,
                        mainId: "",
                        statusId: StatusId.Active,
                        rank: 0,
                        contents: {
                            langId: this.props.getStateApp.appData.mainLangId,
                            image: "",
                            title: "",
                            url: "",
                        }
                    }
                }

                state.isSubmitting = false;
                return state;
            }, () => this.setMessage());
        })
    }

    setMessage() {
        Swal.fire({
            title: this.props.t("successful"),
            text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            didClose: () => this.onCloseSuccessMessage()
        })
    }

    onCloseSuccessMessage() {
        if (this.state.formData._id) {
            this.navigatePage();
        }
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <Image
                        src={imageSourceLib.getUploadedImageSrc(this.state.formData.contents.image)}
                        alt="Empty Image"
                        className="post-image img-fluid"
                        width={100}
                        height={100}
                    />
                    <button
                        type="button"
                        className="btn btn-gradient-warning btn-xs ms-1"
                        onClick={() => {
                            this.setState({isSelectionImage: true})
                        }}
                    ><i className="fa fa-pencil-square-o"></i></button>
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                {
                    [PostTermTypeId.Category, PostTermTypeId.Variations, PostTermTypeId.Attributes].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ThemeFormSelect
                                title={`
                                    ${this.props.t("main")} 
                                    ${this.props.t((this.state.formData.typeId == PostTermTypeId.Category) ? "category" : "tag")}
                                `}
                                name="formData.mainId"
                                placeholder={this.props.t("chooseMainCategory")}
                                options={this.state.items}
                                value={this.state.items.findSingle("value", this.state.formData.mainId || "")}
                                onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                            />
                        </div> : null
                }

            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post-term">
                <ThemeChooseImage
                    {...this.props}
                    isShow={this.state.isSelectionImage}
                    onHide={() => this.setState({isSelectionImage: false})}
                    onSelected={images => this.setState((state: PageState) => {
                        state.formData.contents.image = images[0];
                        return state
                    })}
                    isMulti={false}
                />
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-6">
                                {
                                    !this.props.isModal
                                        ? <button className="btn btn-gradient-dark btn-lg btn-icon-text w-100"
                                                  onClick={() => this.navigatePage()}>
                                            <i className="mdi mdi-arrow-left"></i> {this.props.t("returnBack")}
                                        </button> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ThemeForm
                            isActiveSaveButton={true}
                            saveButtonText={this.props.t("save")}
                            saveButtonLoadingText={this.props.t("loading")}
                            isSubmitting={this.state.isSubmitting}
                            formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                        >
                            <div className="grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="theme-tabs">
                                            <Tabs
                                                onSelect={(key: any) => this.setState({mainTabActiveKey: key})}
                                                activeKey={this.state.mainTabActiveKey}
                                                className="mb-5"
                                                transition={false}>
                                                <Tab eventKey="general" title={this.props.t("general")}>
                                                    <this.TabGeneral/>
                                                </Tab>
                                                <Tab eventKey="options" title={this.props.t("options")}>
                                                    <this.TabOptions/>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ThemeForm>
                    </div>
                </div>
            </div>
        )
    }
}