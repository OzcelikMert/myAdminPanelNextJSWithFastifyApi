import React, { Component } from 'react';
import ComponentFormSelect from './input/select';
import ComponentFormTags from './input/tags';
import ComponentFormType from './input/type';
import ComponentFormCheckBox from './input/checkbox';
import ComponentFormLoadingButton from './button/loadingButton';
import ComponentFieldSet from '../fieldSet';

type IPageState = {};

type IPageProps = {
  isActiveSaveButton?: boolean;
  saveButtonText?: string;
  saveButtonLoadingText?: string;
  saveButtonClassName?: string;
  isSubmitting?: boolean;
  formAttributes?: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  children: any;
  enterToSubmit?: true;
};

class ComponentForm extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
  }

  onKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (!this.props.enterToSubmit && event.key === 'Enter')
      event.preventDefault();
  }

  render() {
    return (
      <form
        className="theme-form"
        {...this.props.formAttributes}
        onKeyDown={(event) => this.onKeyDown(event)}
      >
        {this.props.children}
        <div className="submit-btn-div text-end mb-4">
          {this.props.isActiveSaveButton ? (
            !this.props.isSubmitting ? (
              <button
                type={'submit'}
                className={`btn btn-gradient-success btn-save ${this.props.saveButtonClassName ?? ''}`}
              >
                {this.props.saveButtonText}
              </button>
            ) : (
              <ComponentFormLoadingButton
                text={this.props.saveButtonLoadingText}
              />
            )
          ) : null}
        </div>
      </form>
    );
  }
}

export {
  ComponentForm,
  ComponentFormSelect,
  ComponentFormTags,
  ComponentFormType,
  ComponentFormCheckBox,
  ComponentFormLoadingButton,
  ComponentFieldSet,
};
