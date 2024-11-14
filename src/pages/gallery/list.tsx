import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import Swal from 'sweetalert2';
import { GalleryService } from '@services/gallery.service';
import { TableColumn } from 'react-data-table-component';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import Image from 'next/image';
import { GalleryTypeId } from '@constants/galleryTypeId';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { IGalleryGetResultService } from 'types/services/gallery.service';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';

type IPageState = {
  items: IGalleryGetResultService[];
  showingItems: IGalleryGetResultService[];
  selectedItems: string[];
  selectedItemIndex: number;
  searchKey: string;
  isListLoading: boolean;
};

type IPageProps = {
  isModal?: boolean;
  isMulti?: boolean;
  onSubmit?: (images: string[]) => void;
  uploadedImages?: IGalleryGetResultService[];
  selectedImages?: string[];
} & IPagePropCommon;

export default class PageGalleryList extends Component<IPageProps, IPageState> {
  toast: null | ComponentToast = null;
  listPage: number = 0;
  listPagePerCount: number = 10;
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      items: [],
      showingItems: [],
      selectedItems: [],
      selectedItemIndex: 0,
      searchKey: '',
      isListLoading: true,
    };
  }

  async componentDidMount() {
    await this.getItems();

    this.setState({
      isListLoading: false,
    });

    if (!this.props.isModal) {
      this.setPageTitle();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
    this.toast?.hide();
  }

  componentDidUpdate(
    prevProps: Readonly<IPageProps>,
    prevState: Readonly<IPageState>
  ) {
    if (
      this.props.uploadedImages &&
      JSON.stringify(this.props.uploadedImages) !==
        JSON.stringify(prevProps.uploadedImages)
    ) {
      this.setListSort(
        this.state.items.concat(this.props.uploadedImages || [])
      );
    }
  }

  setPageTitle() {
    this.props.setBreadCrumb([this.props.t('gallery'), this.props.t('list')]);
  }

  async getItems() {
    const serviceResult = await GalleryService.get(
      { typeId: GalleryTypeId.Image },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      this.setListSort(serviceResult.data);
    }
  }

  setListSort(items: IGalleryGetResultService[]) {
    items = items.orderBy('createdAt', 'desc');
    this.setState(
      (state: IPageState) => {
        if (this.props.selectedImages && this.props.selectedImages.length > 0) {
          state.selectedItems = state.selectedItems.concat(
            this.props.selectedImages
          );
          items.sort((a, b) => {
            if (this.props.selectedImages?.includes(a.name)) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        state.items = items;
        return state;
      },
      () => {
        this.onSearch(this.state.searchKey);
      }
    );
  }

  onSelect(images: string[]) {
    this.setState(
      {
        selectedItems: images,
      },
      () => {
        if (this.state.selectedItems.length > 0) {
          if (!this.toast || !this.toast.isShow) {
            this.toast = new ComponentToast({
              content: this.props.isModal ? (
                <button
                  type="button"
                  className="btn btn-gradient-success btn-icon-text w-100"
                  onClick={() => this.onSubmit()}
                >
                  <i className="mdi mdi-check btn-icon-prepend"></i>{' '}
                  {this.props.t('okay')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-gradient-danger btn-icon-text w-100"
                  onClick={() => this.onDelete()}
                >
                  <i className="mdi mdi-trash-can btn-icon-prepend"></i>{' '}
                  {this.props.t('delete')}
                </button>
              ),
              borderColor: this.props.isModal ? 'success' : 'error',
              position: 'bottom-center',
            });
          }
        } else {
          this.toast?.hide();
        }
      }
    );
  }

  async onDelete() {
    const result = await Swal.fire({
      title: this.props.t('deleteAction'),
      html: `${this.props.t('deleteSelectedItemsQuestion')}`,
      confirmButtonText: this.props.t('yes'),
      cancelButtonText: this.props.t('no'),
      icon: 'question',
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      this.toast?.hide();
      const loadingToast = new ComponentToast({
        title: this.props.t('loading'),
        content: this.props.t('deleting'),
        type: 'loading',
      });

      const serviceResult = await GalleryService.deleteMany(
        { _id: this.state.selectedItems },
        this.abortController.signal
      );
      loadingToast.hide();
      if (serviceResult.status) {
        this.setState(
          (state: IPageState) => {
            state.items = state.items.filter(
              (item) => !state.selectedItems.includes(item._id)
            );
            state.selectedItems = [];
            return state;
          },
          () => {
            this.onSearch(this.state.searchKey);
            new ComponentToast({
              title: this.props.t('itemDeleted'),
              content: this.props.t('itemDeleted'),
              type: 'success',
              timeOut: 3,
            });
          }
        );
      }
    }
  }

  onSubmit() {
    if (this.props.onSubmit) {
      const foundSelectedItems = this.state.items.findMulti(
        '_id',
        this.state.selectedItems
      );
      this.toast?.hide();
      this.props.onSubmit(
        foundSelectedItems.map((selectedItem) => selectedItem.name)
      );
    }
  }

  onSearch(searchKey: string) {
    this.setState({
      searchKey: searchKey,
      showingItems: this.state.items.filter(
        (item) => item.name.toLowerCase().search(searchKey) > -1
      ),
    });
  }

  get getTableColumns(): TableColumn<IPageState['items'][0]>[] {
    return [
      {
        name: this.props.t('image'),
        width: '105px',
        cell: (row) => (
          <div className="image pt-2 pb-2">
            <Image
              className="img-fluid"
              alt={row.name}
              src={ImageSourceUtil.getUploadedImageSrc(row.name)}
              width={100}
              height={100}
              loading={'lazy'}
            />
          </div>
        ),
      },
      {
        name: this.props.t('title'),
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: this.props.t('createdDate'),
        selector: (row) => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
        sortFunction: (a, b) => ComponentDataTable.dateSort(a, b),
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.authorId.name}
            updatedAt={row.createdAt || ''}
          />
        ),
      },
      {
        name: this.props.t('size'),
        selector: (row) => `${row.sizeKB.toFixed(1)} KB`,
        sortable: true,
        sortFunction: (a, b) => {
          return a.sizeKB > b.sizeKB ? 1 : -1;
        },
      },
      {
        name: this.props.t('show'),
        width: '70px',
        button: true,
        cell: (row) => (
          <a
            className="btn btn-gradient-info btn-icon-text"
            href={ImageSourceUtil.getUploadedImageSrc(row.name)}
            target="_blank"
            rel="noreferrer"
          >
            <i className="mdi mdi-eye"></i>
          </a>
        ),
      },
    ];
  }

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-gallery">
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <ComponentDataTable
                columns={this.getTableColumns}
                data={this.state.showingItems}
                onSelect={(rows) => this.onSelect(rows.map((item) => item._id))}
                onSearch={(searchKey) => this.onSearch(searchKey)}
                selectedRows={this.state.items.filter((item) =>
                  this.state.selectedItems.includes(item._id)
                )}
                i18={{
                  search: this.props.t('search'),
                  noRecords: this.props.t('noRecords'),
                }}
                isSelectable={true}
                isAllSelectable={!(this.props.isModal && !this.props.isMulti)}
                isMultiSelectable={!(this.props.isModal && !this.props.isMulti)}
                isSearchable={true}
                progressPending={this.state.isListLoading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
