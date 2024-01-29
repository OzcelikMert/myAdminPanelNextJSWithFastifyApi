interface UploadingFilesDocument {
    id: string
    file: File
    progressValue: number
    status: boolean
}

export default UploadingFilesDocument;