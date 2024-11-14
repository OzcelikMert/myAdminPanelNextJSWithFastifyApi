import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { IUserModel } from 'types/models/user.model';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentFieldSet } from '../../elements/form';
import Image from 'next/image';
import ComponentThemeBadgeStatus from '@components/theme/badge/status';
import ComponentThemeBadgeUserRole from '@components/theme/badge/userRole';
import { StatusId } from '@constants/status';
import { IPermissionGroup } from 'types/constants/permissionGroups';
import { permissions } from '@constants/permissions';
import { permissionGroups } from '@constants/permissionGroups';
import { IPermission } from 'types/constants/permissions';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { PermissionUtil } from '@utils/permission.util';

type IPageState = {};

type IPageProps = {
  isShow: boolean;
  onClose: any;
  userInfo: IUserModel;
} & IPagePropCommon;

class ComponentThemeUsersProfileCard extends Component<IPageProps, IPageState> {
  SocialMedia = () => (
    <ul className="social-link list-unstyled">
      <li>
        <a href={this.props.userInfo.facebook} target="_blank" rel="noreferrer">
          <i className="mdi mdi-facebook"></i>
        </a>
      </li>
      <li>
        <a href={this.props.userInfo.twitter} target="_blank" rel="noreferrer">
          <i className="mdi mdi-twitter"></i>
        </a>
      </li>
      <li>
        <a
          href={this.props.userInfo.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <i className="mdi mdi-instagram"></i>
        </a>
      </li>
    </ul>
  );

  General = () => (
    <div className="general">
      <h6 className="pb-1 border-bottom fw-bold text-end">
        {this.props.t('general')}
      </h6>
      <div className="row">
        <div className="col-sm-12 mb-3">
          <span className="fw-bold">
            {this.props.t('email')}:
            <h6 className="text-muted d-inline-block ms-1">
              {this.props.userInfo.email}
            </h6>
          </span>
        </div>
        <div className="col-sm-12 mb-3">
          <span className="fw-bold">
            {this.props.t('phone')}:
            <h6 className="text-muted d-inline-block ms-1">
              {this.props.userInfo.phone || '---'}
            </h6>
          </span>
        </div>
        <div className="col-sm-12 mb-3">
          <span className="fw-bold">
            {this.props.t('role')}:
            <ComponentThemeBadgeUserRole
              t={this.props.t}
              userRoleId={this.props.userInfo.roleId}
              className="ms-1"
            />
          </span>
        </div>
        <div className="col-sm-12 mb-3">
          <span className="fw-bold">
            {this.props.t('status')}:
            {
              <ComponentThemeBadgeStatus
                t={this.props.t}
                statusId={this.props.userInfo.statusId}
                className="ms-1"
              />
            }
          </span>
        </div>
        {this.props.userInfo.statusId == StatusId.Banned ? (
          <div className="col-sm-12 mb-3">
            <div className="row">
              <div className="col-sm-12 mb-3">
                <p className="fw-bold">
                  {this.props.t('banDateEnd')}:
                  <h6 className="text-muted d-inline-block ms-1">
                    {new Date(
                      this.props.userInfo.banDateEnd || ''
                    ).toLocaleDateString() || ''}
                  </h6>
                </p>
              </div>
              <div className="col-sm-12 mb-3">
                <p className="fw-bold">
                  {this.props.t('banComment')}:
                  <h6 className="text-muted d-inline-block ms-1">
                    {this.props.userInfo.banComment || '---'}
                  </h6>
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="col-sm-12">
          <span className="fw-bold">
            {this.props.t('comment')}:
            <small className="fw-bold ms-1 text-muted">
              {this.props.userInfo.comment || '---'}
            </small>
          </span>
        </div>
      </div>
    </div>
  );

  Permissions = () => {
    const foundPermissions = permissions.findMulti(
      'id',
      this.props.userInfo.permissions
    );
    let foundPermissionGroups = permissionGroups.findMulti(
      'id',
      foundPermissions.map((permission) => permission.groupId)
    );
    foundPermissionGroups = foundPermissionGroups.filter(
      (group, index) =>
        foundPermissionGroups.indexOfKey('id', group.id) === index
    );

    const PermissionGroup = (props: IPermissionGroup) => (
      <div className="col-md-12 mt-3">
        <ComponentFieldSet legend={this.props.t(props.langKey)}>
          <div className="row">
            {foundPermissions
              .findMulti('groupId', props.id)
              .map((permission) => (
                <PermissionItem {...permission} />
              ))}
          </div>
        </ComponentFieldSet>
      </div>
    );

    const PermissionItem = (props: IPermission) => (
      <div className="col-3 mt-2">
        <label className="badge badge-outline-info ms-1 mb-1">
          {this.props.t(props.langKey)}
        </label>
      </div>
    );

    return (
      <div className="permissions">
        <h6 className="pb-1 border-bottom fw-bold text-end">
          {this.props.t('permissions')}
        </h6>
        <div className="row">
          {foundPermissionGroups.orderBy('rank', 'asc').map((group) => (
            <PermissionGroup {...group} />
          ))}
        </div>
      </div>
    );
  };

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
                      src={ImageSourceUtil.getUploadedImageSrc(
                        this.props.userInfo.image
                      )}
                      className="user-img img-fluid"
                      alt={this.props.userInfo.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <h4 className="fw-bold pt-3">{this.props.userInfo.name}</h4>
                  <this.SocialMedia />
                </div>
              </div>
              <div className="col-sm-8 position-relative card-profile-title">
                <div className="p-2">
                  <this.General />
                  {PermissionUtil.checkPermissionRoleRank(
                    this.props.getStateApp.sessionAuth!.user.roleId,
                    this.props.userInfo.roleId,
                    true
                  ) ? (
                    <this.Permissions />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ComponentThemeUsersProfileCard;
