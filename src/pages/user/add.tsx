import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import moment from "moment";
import {PagePropCommonDocument} from "types/pageProps";
import {PermissionGroups, Permissions, StatusId, UserRoleId, userRoles} from "constants/index";
import HandleForm from "library/react/handles/form";
import {ThemeFieldSet, ThemeForm, ThemeFormCheckBox, ThemeFormSelect, ThemeFormType} from "components/theme/form";
import V, {DateMask} from "library/variable";
import userService from "services/user.service";
import staticContentLib from "lib/staticContent.lib";
import PagePaths from "constants/pagePaths";
import {UserUpdateOneParamDocument} from "types/services/user.service";
import Swal from "sweetalert2";
import permissionLib from "lib/permission.lib";
import {PermissionDocument, PermissionGroupDocument} from "types/constants";
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {
    mainTabActiveKey: string
    userRoles: ThemeFormSelectValueDocument[]
    status: ThemeFormSelectValueDocument[]
    mainTitle: string,
    isSubmitting: boolean
    formData: UserUpdateOneParamDocument
};

type PageProps = {} & PagePropCommonDocument;

export default class PageUserAdd extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: "general",
            userRoles: [],
            status: [],
            mainTitle: "",
            isSubmitting: false,
            formData: {
                _id: this.props.router.query._id as string ?? "",
                name: "",
                email: "",
                password: "",
                roleId: 0,
                statusId: 0,
                banDateEnd: new Date().getStringWithMask(DateMask.DATE),
                banComment: "",
                permissions: []
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        this.getRoles();
        this.getStatus();
        if (this.state.formData._id) {
            await this.getItem();
        }
        this.props.setStateApp({
            isPageLoading: false
        })
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
        this.setState((state: PageState) => {
            state.status = staticContentLib.getStatusForSelect([
                StatusId.Active,
                StatusId.Pending,
                StatusId.Disabled,
                StatusId.Banned
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    getRoles() {
        this.setState((state: PageState) => {
            let findUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionData.roleId);
            state.userRoles = staticContentLib.getuserRolesForSelect(
                userRoles.map(userRole => findUserRole && (findUserRole.rank > userRole.rank) ? userRole.id : 0).filter(roleId => roleId !== 0),
                this.props.t
            );
            state.formData.roleId = UserRoleId.User;
            return state;
        })
    }

    async getItem() {
        let resData = await userService.getOne({
            _id: this.state.formData._id
        });
        if (resData.status) {
            if (resData.data) {
                const item = resData.data;
                this.setState((state: PageState) => {
                    state.formData = Object.assign(state.formData, {
                        image: item.image,
                        name: item.name,
                        email: item.email,
                        password: "",
                        roleId: item.roleId,
                        statusId: item.statusId,
                        banDateEnd: item.banDateEnd,
                        banComment: item.banComment,
                        permissions: item.permissions
                    });

                    state.mainTitle = item.name;

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
        let path = PagePaths.settings().user().list();
        this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = this.state.formData;

            let resData = await ((params._id)
                ? userService.updateOne(params)
                : userService.add({...params, password: this.state.formData.password || ""}));
            this.setState({isSubmitting: false}, () => this.setMessage())
        })
    }

    onPermissionSelected(isSelected: boolean, permId: number) {
        this.setState((state: PageState) => {
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
        this.setState((state: PageState) => {
            if (isSelected) {
                state.formData.permissions = Permissions.map(perm => perm.id);
            } else {
                state.formData.permissions = [];
            }
            return state;
        })
    }

    onChangeUserRole(roleId: number) {
        let role = userRoles.findSingle("id", roleId);
        let permsForRole = Permissions.filter(perm => role && (perm.defaultRoleRank <= role.rank));
        this.setState((state: PageState) => {
            state.formData.permissions = [];
            permsForRole.forEach(perm => {
                state.formData.permissions.push(perm.id);
            })
            return state;
        });
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

        function PermissionGroup(props: PermissionGroupDocument, index: number) {
            let permissions = Permissions.findMulti("groupId", props.id).map((perm, index) =>
                permissionLib.checkPermission(
                    self.props.getStateApp.sessionData.roleId,
                    self.props.getStateApp.sessionData.permissions,
                    perm.id
                ) ? PermissionItem(perm, index) : null
            )

            return permissions.every(permission => permission == null) ? null : (
                <div className="col-md-6 mb-3">
                    <ThemeFieldSet
                        key={index}
                        legend={self.props.t(props.langKey)}
                    >
                        {permissions}
                    </ThemeFieldSet>
                </div>
            )
        }

        function PermissionItem(props: PermissionDocument, index: number) {
            return (
                <div className="col-md-4" key={index}>
                    <ThemeFormCheckBox
                        key={index}
                        title={self.props.t(props.langKey)}
                        name="formData.permissions"
                        checked={self.state.formData.permissions.includes(props.id)}
                        onChange={e => self.onPermissionSelected(e.target.checked, props.id)}
                    />
                </div>
            )
        }


        return (
            <div className="row">
                <div className="col-md-12 mb-3">
                    <ThemeFormCheckBox
                        title={this.props.t("selectAll")}
                        name="formData.permAll"
                        checked={Permissions.length === this.state.formData.permissions.length}
                        onChange={e => this.onPermissionAllSelected(e.target.checked)}
                    />
                </div>
                {
                    PermissionGroups.map((group, index) => PermissionGroup(group, index))
                }
            </div>
        );
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("role")}
                        name="formData.roleId"
                        placeholder={this.props.t("chooseRole")}
                        options={this.state.userRoles}
                        value={this.state.userRoles?.findSingle("value", this.state.formData.roleId)}
                        onChange={(item: any, e) => {
                            HandleForm.onChangeSelect(e.name, item.value, this);
                            this.onChangeUserRole(item.value);
                        }}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                {
                    this.state.formData.statusId == StatusId.Banned ?
                        <div className="col-md-7 mb-3">
                            <div className="mb-3">
                                <ThemeFormType
                                    title={`${this.props.t("banDateEnd")}*`}
                                    type="date"
                                    name="formData.banDateEnd"
                                    value={moment(this.state.formData.banDateEnd).format("YYYY-MM-DD")}
                                    onChange={(event) => HandleForm.onChangeInput(event, this)}
                                />
                            </div>
                            <div className="mb-3">
                                <ThemeFormType
                                    title={this.props.t("banComment")}
                                    name="formData.banComment"
                                    type="textarea"
                                    value={this.state.formData.banComment}
                                    onChange={e => HandleForm.onChangeInput(e, this)}
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
                    <ThemeFormType
                        title={`${this.props.t("name")}*`}
                        name="formData.name"
                        type="text"
                        required={true}
                        value={this.state.formData.name}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("email")}*`}
                        name="formData.email"
                        type="email"
                        required={true}
                        autoComplete={"new-password"}
                        value={this.state.formData.email}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("password")}*`}
                        name="formData.password"
                        type="password"
                        autoComplete={"new-password"}
                        required={V.isEmpty(this.state.formData._id)}
                        value={this.state.formData.password}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    render() {
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
                        <ThemeForm
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
                                                <Tab eventKey="permissions" title={this.props.t("permissions")}>
                                                    <this.TabPermissions/>
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
