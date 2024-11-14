import React, { Component } from 'react';
import PagePostAdd, {
  IPageState as PostPageState,
} from '@pages/post/[postTypeId]/add';
import { ComponentFormSelect } from '@components/elements/form';
import { EndPoints } from '@constants/endPoints';
import { PermissionUtil } from '@utils/permission.util';
import { ComponentEndPointPermission } from '@constants/endPointPermissions/component.endPoint.permission';

type IPageState = {};

type IPageProps = {
  page: PagePostAdd;
};

export default class ComponentPagePostAddComponent extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  onChangeSelect(value: string, index: number) {
    this.props.page.setState((state: PostPageState) => {
      if (state.formData.components) state.formData.components[index] = value;
      return state;
    });
  }

  onAddNew() {
    this.props.page.setState((state: PostPageState) => {
      if (typeof state.formData.components === 'undefined')
        state.formData.components = [];
      state.formData.components.push('');
      return state;
    });
  }

  onDelete(index: number) {
    this.props.page.setState((state: PostPageState) => {
      if (state.formData.components) state.formData.components.remove(index);
      return state;
    });
  }

  onEdit(index: number) {
    this.props.page.setState((state: PostPageState) => {
      if (state.formData.components) state.formData.components.remove(index);
      return state;
    });
  }

  Component = (_id: string, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <div className="row">
          <div className="col-md-9">
            <ComponentFormSelect
              title={this.props.page.props.t('component')}
              options={this.props.page.state.components}
              value={this.props.page.state.components?.filter(
                (item) => item.value == _id
              )}
              onChange={(item: any, e) =>
                this.onChangeSelect(item.value, index)
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <div className="row">
              <div className="col-6">
                {_id &&
                PermissionUtil.check(
                  this.props.page.props.getStateApp.sessionAuth!,
                  ComponentEndPointPermission.UPDATE
                ) ? (
                  <a
                    href={EndPoints.COMPONENT_WITH.EDIT(_id)}
                    target="_blank"
                    className="btn btn-gradient-warning btn-lg"
                    rel="noreferrer"
                  >
                    <i className="fa fa-pencil-square-o"></i>
                  </a>
                ) : null}
              </div>
              <div className="col-6 text-end">
                <button
                  type="button"
                  className="btn btn-gradient-danger btn-lg"
                  onClick={(event) => this.onDelete(index)}
                >
                  <i className="mdi mdi-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="grid-margin stretch-card">
        <div className="card">
          <div className="card-header text-center pt-3">
            <h4>{this.props.page.props.t('components')}</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7 mt-2">
                <div className="row">
                  {this.props.page.state.formData.components?.map(
                    (componentId, index) => {
                      return this.Component(componentId, index);
                    }
                  )}
                  <div
                    className={`col-md-7 text-start ${(this.props.page.state.formData.components?.length ?? 0) > 0 ? 'mt-4' : ''}`}
                  >
                    <button
                      type={'button'}
                      className="btn btn-gradient-success btn-lg"
                      onClick={() => this.onAddNew()}
                    >
                      + {this.props.page.props.t('addNew')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
