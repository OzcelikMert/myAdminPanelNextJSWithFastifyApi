import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {ComponentForm, ComponentFormSelect, ComponentFormType,} from "@components/elements/form"
import {IPagePropCommon} from "types/pageProps";
import {VariableLibrary} from "@library/variable";
import {HandleFormLibrary} from "@library/react/handles/form";
import ComponentThemeChooseImage from "@components/theme/chooseImage";
import {PostTermService} from "@services/postTerm.service";
import {IPostTermUpdateWithIdParamService} from "types/services/postTerm.service";
import Image from "next/image"
import {IThemeFormSelectValue} from "@components/elements/form/input/select";
import {PostTypeId} from "@constants/postTypes";
import {PostTermTypeId} from "@constants/postTermTypes";
import {PermissionUtil, PostPermissionMethod} from "@utils/permission.util";
import {PostUtil} from "@utils/post.util";
import {StatusId} from "@constants/status";
import {ComponentUtil} from "@utils/component.util";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {RouteUtil} from "@utils/route.util";
import ComponentToast from "@components/elements/toast";

type IPageState = {
    mainTabActiveKey: string
    items: IThemeFormSelectValue[]
    status: IThemeFormSelectValue[]
    isSubmitting: boolean
    mainTitle: string
    formData: IPostTermUpdateWithIdParamService,
};

type IPageProps = {
    isModal?: boolean
    _id?: string
    postTypeId?: PostTypeId
    typeId?: PostTermTypeId
} & IPagePropCommon;

export default class PagePostTermAdd extends Component<IPageProps, IPageState> {
    abortController = new AbortController();

    constructor(props: IPageProps) {
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
                parentId: "",
                statusId: 0,
                rank: 0,
                contents: {
                    langId: this.props.getStateApp.appData.currentLangId,
                    image: "",
                    title: "",
                    url: "",
                }
            }
        }
    }

    async componentDidMount() {
        let methodType = this.state.formData._id ? PostPermissionMethod.UPDATE : PostPermissionMethod.ADD;
        if (PermissionUtil.checkAndRedirect(this.props, PermissionUtil.getPostPermission(this.state.formData.postTypeId, methodType))) {
            if ([PostTermTypeId.Category, PostTermTypeId.Variations].includes(this.state.formData.typeId)) {
                await this.getItems();
            }
            this.getStatus();
            if (this.state.formData._id) {
                await this.getItem();
            }
            this.setPageTitle();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    async componentDidUpdate(prevProps: Readonly<IPageProps>) {
        if (prevProps.getStateApp.appData.currentLangId != this.props.getStateApp.appData.currentLangId) {
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

    componentWillUnmount() {
        this.abortController.abort();
    }

    setPageTitle() {
        let titles: string[] = [
            ...PostUtil.getPageTitles({
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
        this.setState((state: IPageState) => {
            state.status = ComponentUtil.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getItems() {
        let typeId = this.state.formData.typeId == PostTermTypeId.Variations
            ? [PostTermTypeId.Attributes]
            : [this.state.formData.typeId];
        let serviceResult = await PostTermService.getMany({
            typeId: typeId,
            postTypeId: this.state.formData.postTypeId,
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active
        }, this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            this.setState((state: IPageState) => {
                state.items = [{value: "", label: this.props.t("notSelected")}];
                serviceResult.data!.forEach(item => {
                    if (!VariableLibrary.isEmpty(this.state.formData._id)) {
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
        let serviceResult = await PostTermService.getWithId({
            _id: this.state.formData._id,
            typeId: this.state.formData.typeId,
            postTypeId: this.state.formData.postTypeId,
            langId: this.props.getStateApp.appData.currentLangId
        }, this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            const item = serviceResult.data;

            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        parentId: item.parentId?._id || "",
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            langId: this.props.getStateApp.appData.currentLangId
                        }
                    }

                    if (this.props.getStateApp.appData.currentLangId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }
                    return state;
                }, () => resolve(1))
            })
        } else {
            if (!this.state.formData._id) {
                await this.navigatePage();
            }
        }
    }

    navigatePage() {
        let postTypeId = this.state.formData.postTypeId;
        let postTermTypeId = this.state.formData.typeId;
        let pagePath = PostUtil.getPagePath(postTypeId);
        let path = pagePath.TERM_WITH(postTermTypeId).LIST
        RouteUtil.change({props: this.props, path: path});
    }

    async onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;
            let serviceResult = await ((params._id)
                ? PostTermService.updateWithId(params, this.abortController.signal)
                : PostTermService.add(params, this.abortController.signal));

            this.setState({
                isSubmitting: false
            });

            if (serviceResult.status) {
                if (this.state.formData.typeId == PostTermTypeId.Category) {
                    await this.getItems();
                }

                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        parentId: "",
                        statusId: StatusId.Active,
                        rank: 0,
                        contents: {
                            langId: this.props.getStateApp.appData.mainLangId,
                            image: "",
                            title: "",
                            url: "",
                        }
                    }
                    return state;
                });

                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: `${this.props.t(this.state.formData._id ? "itemEdited" : "itemAdded")}!`
                })

                if (this.state.formData._id) {
                    await this.navigatePage();
                }
            }
        })
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => HandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => HandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentThemeChooseImage
                        {...this.props}
                        onSelected={images => this.setState((state: IPageState) => {
                            state.formData.contents.image = images[0];
                            return state
                        })}
                        isMulti={false}
                        selectedImages={(this.state.formData.contents.image) ? [this.state.formData.contents.image] : undefined}
                        isShowReviewImage={true}
                        reviewImage={this.state.formData.contents.image}
                        reviewImageClassName={"post-image"}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => HandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("shortContent").toCapitalizeCase()}
                        name="formData.contents.shortContent"
                        type="textarea"
                        value={this.state.formData.contents.shortContent}
                        onChange={e => HandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                {
                    [PostTermTypeId.Category, PostTermTypeId.Variations, PostTermTypeId.Attributes].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ComponentFormSelect
                                title={`
                                    ${this.props.t("main")} 
                                    ${this.props.t((this.state.formData.typeId == PostTermTypeId.Category) ? "category" : "tag")}
                                `}
                                name="formData.parentId"
                                placeholder={this.props.t("chooseMainCategory")}
                                options={this.state.items}
                                value={this.state.items.findSingle("value", this.state.formData.parentId || "")}
                                onChange={(item: any, e) => HandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                            />
                        </div> : null
                }

            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post-term">
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
                        <ComponentForm
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
                        </ComponentForm>
                    </div>
                </div>
            </div>
        )
    }
}