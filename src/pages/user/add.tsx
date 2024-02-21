import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import moment from "moment";
import {IPagePropCommon} from "types/pageProps";
import ReactHandleFormLibrary from "library/react/handles/form";
import {
    ComponentFieldSet,
    ComponentForm,
    ComponentFormCheckBox,
    ComponentFormSelect,
    ComponentFormType
} from "components/elements/form";
import V, {DateMask} from "library/variable";
import {UserService} from "services/user.service";
import {IUserUpdateOneParamService} from "types/services/user.service";
import Swal from "sweetalert2";
import {ThemeFormSelectValueDocument} from "components/elements/form/input/select";
import {UserEndPointPermission} from "constants/endPointPermissions/user.endPoint.permission";
import {PermissionUtil} from "utils/permission.util";
import {ComponentUtil} from "utils/component.util";
import {StatusId} from "constants/status";
import {UserRoleId, userRoles} from "constants/userRoles";
import {EndPoints} from "constants/endPoints";
import {permissions} from "constants/permissions";
import {IPermissionGroup} from "types/constants/permissionGroups";
import {IPermission} from "types/constants/permissions";
import {permissionGroups} from "constants/permissionGroups";

type IPageState = {
    mainTabActiveKey: string
    userRoles: ThemeFormSelectValueDocument[]
    status: ThemeFormSelectValueDocument[]
    permissions: IPermission[]
    permissionGroups: IPermissionGroup[]
    mainTitle: string,
    isSubmitting: boolean
    formData: IUserUpdateOneParamService
};

type IPageProps = {} & IPagePropCommon;

