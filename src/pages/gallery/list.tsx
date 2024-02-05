import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import Swal from "sweetalert2";
import galleryService from "services/gallery.service";
import {TableColumn} from "react-data-table-component";
import imageSourceLib from "lib/imageSource.lib";
import ThemeToast from "components/theme/toast";
import permissionLib from "lib/permission.lib";
import {PermissionId} from "constants/index";
import ThemeDataTable from "components/theme/table/dataTable";
import Image from "next/image"
import GalleryDocument from "types/services/gallery.service";

type PageState = {
    items: GalleryDocument[]
    showingItems: GalleryDocument[]
    selectedItems: string[]
    selectedItemIndex: number
    searchKey: string
};

type PageProps = {
    isModal?: boolean
    isMulti?: boolean
    onSubmit?: (images: string[]) => void
    uploadedImages?: GalleryDocument[]
    selectedImages?: string[]
} & PagePropCommonDocument;

export default class PageGalleryList extends Component<PageProps, PageState> {
    toast: null | ThemeToast = null;
    listPage: number = 0;
    listPagePerCount: number = 10;
    constructor(props: PageProps) {
        super(props);
        this.state = {
            items: [],
            showingItems: [],
            selectedItems: [],
            selectedItemIndex: 0,
            searchKey: "",
        }
    }

    async componentDidMount() {
        this.setPageTitle()
        await this.getItems();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    componentWillUnmount() {
        this.toast?.hide();
    }

    componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<PageState>) {
        if (
            this.props.uploadedImages &&
            JSON.stringify(this.props.uploadedImages) !== JSON.stringify(prevProps.uploadedImages)
        ) {
            this.setListSort(this.state.items.concat(this.props.uploadedImages || []));
        }
    }

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("gallery"),
            this.props.t("list")
        ])
    }

    async getItems() {
        let resData = await galleryService.get();
        if (resData.status) {
            if (Array.isArray(resData.data)) {
                this.setListSort(resData.data);
            }
        }
    }

    setListSort(items: GalleryDocument[]) {
        items = items.orderBy("createdAt", "desc");
        this.setState((state: PageState) => {
            if (this.props.selectedImages && this.props.selectedImages.length > 0) {
                state.selectedItems = state.selectedItems.concat(this.props.selectedImages);
                items.sort((a, b) => {
                    if (this.props.selectedImages?.includes(a.name)) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            }
            state.items = items;
            return state;
        }, () => {
            this.onSearch(this.state.searchKey)
        })
    }

    onSelect(images: string[]) {
        if(!this.props.isModal && !permissionLib.checkPermission(
            this.props.getStateApp.sessionData.roleId,
            this.props.getStateApp.sessionData.permissions,
            PermissionId.GalleryEdit
        )) return;

        this.setState({
            selectedItems: images
        }, () => {
            if (this.state.selectedItems.length > 0) {
                if (!this.toast || !this.toast.isShow) {
                    this.toast = new ThemeToast({
                        content: (
                            (this.props.isModal)
                                ? <button type="button" className="btn btn-gradient-success btn-icon-text w-100"
                                          onClick={() => this.onSubmit()}>
                                    <i className="mdi mdi-check btn-icon-prepend"></i> {this.props.t("okay")}
                                </button>
                                : <button type="button" className="btn btn-gradient-danger btn-icon-text w-100"
                                          onClick={() => this.onDelete()}>
                                    <i className="mdi mdi-trash-can btn-icon-prepend"></i> {this.props.t("delete")}
                                </button>
                        ),
                        borderColor: this.props.isModal ? "success" : "error",
                        position: "bottom-center"
                    })
                }
            } else {
                this.toast?.hide();
            }
        })
    }

    async onDelete() {
        let result = await Swal.fire({
            title: this.props.t("deleteAction"),
            html: `${this.props.t("deleteSelectedItemsQuestion")}`,
            confirmButtonText: this.props.t("yes"),
            cancelButtonText: this.props.t("no"),
            icon: "question",
            showCancelButton: true
        });
        if (result.isConfirmed) {
            this.toast?.hide();
            const loadingToast = new ThemeToast({
                title: this.props.t("loading"),
                content: this.props.t("deleting"),
                type: "loading"
            });

            let resData = await galleryService.delete({images: this.state.selectedItems});
            loadingToast.hide();
            if (resData.status) {
                this.setState((state: PageState) => {
                    state.items = state.items.filter(item => !state.selectedItems.includes(item.name));
                    state.selectedItems = [];
                    return state;
                }, () => {
                    this.onSearch(this.state.searchKey);
                    new ThemeToast({
                        title: this.props.t("itemDeleted"),
                        content: this.props.t("itemDeleted"),
                        type: "success",
                        timeOut: 3
                    });
                })
            }
        }
    }

    onSubmit() {
        if (this.props.onSubmit) {
            this.toast?.hide();
            this.props.onSubmit(this.state.selectedItems);
        }
    }

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.items.filter(item => item.name.toLowerCase().search(searchKey) > -1)
        })
    }

    get getTableColumns(): TableColumn<PageState["items"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => (
                    <div className="image pt-2 pb-2">
                        <Image
                            className="img-fluid"
                            alt={row.name}
                            src={imageSourceLib.getUploadedImageSrc(row.name)}
                            width={100}
                            height={100}
                        />
                    </div>
                )
            },
            {
                name: this.props.t("title"),
                selector: row => row.name,
                sortable: true
            },
            {
                name: this.props.t("createdDate"),
                selector: row => (new Date(row.createdAt)).toLocaleDateString(),
                sortable: true,
                sortFunction: (a, b) => ThemeDataTable.dateSort(a, b)
            },
            {
                name: this.props.t("size"),
                selector: row => `${row.sizeKB.toFixed(1)} KB`,
                sortable: true,
                sortFunction: (a, b) => {
                    return a.sizeKB > b.sizeKB ? 1 : -1
                }
            },
            {
                name: this.props.t("show"),
                width: "70px",
                button: true,
                cell: row => (
                    <a
                        className="btn btn-gradient-info btn-icon-text"
                        href={imageSourceLib.getUploadedImageSrc(row.name)}
                        target="_blank"
                    ><i className="mdi mdi-eye"></i></a>
                )
            }
        ];
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-gallery">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <ThemeDataTable
                                columns={this.getTableColumns}
                                data={this.state.showingItems}
                                onSelect={rows => this.onSelect(rows.map(item => item.name))}
                                onSearch={searchKey => this.onSearch(searchKey)}
                                selectedRows={this.state.items.filter(item => this.state.selectedItems.includes(item.name))}
                                t={this.props.t}
                                isSelectable={true}
                                isAllSelectable={!(this.props.isModal && !this.props.isMulti)}
                                isMultiSelectable={!(this.props.isModal && !this.props.isMulti)}
                                isSearchable={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
