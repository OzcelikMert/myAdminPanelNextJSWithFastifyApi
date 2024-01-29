import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";

export interface ThemeToggleMenuItemDocument {
    label: any
    value: any
    className?: string
    icon?: string
}

type PageState = {};

type PageProps = {
    items: ThemeToggleMenuItemDocument[]
    onChange: (value: any) => void
    label?: string | any
};

class ThemeTableToggleMenu extends Component<PageProps, PageState> {
    render() {
        return (
            <Dropdown align={"end"} className="theme-table-toggle">
                <Dropdown.Toggle className="theme-table-toggle-btn p-0">
                    {
                        this.props.label ?? <i className="mdi mdi-dots-horizontal"></i>
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu className="theme-table-toggle-menu">
                    {
                        this.props.items.map((item, index) => {
                                return (
                                    <Dropdown.Item className={`${item.className ?? ""}`} onClick={(event) => this.props.onChange(item.value)} key={index}>
                                        {
                                            item.icon
                                                ? <i className={`${item.icon} me-2`}></i>
                                                : null
                                        }
                                        {item.label}
                                    </Dropdown.Item>
                                )
                            }
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default ThemeTableToggleMenu;