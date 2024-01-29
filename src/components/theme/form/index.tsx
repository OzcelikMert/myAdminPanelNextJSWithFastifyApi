import React, {Component} from "react";
import ThemeFormSelect from "./input/select";
import ThemeFormTags from "./input/tags";
import ThemeFormType from "./input/type";
import ThemeFormCheckBox from "./input/checkbox";
import ThemeFormLoadingButton from "./button/loadingButton";
import ThemeFieldSet from "../fieldSet";

type PageState = {};

type PageProps = {
    isActiveSaveButton?: boolean
    saveButtonText?: string
    saveButtonLoadingText?: string
    saveButtonClassName?: string
    isSubmitting?: boolean,
    formAttributes?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    children: any
    enterToSubmit?: true
};

class ThemeForm extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    onKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
        if (!this.props.enterToSubmit && event.key === "Enter") event.preventDefault();
    }

    render() {
        return (
            <form className="theme-form" {...this.props.formAttributes} onKeyDown={(event) => this.onKeyDown(event)}>
                {this.props.children}
                <div className="submit-btn-div text-end mb-4">
                    {
                        this.props.isActiveSaveButton ?
                            !this.props.isSubmitting
                                ? <button
                                    type={"submit"}
                                    className={`btn btn-gradient-success btn-save ${this.props.saveButtonClassName ?? ""}`}
                                >
                                    {this.props.saveButtonText}
                                </button>
                                : <ThemeFormLoadingButton text={this.props.saveButtonLoadingText}/>
                            : null
                    }
                </div>
            </form>
        )
    }
}

export {
    ThemeForm,
    ThemeFormSelect,
    ThemeFormTags,
    ThemeFormType,
    ThemeFormCheckBox,
    ThemeFormLoadingButton,
    ThemeFieldSet
}