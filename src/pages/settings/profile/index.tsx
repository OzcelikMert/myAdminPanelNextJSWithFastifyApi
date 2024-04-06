import React, {Component, FormEvent} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormType} from "@components/elements/form";
import ReactHandleFormLibrary from "@library/react/handles/form";
import ComponentThemeChooseImage from "@components/theme/chooseImage";
import {UserService} from "@services/user.service";
import ComponentToast from "@components/elements/toast";
import Image from "next/image"
import ComponentThemeBadgeStatus from "@components/theme/badge/status";
import ComponentThemeBadgeUserRole from "@components/theme/badge/userRole";
import {
    IUserGetResultService,
    IUserUpdateProfileImageParamService,
    IUserUpdateProfileParamService
} from "types/services/user.service";
import {permissions} from "@constants/permissions";
import {permissionGroups} from "@constants/permissionGroups";
import {IPermissionGroup} from "types/constants/permissionGroups";
import {IPermission} from "types/constants/permissions";
import {ImageSourceUtil} from "@utils/imageSource.util";
import ComponentSpinnerDonut from "@components/elements/spinners/donut";

type IPageState = {
    isSubmitting: boolean
    isImageChanging: boolean
    isSelectionImage: boolean
    user?: IUserGetResultService
    formData: IUserUpdateProfileParamService & IUserUpdateProfileImageParamService
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingsProfile extends Component<IPageProps, IPageState> {
    abortController = new AbortController();

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            isImageChanging: false,
            isSelectionImage: false,
            formData: {
                image: "",
                name: "",
                comment: "",
                phone: "",
                facebook: "",
                instagram: "",
                twitter: ""
            }
        }
    }

    async componentDidMount() {
        await this.getUser();
        this.setPageTitle();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("profile")])
    }

    async getUser() {
        let serviceResult = await UserService.getWithId({_id: this.props.getStateApp.sessionAuth!.user.userId}, this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            const user = serviceResult.data;
            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.user = user;
                    state.formData = {
                        image: user.image,
                        name: user.name,
                        comment: user.comment,
                        phone: user.phone,
                        facebook: user.facebook,
                        instagram: user.instagram,
                        twitter: user.twitter
                    }

                    return state;
                }, () => resolve(1));
            })
        }
    }

    onChangeImage(image: string) {
        this.setState({
            isSubmitting: true,
            isImageChanging: true
        }, async () => {
            let serviceResult = await UserService.updateProfileImage({image: image}, this.abortController.signal);
            if (serviceResult.status) {
                this.setState((state: IPageState) => {
                    state.isSubmitting = false;
                    state.isImageChanging = false;
                    state.formData.image = image;
                    return state;
                }, () => {
                    this.props.setStateApp({
                        sessionAuth: {
                            ...this.props.getStateApp.sessionAuth,
                            user: {
                                ...this.props.getStateApp.sessionAuth!.user,
                                image: image
                            }
                        }
                    })
                });
            }
        })
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let serviceResult = await UserService.updateProfile(this.state.formData, this.abortController.signal);
            if (serviceResult.status) {
                this.props.setStateApp({
                    sessionAuth: {
                        ...this.props.getStateApp.sessionAuth,
                        user: {
                            ...this.props.getStateApp.sessionAuth!.user,
                            name: this.state.formData.name ?? ""
                        }
                    }
                }, () => {
                    new ComponentToast({
                        type: "success",
                        title: this.props.t("successful"),
                        content: this.props.t("profileUpdated")
                    })
                })
            }

            this.setState({
                isSubmitting: false
            });
        })
    }

    ProfileInformation = () => (
        <div className="grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h6 className="pb-1 border-bottom fw-bold text-start">{this.props.t("general")}</h6>
                    <div className="row">
                        <div className="col-sm-12 pb-2 pt-2">
                            <span className="mb-2 fw-bold">{this.props.t("email")}:
                                <h6 className="d-inline-block ms-2">{this.state.user?.email}</h6>
                            </span>
                        </div>
                        <div className="col-sm-12 pb-2 pt-2">
                            <span className="mb-2 fw-bold">{this.props.t("role")}:
                                <ComponentThemeBadgeUserRole t={this.props.t} userRoleId={this.state.user!.roleId}
                                                             className="ms-2"/>
                            </span>
                        </div>
                        <div className="col-sm-12 pb-2 pt-2">
                            <span className="mb-2 fw-bold">{this.props.t("status")}:
                                <ComponentThemeBadgeStatus t={this.props.t} statusId={this.state.user!.statusId}
                                                           className="ms-2"/>
                            </span>
                        </div>
                        <div className="col-sm-12 pb-2 pt-2">
                            <span className="mb-2 fw-bold">{this.props.t("createdDate")}:
                                <h6 className="d-inline-block ms-2">{new Date(this.state.user?.createdAt || "").toLocaleString()}</h6>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    Permissions = () => {
        let foundPermissions = permissions.findMulti("id", this.state.user!.permissions);
        let foundPermissionGroups = permissionGroups.findMulti("id", foundPermissions.map(permission => permission.groupId));
        foundPermissionGroups = foundPermissionGroups.filter((group, index) => foundPermissionGroups.indexOfKey("id", group.id) === index);

        const PermissionGroup = (props: IPermissionGroup) => (
            <div className="col-md-12 mt-3">
                <ComponentFieldSet legend={this.props.t(props.langKey)}>
                    <div className="permission-items">
                        {
                            foundPermissions.findMulti("groupId", props.id).map(permission =>
                                <PermissionItem {...permission}/>
                            )
                        }
                    </div>
                </ComponentFieldSet>
            </div>
        )

        const PermissionItem = (props: IPermission) => (
            <label className="badge badge-outline-info ms-1 mb-1">
                {
                    this.props.t(props.langKey)
                }
            </label>
        )

        return (
            <div className="grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="pb-1 border-bottom fw-bold text-start">{this.props.t("permissions")}</h6>
                        <div className="row">
                            {
                                foundPermissionGroups.orderBy("rank", "asc").map(group =>
                                    <PermissionGroup {...group} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    Image = () => (
        <div className="grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        {
                            this.state.isImageChanging
                                ? <ComponentSpinnerDonut customClass="profile-image-spinner"/>
                                :
                                <Image
                                    className="rounded-circle"
                                    width={150}
                                    height={150}
                                    src={ImageSourceUtil.getUploadedImageSrc(this.state.formData.image)}
                                    alt={this.props.getStateApp.sessionAuth!.user.name}
                                />

                        }
                        <button
                            className="btn btn-gradient-dark w-25 mt-3"
                            onClick={() => this.setState({isSelectionImage: true})}
                        >
                            <i className="fa fa-pencil-square-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    Content = () => (
        <div className="grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <ComponentForm
                                isActiveSaveButton={true}
                                saveButtonText={this.props.t("save")}
                                saveButtonLoadingText={this.props.t("loading")}
                                isSubmitting={this.state.isSubmitting}
                                formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                            >
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title={`${this.props.t("name")}*`}
                                            name="formData.name"
                                            type="text"
                                            required={true}
                                            value={this.state.formData.name}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title={this.props.t("comment")}
                                            name="formData.comment"
                                            type="textarea"
                                            value={this.state.formData.comment}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title={`${this.props.t("phone")}`}
                                            name="formData.phone"
                                            type="text"
                                            value={this.state.formData.phone}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title="Facebook"
                                            name="formData.facebook"
                                            type="url"
                                            value={this.state.formData.facebook}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title="Instagram"
                                            name="formData.instagram"
                                            type="url"
                                            value={this.state.formData.instagram}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ComponentFormType
                                            title="Twitter"
                                            name="formData.twitter"
                                            type="url"
                                            value={this.state.formData.twitter}
                                            onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                                        />
                                    </div>
                                </div>
                            </ComponentForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings page-profile">
                <ComponentThemeChooseImage
                    {...this.props}
                    isShow={this.state.isSelectionImage}
                    onHide={() => this.setState({isSelectionImage: false})}
                    onSelected={images => this.onChangeImage(images[0])}
                    isMulti={false}
                />
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <this.Image/>
                            </div>
                            <div className="col-md-8">
                                <this.ProfileInformation/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <this.Content/>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <this.Permissions/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
