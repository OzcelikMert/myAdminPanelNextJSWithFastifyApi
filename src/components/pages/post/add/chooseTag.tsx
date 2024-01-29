import React, {Component} from 'react';
import PagePostAdd from "pages/post/[postTypeId]/add";
import {ThemeFormLoadingButton, ThemeFormSelect, ThemeFormType} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import {Modal} from "react-bootstrap";
import postTermService from "services/postTerm.service";
import {PostTermTypeId} from "constants/postTermTypes";
import {StatusId} from "constants/status";
import ThemeToast from "components/theme/toast";

type PageState = {
    isShowModal: boolean
    newItemTitle: string
    isSubmitting: boolean
};

type PageProps = {
    page: PagePostAdd
};

export default class ComponentPagePostAddChooseTag extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isShowModal: false,
            newItemTitle: "",
            isSubmitting: false
        }
    }

    async onAddNew() {
        this.setState({
            isSubmitting: !this.state.isSubmitting
        }, async () => {
            let resData = await postTermService.add({
                typeId: PostTermTypeId.Tag,
                postTypeId: this.props.page.state.formData.typeId,
                statusId: StatusId.Active,
                rank: 0,
                contents: {
                    langId: this.props.page.state.formData.contents.langId,
                    title: this.state.newItemTitle
                }
            });

            if(resData.status){
                if(resData.data){
                    this.props.page.setState({
                        tags: [
                            {value: resData.data._id, label: this.state.newItemTitle},
                            ...this.props.page.state.tags
                        ]
                    }, () => {
                        this.setState({
                            newItemTitle: ""
                        })
                        new ThemeToast({
                            type: "success",
                            title: this.props.page.props.t("successful"),
                            content: `'${this.state.newItemTitle}' ${this.props.page.props.t("itemAdded")}`,
                            timeOut: 3
                        })
                    })
                }
            }

            this.setState({isSubmitting: false})
        })
    }

    Modal = () => {
        return (<Modal
            className="form-modal"
            size="lg"
            centered
            show={this.state.isShowModal}
        >
            <Modal.Header
                className="border-bottom-0">
                <div className="w-100 text-end">
                    <button className="btn btn-gradient-dark" onClick={() => this.setState({isShowModal: false})}><i
                        className="fa fa-close"></i></button>
                </div>
            </Modal.Header>
            <Modal.Body className="m-0 p-0">
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-center">{this.props.page.props.t("tag")}</h4>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <ThemeFormType
                                    title={`${this.props.page.props.t("title")}*`}
                                    name="newItemTitle"
                                    type="text"
                                    required={true}
                                    value={this.state.newItemTitle}
                                    onChange={e => HandleForm.onChangeInput(e, this)}
                                />
                            </div>
                            <div className="col-md-12 mt-4 text-end submit">
                                {
                                    this.state.isSubmitting
                                        ? <ThemeFormLoadingButton text={this.props.page.props.t("loading")} />
                                        : <button type={"button"} className="btn btn-gradient-success"
                                                 onClick={() => this.onAddNew()}>
                                            <i className="mdi mdi-plus"></i> {this.props.page.props.t("add")}
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>)
    }

    render() {
        return (
            <div>
                <this.Modal />
                <div className="row">
                    <div className="col-md-10">
                        <ThemeFormSelect
                            title={this.props.page.props.t("tag")}
                            name="formData.tags"
                            placeholder={this.props.page.props.t("chooseTag").toCapitalizeCase()}
                            isMulti
                            closeMenuOnSelect={false}
                            options={this.props.page.state.tags}
                            value={this.props.page.state.tags?.filter(item => this.props.page.state.formData.tags?.includes(item.value))}
                            onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item, this.props.page)}
                        />
                    </div>
                    <div className="col-md-2 mt-2 m-md-auto text-end text-md-center">
                        <button type={"button"} className="btn btn-gradient-success btn-lg"
                                onClick={() => this.setState({isShowModal: true})}>
                            <i className="mdi mdi-plus"></i> {this.props.page.props.t("addNew")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}