import * as React from 'react';

export interface IFilePickerProps {
    onFilePicked: (fileName: string, fileType: string, file: any) => void;
    accept?: string;
    children: any;
    id?: string;
}

class FilePicker extends React.Component<IFilePickerProps, any> {
    public render() {
        const { accept, children, id } = this.props;
        const inputId = id || 'file-upload';

        return (
            <React.Fragment>
                <input
                    accept={accept || '*'}
                    style={{ display: 'none' }}
                    id={inputId}
                    type="file"
                    onChange={this.handleFilePicked}
                />
                <label htmlFor={inputId}>
                    {children}
                </label>
            </React.Fragment>
        )
    }

    private handleFilePicked = (e: any) => {
        const files = e.target.files;
        if (files && files.length) {
            const file = files[0];
            this.props.onFilePicked(file.name, file.type, file);
        }
    }
}

export default FilePicker;