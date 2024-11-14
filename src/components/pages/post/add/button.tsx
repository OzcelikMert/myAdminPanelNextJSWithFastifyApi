import React, { Component } from 'react';
import PagePostAdd, {
  IPageState as PostPageState,
} from '@pages/post/[postTypeId]/add';
import {
  ComponentFieldSet,
  ComponentFormType,
} from '@components/elements/form';
import { IPostContentButtonModel } from 'types/models/post.model';

type IPageState = {};

type IPageProps = {
  page: PagePostAdd;
};

export default class ComponentPagePostAddButton extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  onChange(key: keyof IPostContentButtonModel, value: string, index: number) {
    this.props.page.setState((state: PostPageState) => {
      if (state.formData.contents.buttons)
        state.formData.contents.buttons[index][key] = value;
      return state;
    });
  }

  onAddNew() {
    this.props.page.setState((state: PostPageState) => {
      if (typeof state.formData.contents.buttons === 'undefined')
        state.formData.contents.buttons = [];
      state.formData.contents.buttons.push({
        title: '',
        url: '',
      });
      return state;
    });
  }

  onDelete(index: number) {
    this.props.page.setState((state: PostPageState) => {
      if (state.formData.contents.buttons)
        state.formData.contents.buttons.remove(index);
      return state;
    });
  }

  Button = (props: { propButton: IPostContentButtonModel; index: number }) => {
    return (
      <div className="col-md-12 mt-4">
        <ComponentFieldSet
          legend={`${this.props.page.props.t('button')}#${props.index + 1}`}
          legendElement={
            <i
              className="mdi mdi-trash-can text-danger fs-3 cursor-pointer"
              onClick={() => this.onDelete(props.index)}
            ></i>
          }
        >
          <div className="row mt-2">
            <div className="col-md-6">
              <ComponentFormType
                type={'text'}
                title={this.props.page.props.t('title')}
                value={props.propButton.title}
                onChange={(e) =>
                  this.onChange('title', e.target.value, props.index)
                }
              />
            </div>
            <div className="col-md-6 mt-3 mt-lg-0">
              <ComponentFormType
                type={'text'}
                title={this.props.page.props.t('url')}
                value={props.propButton.url}
                onChange={(e) =>
                  this.onChange('url', e.target.value, props.index)
                }
              />
            </div>
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

  render() {
    return (
      <div className="grid-margin stretch-card">
        <div className="card">
          <div className="card-header text-center pt-3">
            <h4>{this.props.page.props.t('buttons')}</h4>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-7">
                <button
                  type={'button'}
                  className="btn btn-gradient-success btn-lg"
                  onClick={() => this.onAddNew()}
                >
                  + {this.props.page.props.t('newButton')}
                </button>
              </div>
              <div className="col-md-7 mt-2">
                <div className="row">
                  {this.props.page.state.formData.contents.buttons?.map(
                    (button, index) => {
                      return <this.Button propButton={button} index={index} />;
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
