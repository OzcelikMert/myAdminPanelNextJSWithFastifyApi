import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {IPagePropCommon} from "types/pageProps";
import ReactHandleFormLibrary from "library/react/handles/form";
import {ComponentFieldSet, ComponentForm, ComponentFormSelect, ComponentFormType} from "components/elements/form";
import V from "library/variable";
import {IComponentUpdateOneParamService} from "types/services/component.service";
import componentService from "services/component.service";
import ComponentThemeChooseImage from "components/theme/chooseImage";
import Swal from "sweetalert2";
import Image from "next/image"
import {ThemeFormSelectValueDocument} from "components/elements/form/input/select";
import {IComponentTypeModel} from "types/models/component.model";
import {languageKeys} from "constants/languageKeys";
import {componentInputTypes} from "constants/componentInputTypes";
import {EndPoints} from "constants/endPoints";

type IPageState = {
    langKeys: ThemeFormSelectValueDocument[]
    types: ThemeFormSelectValueDocument[]
    mainTabActiveKey: string
    isSubmitting: boolean
    mainTitle: string,
    formData: IComponentUpdateOneParamService,
} & { [key: string]: any };

type IPageProps = {} & IPagePropCommon;

export default class PageComponentAdd extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: "general",
            langKeys: [],
            types: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: this.props.router.query._id as string ?? "",
                types: [],
                elementId: "",
                langKey: "[noLangAdd]"
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        this.getLangKeys();
        this.getTypes();
        if (this.state.formData._id) {
            await this.getItem();
        }
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: IPagePropCommon) {
        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
            this.props.setStateApp({
                isPageLoading: true
            }, async () => {
                await this.getItem()
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            this.props.t("components"),
            this.props.t(this.state.formData._id ? "edit" : "add")
        ];
        if (this.state.formData._id) {
            titles.push(this.state.mainTitle)
        }
        this.props.setBreadCrumb(titles);
    }

    getLangKeys() {
        this.setState((state: IPageState) => {
            state.langKeys = languageKeys.map(langKey => ({label: langKey, value: langKey}))
            return state;
        })
    }

    getTypes() {
        this.setState((state: IPageState) => {
            state.types = componentInputTypes.map(type => ({
                label: this.props.t(type.langKey),
                value: type.id
            }))
            return state;
        })
    }

    async getItem() {
        let resData = await componentService.getOne({
            _id: this.state.formData._id,
            langId: this.props.getStateApp.pageData.langId,
        });
        if (resData.status) {
            if (resData.data) {
                const item = resData.data;
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        types: item.types.map(type => ({
                            ...type,
                            contents: {
                                ...type.contents,
                                langId: this.props.getStateApp.pageData.langId
                            }
                        }))
                    };

                    if (this.props.getStateApp.pageData.langId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = this.props.t(item.langKey);
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
        let path = EndPoints.COMPONENT_WITH.LIST;
        this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;
            let resData = await ((params._id)
                ? componentService.updateOne(params)
                : componentService.add(params))
            this.setState({
                isSubmitting: false
            }, () => this.setMessage())
        })
    }

    onCloseSuccessMessage() {
        if (!this.state.formData._id) {
            this.navigatePage();
        }
    }

    onInputChange(data: any, key: string, value: any) {
        this.setState((state: IPageState) => {
            data[key] = value;
            return state;
        }, () => {
        })
    }

    onCreateType() {
        this.setState((state: IPageState) => {
            state.formData.types = [{
                _id: String.createId(),
                elementId: "",
                rank: state.formData.types.length,
                langKey: "[noLangAdd]",
                typeId: ComponentInputTypeId.Text,
                contents: {
                    langId: this.props.getStateApp.pageData.langId,
                    content: ""
                }
            }, ...state.formData.types]
            return state;
        })
    }

    async onDelete(componentTypes: IComponentTypeModel[], index: number) {
        let result = await Swal.fire({
            title: this.props.t("deleteAction"),
            html: `<b>'${this.props.t(componentTypes[index].langKey)}'</b> ${this.props.t("deleteItemQuestionWithItemName")}`,
            confirmButtonText: this.props.t("yes"),
            cancelButtonText: this.props.t("no"),
            icon: "question",
            showCancelButton: true
        });
        if (result.isConfirmed) {
            this.setState((state: IPageState) => {
                componentTypes.splice(index, 1);
                return state;
            })
        }
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

    TabTypes = () => {
        const Type = (typeProps: IComponentTypeModel, typeIndex: number) => {
            let input = <div>{this.props.t("type")}</div>;
            switch (typeProps.typeId) {
                case ComponentInputTypeId.TextArea:
                    input = <ComponentFormType
                        type={"textarea"}
                        title={this.props.t(typeProps.langKey)}
                        value={typeProps.contents?.content}
                        onChange={e => this.onInputChange(typeProps.contents, "content", e.target.value)}
                    />
                    break;
                case ComponentInputTypeId.Image:
                    input = <ComponentFieldSet
                        legend={`${this.props.t(typeProps.langKey)} ${typeProps.contents?.comment ? `(${typeProps.contents.comment})` : ""}`}
                    >
                        <ComponentThemeChooseImage
                            {...this.props}
                            isShow={this.state[typeProps._id]}
                            onHide={() => this.setState((state: IPageState) => {
                                state[typeProps._id] = false;
                                return state;
                            })}
                            onSelected={images => this.setState((state: IPageState) => {
                                if (typeProps.contents) {
                                    typeProps.contents.content = images[0];
                                }
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={imageSourceLib.getUploadedImageSrc(typeProps.contents?.content)}
                                alt="Empty Image"
                                className="post-image img-fluid"
                                width={100}
                                height={100}
                            />
                            <button
                                type="button"
                                className="btn btn-gradient-warning btn-xs ms-1"
                                onClick={() => this.setState((state: IPageState) => {
                                    state[typeProps._id] = true;
                                    return state;
                                })}
                            ><i className="fa fa-pencil-square-o"></i> {this.props.t("select")}</button>
                        </div>
                    </ComponentFieldSet>
                    break;
                case ComponentInputTypeId.Button:
                    input = (
                        <div className="row">
                            <div className="col-md-6">
                                <ComponentFormType
                                    type={"text"}
                                    title={`${this.props.t(typeProps.langKey)} ${typeProps.contents?.comment ? `(${typeProps.contents.comment})` : ""}`}
                                    value={typeProps.contents?.content}
                                    onChange={e => this.onInputChange(typeProps.contents, "content", e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mt-3 mt-lg-0">
                                <ComponentFormType
                                    type={"text"}
                                    title={this.props.t("url")}
                                    value={typeProps.contents?.url || ""}
                                    onChange={e => this.onInputChange(typeProps.contents, "url", e.target.value)}
                                />
                            </div>
                        </div>
                    )
                    break;
                case ComponentInputTypeId.Number:
                    input = <ComponentFormType
                        type={"number"}
                        title={`${this.props.t(typeProps.langKey)} ${typeProps.contents?.comment ? `(${typeProps.contents.comment})` : ""}`}
                        value={typeProps.contents?.content}
                        onChange={e => this.onInputChange(typeProps.contents, "content", e.target.value)}
                    />
                    break;
                default:
                    input = <ComponentFormType
                        type={"text"}
                        title={`${this.props.t(typeProps.langKey)} ${typeProps.contents?.comment ? `(${typeProps.contents.comment})` : ""}`}
                        value={typeProps.contents?.content}
                        onChange={e => this.onInputChange(typeProps.contents, "content", e.target.value)}
                    />
                    break;
            }

            return (
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 text-end">
                                    <button type={"button"} className="btn btn-gradient-danger btn-lg"
                                            onClick={() => this.onDelete(this.state.formData.types, typeIndex)}><i className="mdi mdi-trash-can-outline"></i> {this.props.t("delete")}</button>
                                </div> : null
                        }
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 mt-3">
                                    <ComponentFormType
                                        title={`${this.props.t("elementId")}*`}
                                        type="text"
                                        required={true}
                                        value={typeProps.elementId}
                                        onChange={e => this.onInputChange(typeProps, "elementId", e.target.value)}
                                    />
                                </div> : null
                        }
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 mt-3">
                                    <ComponentFormSelect
                                        title={this.props.t("langKey")}
                                        placeholder={this.props.t("langKey")}
                                        options={this.state.langKeys}
                                        value={this.state.langKeys.filter(item => item.value == typeProps.langKey)}
                                        onChange={(item: any, e) => this.onInputChange(typeProps, "langKey", item.value)}
                                    />
                                </div> : null
                        }
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 mt-3">
                                    <ComponentFormSelect
                                        title={this.props.t("typeId")}
                                        placeholder={this.props.t("typeId")}
                                        options={this.state.types}
                                        value={this.state.types.filter(item => item.value == typeProps.typeId)}
                                        onChange={(item: any, e) => this.onInputChange(typeProps, "typeId", item.value)}
                                    />
                                </div> : null
                        }
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 mt-3">
                                    <ComponentFormType
                                        title={`${this.props.t("comment")}`}
                                        type="text"
                                        value={typeProps.contents?.comment}
                                        onChange={e => this.onInputChange(typeProps.contents, "comment", e.target.value)}
                                    />
                                </div> : null
                        }
                        {
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <div className="col-md-12 mt-3">
                                    <ComponentFormType
                                        title={`${this.props.t("rank")}*`}
                                        type="number"
                                        required={true}
                                        value={typeProps.rank}
                                        onChange={e => this.onInputChange(typeProps, "rank", e.target.value)}
                                    />
                                </div> : null
                        }
                        <div className="col-md-12 mt-3">
                            {input}
                        </div>
                    </div>
                    {
                        this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                            ? <hr/> : null
                    }
                </div>
            )
        }

        return (
            <div className="row mb-3">
                {
                    this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                        ? <div className="col-md-7">
                            <button type={"button"} className="btn btn-gradient-success btn-lg"
                                    onClick={() => this.onCreateType()}>+ {this.props.t("newType")}
                            </button>
                        </div> : null
                }
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.state.formData.types?.map((type, index) => Type(type, index))
                        }
                    </div>
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("elementId")}*`}
                        name="formData.elementId"
                        type="text"
                        required={true}
                        value={this.state.formData.elementId}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("langKey")}
                        name="formData.langKey"
                        placeholder={this.props.t("langKey")}
                        options={this.state.langKeys}
                        value={this.state.langKeys?.findSingle("value", this.state.formData.langKey)}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-gradient-dark btn-lg btn-icon-text w-100" onClick={() => this.navigatePage()}>
                                    <i className="mdi mdi-arrow-left"></i> {this.props.t("returnBack")}
                                </button>
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
                                                {
                                                    this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                                        ? <Tab eventKey="general" title={this.props.t("general")}>
                                                            <this.TabGeneral/>
                                                        </Tab> : null
                                                }
                                                <Tab
                                                    eventKey={this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin ? "types" : "general"}
                                                    title={this.props.t(this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin ? "content" : "general")}
                                                >
                                                    <this.TabTypes/>
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
