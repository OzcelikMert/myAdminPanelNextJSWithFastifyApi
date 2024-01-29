import React, {Component} from 'react';
import {ThemeFormLoadingButton,  ThemeFormType} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import {Modal} from "react-bootstrap";
import {PagePropCommonDocument} from "types/pageProps";

type PageState = {
    newRank: number
    isSubmitting: boolean
};

type PageProps = {
    t: PagePropCommonDocument["t"]
    isShow: boolean
    onHide: () => void
    onSubmit: (rank: number) => Promise<void>
    rank?: number
    title?: string
};

export default class ThemeModalUpdateItemRank extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            newRank: this.props.rank ?? 0,
            isSubmitting: false
        }
    }

    componentDidUpdate(prevProps: Readonly<PageProps>) {
        if(this.props.isShow && prevProps.isShow !== this.props.isShow){
            this.setState({
                newRank: this.props.rank ?? 0
            })
        }
    }

    async onSubmit() {
        this.setState({
            isSubmitting: !this.state.isSubmitting
        }, async () => {
            await this.props.onSubmit(this.state.newRank);
            this.setState({isSubmitting: false}, () => {
                this.props.onHide();
            })
        })
    }

    render() {
        return (
            <Modal
                className="form-modal"
                size="lg"
                centered
                show={this.props.isShow}
            >
                <Modal.Header
                    className="border-bottom-0">
                    <div className="w-100 text-end">
                        <button className="btn btn-gradient-dark" onClick={() => this.props.onHide()}>
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body className="m-0 p-0">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="text-center">{this.props.t("rank")} {this.props.title ? `(${this.props.title})` : ""}</h4>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <ThemeFormType
                                        title={`${this.props.t("rank")}`}
                                        name="newRank"
                                        type="number"
                                        required={true}
                                        value={this.state.newRank}
                                        onChange={e => HandleForm.onChangeInput(e, this)}
                                    />
                                </div>
                                <div className="col-md-12 mt-4 text-end submit">
                                    {
                                        this.state.isSubmitting
                                            ? <ThemeFormLoadingButton text={this.props.t("loading")} />
                                            : <button type={"button"} className="btn btn-gradient-success" onClick={() => this.onSubmit()}>
                                                {this.props.t("update")}
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}