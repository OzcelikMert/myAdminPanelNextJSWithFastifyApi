import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {
    LanguageId, PermissionGroups,
    Permissions,
    StatusId
} from "constants/index";
import {IUserModel} from "types/models/user.model";
import {IPagePropCommon} from "types/pageProps";
import imageSourceLib from "lib/imageSource.lib";
import {ThemeFieldSet} from "../form";
import {IPermission, IPermissionGroup} from "types/constants";
import Image from "next/image"
import ThemeBadgeStatus from "components/theme/badge/status";
import ThemeBadgeUserRole from "components/theme/badge/userRole";

type PageState = {};

type PageProps = {
    router: IPagePropCommon["router"];
    t: IPagePropCommon["t"];
    isShow: boolean
    onClose: any
    userInfo: IUserModel
    langId: LanguageId
};

class ThemeUsersProfileCard extends Component<PageProps, PageState> {
    SocialMedia = () => (
        <ul className="social-link list-unstyled">
            <li>
                <a href={this.props.userInfo.facebook} target="_blank">
                    <i className="mdi mdi-facebook"></i>
                </a>
            </li>
            <li>
                <a href={this.props.userInfo.twitter} target="_blank">
                    <i className="mdi mdi-twitter"></i>
                </a>
            </li>
            <li>
                <a href={this.props.userInfo.instagram} target="_blank">
                    <i className="mdi mdi-instagram"></i>
                </a>
            </li>
        </ul>
    )

    General = () => (
        <>
            <h6 className="pb-1 border-bottom fw-bold text-end">{this.props.t("general")}</h6>
            <div className="row">
                <div className="col-sm-12">
                    <span className="mb-2 fw-bold">{this.props.t("email")}:
                        <h6 className="text-muted d-inline-block ms-1">{this.props.userInfo.email}</h6>
                    </span>
                </div>
                <div className="col-sm-12">
                    <span className="mb-2 fw-bold">{this.props.t("phone")}:
                        <h6 className="text-muted d-inline-block ms-1">{this.props.userInfo.phone}</h6>
                    </span>
                </div>
                <div className="col-sm-12">
                    <span className="mb-2 fw-bold">{this.props.t("role")}:
                        <ThemeBadgeUserRole t={this.props.t} userRoleId={this.props.userInfo.roleId} />
                    </span>
                </div>
                <div className="col-sm-12">
                    <span className="mb-2 fw-bold">{this.props.t("status")}:
                        {<ThemeBadgeStatus t={this.props.t} statusId={this.props.userInfo.statusId} className="ms-1"/>}
                    </span>
                </div>
                {
                    (this.props.userInfo.statusId == StatusId.Banned)
                        ? (
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <p className="mb-2 fw-bold">{this.props.t("banDateEnd")}:
                                            <h6 className="text-muted d-inline-block ms-1">{new Date(this.props.userInfo.banDateEnd || "").toLocaleDateString() || ""}</h6>
                                        </p>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="mb-2 fw-bold">{this.props.t("banComment")}:
                                            <h6 className="text-muted d-inline-block ms-1">{this.props.userInfo.banComment}</h6>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : null
                }
                <div className="col-sm-12">
                    <span className="mb-2 fw-bold">{this.props.t("comment")}:
                        <small className="fw-bold ms-1 text-muted">{this.props.userInfo.comment}</small>
                    </span>
                </div>
            </div>
        </>
    )

    Permissions = () => {
        let permissions = Permissions.findMulti("id", this.props.userInfo.permissions);
        let permissionGroups = PermissionGroups.findMulti("id", permissions.map(permission => permission.groupId));
        permissionGroups = permissionGroups.filter((group, index) => permissionGroups.indexOfKey("id", group.id) === index);

        const PermissionGroup = (props: IPermissionGroup) => (
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

        const PermissionItem = (props: IPermission) => (
            <div className="col-3 mt-2">
                <label className="badge badge-outline-info ms-1 mb-1">
                    {
                        this.props.t(props.langKey)
                    }
                </label>
            </div>
        )

        return (
            <>
                <h6 className="pb-1 border-bottom fw-bold text-end">{this.props.t("permissions")}</h6>
                <div className="row">
                    {
                        permissionGroups.orderBy("rank", "asc").map(group =>
                            <PermissionGroup {...group} />
                        )
                    }
                </div>
            </>
        )
    }

    render() {
        return (
            <Modal
                size="lg"
                centered
                show={this.props.isShow}
                backdrop={true}
                onHide={this.props.onClose}
            >
                <Modal.Body className="m-0 p-0">
                    <div className="card user-card">
                        <div className="row ms-0 me-0 user-card-body">
                            <div className="col-sm-4 user-profile bg-gradient-primary">
                                <h5 className="exit-icon" onClick={this.props.onClose}>
                                    <i className="mdi mdi-close"></i>
                                </h5>
                                <div className="card-block text-center text-light mt-5">
                                    <div className="mb-4">
                                        <Image
                                            src={imageSourceLib.getUploadedImageSrc(this.props.userInfo.image)}
                                            className="user-img img-fluid"
                                            alt={this.props.userInfo.name}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <h4 className="fw-bold pt-3">{this.props.userInfo.name}</h4>
                                    <this.SocialMedia/>
                                </div>
                            </div>
                            <div className="col-sm-8 position-relative card-profile-title">
                                <div className="p-2">
                                    <this.General/>
                                    <this.Permissions/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ThemeUsersProfileCard;