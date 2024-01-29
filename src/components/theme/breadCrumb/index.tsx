import React, {Component} from 'react'
import Link from "next/link";
import PagePaths from "constants/pagePaths";

type PageState = {};

type PageProps = {
    breadCrumbs: string[]
};

export default class ThemeBreadCrumb extends Component<PageProps, PageState> {
    render() {
        return (
            <h3 className="page-title">
                <Link href={PagePaths.dashboard()}>
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <i className="mdi mdi-home"></i>
                    </span>
                </Link>
                {
                    this.props.breadCrumbs.map((breadCrumbTitle, index) => (
                        <span>
                            <label className="badge badge-gradient-dark ms-2">{breadCrumbTitle}</label>
                            {
                                this.props.breadCrumbs.length != (index + 1)
                                    ? <label className="badge badge-gradient-primary ms-2"><i className="mdi mdi-arrow-right"></i></label>
                                    : null
                            }
                        </span>
                    ))
                }
            </h3>
        )
    }
}
