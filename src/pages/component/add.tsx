import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import HandleForm from "library/react/handles/form";
import V from "library/variable";
import Swal from "sweetalert2";
import {IThemeFormSelectValue} from "components/elements/form/input/select";
import {IComponentUpdateWithIdParamService} from "types/services/component.service";
import {IPagePropCommon} from "types/pageProps";
import {IComponentElementModel} from "types/models/component.model";
import {PermissionUtil} from "utils/permission.util";
import {ComponentEndPointPermission} from "constants/endPointPermissions/component.endPoint.permission";
import {ElementTypeId, elementTypes} from "constants/elementTypes";
import {ComponentService} from "services/component.service";
import {EndPoints} from "constants/endPoints";
import {cloneDeepWith} from "lodash";
import {ComponentFieldSet, ComponentForm, ComponentFormSelect, ComponentFormType} from "components/elements/form";
import {UserRoleId} from "constants/userRoles";
import ComponentPageComponentElementTypeInput from "components/pages/component/add/elementTypeInput";

type IPageState = {
    elementTypes: IThemeFormSelectValue[]
    mainTabActiveKey: string
    isSubmitting: boolean
    mainTitle: string,
    formData: IComponentUpdateWithIdParamService,
    selectedData?: IComponentElementModel
};

type IPageProps = {} & IPagePropCommon;

