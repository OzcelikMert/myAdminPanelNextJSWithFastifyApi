import { ReactNode } from 'react';
import { toast, Id, ToastOptions, ToastContent } from 'react-toastify';
import React from 'react';

type IPageProps = {
  type?: 'warning' | 'error' | 'success' | 'info' | 'loading';
  borderColor?: IPageProps['type'];
  content: ReactNode | string;
  title?: string;
  position?: ToastOptions['position'];
  timeOut?: number;
};

export default class ComponentToast {
  private toast: null | Id = null;
  private readonly options: ToastOptions<{}>;
  private readonly content: ToastContent<any>;
  private props: IPageProps;
  public isShow: boolean;

  constructor(props: IPageProps) {
    this.props = props;
    this.options = {
      position: props.position ?? 'top-right',
      autoClose: props.timeOut
        ? Number(props.timeOut) * 1000
        : props.type === 'loading' || typeof props.type === 'undefined'
          ? false
          : 4000,
      draggable:
        !!props.timeOut ||
        (typeof props.type !== 'undefined' && props.type !== 'loading'),
      hideProgressBar: false,
      progress: undefined,
      pauseOnHover: true,
      closeOnClick:
        !!props.timeOut ||
        (typeof props.type !== 'undefined' && props.type !== 'loading'),
      closeButton: false,
      className: 'theme-toast',
      ...(props.borderColor
        ? {
            style: {
              border: 0,
              borderColor: this.getColor,
              borderStyle: 'solid',
              borderTopWidth: 2,
            },
          }
        : {}),
    };
    this.content = this.Content();
    this.isShow = true;
    this.init();
  }

  private get getColor(): string | undefined {
    let color;

    switch (this.props.borderColor) {
      case 'success':
        color = '#1bcfb4';
        break;
      case 'info':
        color = '#198ae3';
        break;
      case 'warning':
        color = '#fed713';
        break;
      case 'error':
        color = '#fe7c96';
        break;
      case 'loading':
        color = '#d8d8d8';
        break;
      default:
        color = undefined;
        break;
    }

    return color;
  }

  private Content() {
    return (
      <div>
        {this.props.title ? (
          <b className="d-block">{this.props.title}</b>
        ) : null}
        {React.isValidElement(this.props.content) ? (
          this.props.content
        ) : (
          <small>{this.props.content}</small>
        )}
      </div>
    );
  }

  private init() {
    switch (this.props.type) {
      case 'success':
        this.toast = toast.success(this.content, this.options);
        break;
      case 'info':
        this.toast = toast.info(this.content, this.options);

        break;
      case 'warning':
        this.toast = toast.warn(this.content, this.options);

        break;
      case 'error':
        this.toast = toast.error(this.content, this.options);

        break;
      case 'loading':
        this.toast = toast.loading(this.content, this.options);
        break;
      default:
        this.toast = toast(this.content, this.options);
        break;
    }
  }

  hide() {
    if (this.toast && toast.isActive(this.toast)) {
      this.isShow = false;
      toast.dismiss(this.toast);
    }
  }
}
