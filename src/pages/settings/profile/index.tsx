import React, {Component, FormEvent} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeFieldSet, ThemeForm, ThemeFormType} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import {
    PermissionGroups,
    Permissions,
    UserRoles
} from "constants/index";
import ThemeChooseImage from "components/theme/chooseImage";
import userService from "services/user.service";
import profileService from "services/profile.service";
import imageSourceLib from "lib/imageSource.lib";
import ThemeToast from "components/theme/toast";
import {PermissionDocument, PermissionGroupDocument} from "types/constants";
import {ProfileUpdateParamDocument} from "types/services/profile";
import Image from "next/image"
import ThemeBadgeStatus from "components/theme/badge/status";
import ThemeBadgeUserRole from "components/theme/badge/userRole";

type PageState = {
    isSubmitting: boolean
    isImageChanging: boolean
    isSelectionImage: boolean
    data: {
        email: string
        roleId: number
        statusId: number
        permissions: number[]
    }
    formData: ProfileUpdateParamDocument
};

type PageProps = {} & PagePropCommonDocument;

export default class PageSettingsProfile extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            isImageChanging: false,
            isSelectionImage: false,
            data: {
                email: "",
                roleId: 0,
                statusId: 0,
                permissions: []
            },
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
        this.setPageTitle();
        await this.getUser();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("profile")])
    }

    async getUser() {
        let resData = await userService.getOne({_id: this.props.getStateApp.sessionData.id});
        if (resData.status && resData.data) {
            const user = resData.data;
            this.setState((state: PageState) => {
                state.data = {
                    email: user.email,
                    roleId: user.roleId,
                    statusId: user.statusId,
                    permissions: user.permissions
                };

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
            })
        }
    }

    onChangeImage(image: string) {
        this.setState({
            isSubmitting: true,
            isImageChanging: true
        }, async () => {
            let resData = await profileService.update({image: image});
            this.setState((state: PageState) => {
                state.isSubmitting = false;
                state.isImageChanging = false;
                state.formData.image = image;
                return state;
            }, () => {
                this.props.setStateApp({
                    sessionData: {
                        image: image
                    }
                })
            });
        })
        this.setState((state: PageState) => {
            state.formData.image = image;
            return state
        })
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await profileService.update(this.state.formData);
            if (resData.status) {
                this.props.setStateApp({
                    sessionData: {
                        name: this.state.formData.name
                    }
                }, () => {
                    new ThemeToast({
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
                        <div className="col-sm-12">
                            <span className="mb-2 fw-bold">{this.props.t("email")}:
                                <h6 className="text-muted d-inline-block ms-1">{this.state.data.email}</h6>
                            </span>
                        </div>
                        <div className="col-sm-12">
                            <span className="mb-2 fw-bold">{this.props.t("role")}:
                                <ThemeBadgeUserRole t={this.props.t} userRoleId={this.state.data.roleId} />
                            </span>
                        </div>
                        <div className="col-sm-12">
                            <span className="mb-2 fw-bold">{this.props.t("status")}:
                                <ThemeBadgeStatus t={this.props.t} statusId={this.state.data.statusId} className="ms-1" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    Permissions = () => {
        let permissions = Permissions.findMulti("id", this.state.data.permissions);
        let permissionGroups = PermissionGroups.findMulti("id", permissions.map(permission => permission.groupId));
        permissionGroups = permissionGroups.filter((group, index) => permissionGroups.indexOfKey("id", group.id) === index);

        const PermissionGroup = (props: PermissionGroupDocument) => (
            <div className="col-md-12 mt-3">
                <ThemeFieldSet legend={this.props.t(props.langKey)}>
                    <div className="row">
                        {
                            permissions.findMulti("groupId", props.id).map(permission =>
                                <PermissionItem {...permission}/>
                            )
                        }
                    </div>
                </ThemeFieldSet>
            </div>
        )

        const PermissionItem = (props: PermissionDocument) => (
            <div className="col-3 mt-2">
                <label className="badge badge-outline-info ms-1 mb-1">
                    {
                        this.props.t(props.langKey)
                    }
                </label>
            </div>
        )

        return (
            <div className="grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="pb-1 border-bottom fw-bold text-start">Permissions</h6>
                        <div className="row">
                            {
                                permissionGroups.orderBy("rank", "asc").map(group =>
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
                    {
                        this.state.isImageChanging
                            ? null
                            : <div className="d-flex flex-column align-items-center text-center">
                                <Image
                                    className="rounded-circle img-fluid"
                                    width={200}
                                    height={200}
                                    src={imageSourceLib.getUploadedImageSrc(this.state.formData.image)}
                                    alt={this.props.getStateApp.sessionData.name}
                                />
                                <button
                                    className="btn btn-gradient-dark w-25 mt-2"
                                    onClick={() => this.setState({isSelectionImage: true})}
                                >
                                    <i className="fa fa-pencil-square-o"></i>
                                </button>
                            </div>
                    }
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
                            <ThemeForm
                                isActiveSaveButton={true}
                                saveButtonText={this.props.t("save")}
                                saveButtonLoadingText={this.props.t("loading")}
                                isSubmitting={this.state.isSubmitting}
                                formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                            >
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title={`${this.props.t("name")}*`}
                                            name="formData.name"
                                            type="text"
                                            required={true}
                                            value={this.state.formData.name}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title={this.props.t("comment")}
                                            name="formData.comment"
                                            type="textarea"
                                            value={this.state.formData.comment}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title={`${this.props.t("phone")}`}
                                            name="formData.phone"
                                            type="text"
                                            value={this.state.formData.phone}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title="Facebook"
                                            name="formData.facebook"
                                            type="url"
                                            value={this.state.formData.facebook}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title="Instagram"
                                            name="formData.instagram"
                                            type="url"
                                            value={this.state.formData.instagram}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <ThemeFormType
                                            title="Twitter"
                                            name="formData.twitter"
                                            type="url"
                                            value={this.state.formData.twitter}
                                            onChange={e => HandleForm.onChangeInput(e, this)}
                                        />
                                    </div>
                                </div>
                            </ThemeForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings">
                <ThemeChooseImage
                    {...this.props}
                    isShow={this.state.isSelectionImage}
                    onHide={() => this.setState({isSelectionImage: false})}
                    onSelected={images => this.onChangeImage(images[0])}
                    isMulti={false}
                />
                <div className="row">
                    <div className="col-md-3">
                        <this.Image/>
                    </div>
                    <div className="col-md-5">
                        <this.Content/>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <this.ProfileInformation/>
                            </div>
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