export default class PageComponentAdd extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin) ? "general" : "elements",
            elementTypes: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: this.props.router.query._id as string ?? "",
                elements: [],
                elementId: "",
                title: ""
            }
        }
    }

    async componentDidMount() {
        let permission = this.state.formData._id ? ComponentEndPointPermission.UPDATE : ComponentEndPointPermission.ADD;
        if (PermissionUtil.checkAndRedirect(this.props, permission)) {
            this.getElementTypes();
            if (this.state.formData._id) {
                await this.getItem();
            }
            this.setPageTitle();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    async componentDidUpdate(prevProps: IPagePropCommon) {
        if (prevProps.getStateApp.appData.currentLangId != this.props.getStateApp.appData.currentLangId) {
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

    getElementTypes() {
        this.setState((state: IPageState) => {
            state.elementTypes = elementTypes.map(type => ({
                label: this.props.t(type.langKey),
                value: type.id
            }))
            return state;
        })
    }

    async getItem() {
        let serviceResult = await ComponentService.getWithId({
            _id: this.state.formData._id,
            langId: this.props.getStateApp.appData.currentLangId,
        });
        if (serviceResult.status && serviceResult.data) {
            const item = serviceResult.data;

            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        elements: item.elements.map(element => ({
                            ...element,
                            contents: {
                                ...element.contents,
                                langId: this.props.getStateApp.appData.currentLangId
                            }
                        }))
                    };

                    if (this.props.getStateApp.appData.currentLangId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.title || "";
                    }

                    return state;
                }, () => resolve(1));
            });
        } else {
            await this.navigatePage();
        }
    }

    async navigatePage() {
        let path = EndPoints.COMPONENT_WITH.LIST;
        await this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;

            let serviceResult = await ((params._id)
                ? ComponentService.updateWithId(params)
                : ComponentService.add(params))

            this.setState({
                isSubmitting: false
            });

            if(serviceResult.status){
                Swal.fire({
                    title: this.props.t("successful"),
                    text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
                    icon: "success",
                    timer: 1000,
                    timerProgressBar: true,
                    didClose: () => {
                        if (!this.state.formData._id) {
                            this.navigatePage();
                        }
                    }
                })
            }
        })
    }

    onInputChange(data: any, key: string, value: any) {
        this.setState((state: IPageState) => {
            data[key] = value;
            return state;
        })
    }

    onCreateElement() {
        this.setState((state: IPageState) => {
            state.formData.elements = [{
                _id: String.createId(),
                title: "",
                rank: state.formData.elements.length + 1,
                typeId: ElementTypeId.Text,
                elementId: "",
                contents: {
                    langId: this.props.getStateApp.appData.currentLangId
                }
            }, ...state.formData.elements]
            return state;
        })
    }

    onAccept(index: number) {
        this.setState((state: IPageState) => {
            state.formData.elements[index] = state.selectedData!;
            state.selectedData = undefined;
            return state;
        })
    }

    onEdit(index: number) {
        this.setState((state: IPageState) => {
            state.selectedData = cloneDeepWith(this.state.formData.elements[index]);
            return state;
        })
    }

    onCancelEdit() {
        this.setState((state: IPageState) => {
            state.selectedData = undefined;
            return state;
        })
    }

    async onDelete(index: number) {
        let result = await Swal.fire({
            title: this.props.t("deleteAction"),
            html: `<b>'${this.state.formData.elements[index].elementId}'</b> ${this.props.t("deleteItemQuestionWithItemName")}`,
            confirmButtonText: this.props.t("yes"),
            cancelButtonText: this.props.t("no"),
            icon: "question",
            showCancelButton: true
        });

        if (result.isConfirmed) {
            this.setState((state: IPageState) => {
                state.formData.elements.splice(index, 1);
                state.selectedData = undefined;
                return state;
            })
        }
    }

    ComponentElement = (props: IComponentElementModel, index: number) => {
        return (
            <div className="col-md-12 mt-4">
                <ComponentFieldSet
                    legend={props.title}
                    legendElement={
                        PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin)
                            ? (<span>
                                <i className="mdi mdi-pencil-box text-warning fs-1 cursor-pointer ms-2"
                                   onClick={() => this.onEdit(index)}></i>
                                <i className="mdi mdi-minus-box text-danger fs-1 cursor-pointer ms-2"
                                   onClick={() => this.onDelete(index)}></i>
                            </span>)
                            : undefined
                    }
                >
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <ComponentPageComponentElementTypeInput
                                {...this.props}
                                data={props}
                                onChange={(key, value) => this.onInputChange(props.contents, key, value)}
                            />
                        </div>
                    </div>
                </ComponentFieldSet>
            </div>
        )
    }

    ComponentElementEdit = (props: IComponentElementModel, index: number) => {
        return (
            <div className="col-md-12 mt-3">
                <ComponentFieldSet legend={this.props.t("newStaticContent")}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <ComponentFormType
                                title={`${this.props.t("title")}*`}
                                placeholder={this.props.t("title")}
                                type="text"
                                value={props.title}
                                onChange={e => this.onInputChange(props, "title", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormType
                                title={`${this.props.t("elementId")}*`}
                                type="text"
                                value={props.elementId}
                                onChange={e => this.onInputChange(props, "elementId", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormSelect
                                title={this.props.t("typeId")}
                                placeholder={this.props.t("typeId")}
                                options={this.state.elementTypes}
                                value={this.state.elementTypes.filter(item => item.value == props.typeId)}
                                onChange={(item: any, e) => this.onInputChange(props, "typeId", item.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormType
                                title={`${this.props.t("rank")}*`}
                                type="number"
                                required={true}
                                value={props.rank}
                                onChange={e => this.onInputChange(props, "rank", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-gradient-success btn-lg"
                                            onClick={() => this.onAccept(index)}>{this.props.t("okay")}</button>
                                </div>
                                <div className="col-md-6 text-end">
                                    <button type="button" className="btn btn-gradient-dark btn-lg"
                                            onClick={() => this.onCancelEdit()}>{this.props.t("cancel")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentFieldSet>
            </div>
        )
    }

    TabElements = () => {
        return (
            <div className="row mb-3">
                {
                    PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin)
                        ? <div className="col-md-7">
                            <button type={"button"} className="btn btn-gradient-success btn-lg"
                                    onClick={() => this.onCreateElement()}>+ {this.props.t("addNew")}
                            </button>
                        </div> : null
                }
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.state.formData.elements?.orderBy("rank", "asc").map((item, index) =>
                                this.state.selectedData && this.state.selectedData._id == item._id
                                    ? this.ComponentElementEdit(this.state.selectedData,  index)
                                    : this.ComponentElement(item, index)
                            )
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
                        title={`${this.props.t("title")}*`}
                        name="formData.title"
                        type="text"
                        required={true}
                        value={this.state.formData.title}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("elementId")}*`}
                        name="formData.elementId"
                        type="text"
                        required={true}
                        value={this.state.formData.elementId}
                        onChange={e => HandleForm.onChangeInput(e, this)}
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
                                <button className="btn btn-gradient-dark btn-lg btn-icon-text w-100"
                                        onClick={() => this.navigatePage()}>
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
                                                    PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin)
                                                        ? <Tab eventKey="general" title={this.props.t("general")}>
                                                            <this.TabGeneral/>
                                                        </Tab> : null
                                                }
                                                <Tab eventKey="elements" title={this.props.t("elements")}>
                                                    <this.TabElements/>
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