export default class PageUserAdd extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: "general",
            userRoles: [],
            status: [],
            permissions: [],
            permissionGroups: [],
            mainTitle: "",
            isSubmitting: false,
            formData: {
                _id: this.props.router.query._id as string ?? "",
                name: "",
                email: "",
                password: "",
                roleId: UserRoleId.User,
                statusId: StatusId.Disabled,
                banDateEnd: new Date().getStringWithMask(DateMask.DATE),
                banComment: "",
                permissions: [],
            }
        }
    }

    async componentDidMount() {
        let permission = this.state.formData._id ? UserEndPointPermission.UPDATE : UserEndPointPermission.ADD;
        if(PermissionUtil.checkAndRedirect(this.props, permission)){
            this.setPageTitle();
            this.getRoles();
            this.getStatus();
            if (this.state.formData._id) {
                await this.getItem();
            }
            this.getPermissionsForUserRoleId(this.state.formData.roleId);
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            this.props.t("settings"),
            this.props.t("users"),
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
                StatusId.Pending,
                StatusId.Disabled,
                StatusId.Banned
            ], this.props.t);
            return state;
        })
    }

    getRoles() {
        this.setState((state: IPageState) => {
            let findUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionAuth?.user.roleId);
            state.userRoles = ComponentUtil.getUserRolesForSelect(
                userRoles.map(userRole => findUserRole && (findUserRole.rank > userRole.rank) ? userRole.id : 0).filter(roleId => roleId !== 0),
                this.props.t
            );
            return state;
        })
    }

    async getItem() {
        let resData = await UserService.getOne({
            _id: this.state.formData._id
        });
        if (resData.status && resData.data) {
            const user = resData.data;
            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = user;
                    state.mainTitle = user.name;
                    return state;
                }, () => resolve(1));
            })
        } else {
            await this.navigatePage();
        }
    }

    getPermissionsForUserRoleId(userRoleId: UserRoleId) {
        console.log(this.state.formData);
        let filteredPermissions = permissions.filter(perm => PermissionUtil.checkPermissionRoleRank(userRoleId, perm.minUserRoleId));
        filteredPermissions = filteredPermissions.filter(perm => PermissionUtil.checkPermissionId(this.props.getStateApp.sessionAuth!.user.roleId, this.props.getStateApp.sessionAuth!.user.permissions, [perm.id]))

        let filteredPermissionGroups: IPermissionGroup[] = [];
        filteredPermissions.forEach(perm => {
            let foundPermissionGroup = permissionGroups.findSingle("id", perm.groupId);
            if(foundPermissionGroup && !filteredPermissionGroups.findSingle("id", perm.groupId)){
                filteredPermissionGroups.push(foundPermissionGroup);
            }
        });

        this.setState((state: IPageState) => {
            state.permissions = filteredPermissions;
            state.permissionGroups = filteredPermissionGroups;
            return state;
        });
    }

    async navigatePage() {
        let path = EndPoints.USER_WITH.LIST;
        await this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;
            let resData = await ((params._id)
                ? UserService.updateOne(params)
                : UserService.add({...params, password: this.state.formData.password || ""}));
            this.setState({isSubmitting: false}, () => this.setMessage())
        })
    }

    onPermissionSelected(isSelected: boolean, permId: number) {
        this.setState((state: IPageState) => {
            if (isSelected) {
                state.formData.permissions.push(permId);
            } else {
                let findIndex = state.formData.permissions.indexOfKey("", permId);
                if (findIndex > -1) state.formData.permissions.remove(findIndex);
            }
            return state;
        })
    }

    onPermissionAllSelected(isSelected: boolean) {
        this.setState((state: IPageState) => {
            if (isSelected) {
                state.formData.permissions = state.permissions.map(perm => perm.id);
            } else {
                state.formData.permissions = [];
            }
            return state;
        })
    }

    onChangeUserRole(roleId: UserRoleId) {
        let userRole = userRoles.findSingle("id", roleId);
        if(userRole){
            this.getPermissionsForUserRoleId(roleId);
            this.setState({
                formData: {
                    ...this.state.formData,
                    permissions: []
                }
            });
        }
    }

    setMessage = () => {
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
        this.navigatePage()
    }

    TabPermissions = (props: any) => {
        let self = this;

        function PermissionItem(props: IPermission, index: number) {
            return (
                <div className="col-md-4" key={index}>
                    <ComponentFormCheckBox
                        key={index}
                        title={self.props.t(props.langKey)}
                        name="formData.permissions"
                        checked={self.state.formData.permissions.includes(props.id)}
                        onChange={e => self.onPermissionSelected(e.target.checked, props.id)}
                    />
                </div>
            )
        }

        function PermissionGroup(props: IPermissionGroup, index: number) {
            let foundPermissions = self.state.permissions.findMulti("groupId", props.id);

            return foundPermissions.every(permission => permission == null) ? null : (
                <div className="col-md-6 mb-3">
                    <ComponentFieldSet
                        key={index}
                        legend={self.props.t(props.langKey)}
                    >
                        {
                            foundPermissions.map((perm, index) => PermissionItem(perm, index))
                        }
                    </ComponentFieldSet>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-12 mb-3">
                    <ComponentFormCheckBox
                        title={this.props.t("selectAll")}
                        checked={self.state.permissions.length === this.state.formData.permissions.length}
                        onChange={e => this.onPermissionAllSelected(e.target.checked)}
                    />
                </div>
                {
                    this.state.permissionGroups.map((group, index) => PermissionGroup(group, index))
                }
            </div>
        );
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("role")}
                        name="formData.roleId"
                        placeholder={this.props.t("chooseRole")}
                        options={this.state.userRoles}
                        value={this.state.userRoles?.findSingle("value", this.state.formData.roleId)}
                        onChange={(item: any, e) => {
                            ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this);
                            this.onChangeUserRole(item.value);
                        }}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                {
                    this.state.formData.statusId == StatusId.Banned ?
                        <div className="col-md-7 mb-3">
                            <div className="mb-3">
                                <ComponentFormType
                                    title={`${this.props.t("banDateEnd")}*`}
                                    type="date"
                                    name="formData.banDateEnd"
                                    value={moment(this.state.formData.banDateEnd).format("YYYY-MM-DD")}
                                    onChange={(event) => ReactHandleFormLibrary.onChangeInput(event, this)}
                                />
                            </div>
                            <div className="mb-3">
                                <ComponentFormType
                                    title={this.props.t("banComment")}
                                    name="formData.banComment"
                                    type="textarea"
                                    value={this.state.formData.banComment}
                                    onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                />
                            </div>
                        </div> : null
                }
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("name")}*`}
                        name="formData.name"
                        type="text"
                        required={true}
                        value={this.state.formData.name}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("email")}*`}
                        name="formData.email"
                        type="email"
                        required={true}
                        autoComplete={"new-password"}
                        value={this.state.formData.email}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("password")}*`}
                        name="formData.password"
                        type="password"
                        autoComplete={"new-password"}
                        required={V.isEmpty(this.state.formData._id)}
                        value={this.state.formData.password}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        let userRole = userRoles.findSingle("id", this.state.formData.roleId);
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings page-user">
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
                            formAttributes={{
                                onSubmit: (event) => this.onSubmit(event),
                                autoComplete: "new-password"
                            }}
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
                                                <Tab eventKey="permissions" title={`${this.props.t("permissions")} (${this.props.t(userRole?.langKey ?? "[noLangAdd]")})`}>
                                                    <this.TabPermissions/>
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
