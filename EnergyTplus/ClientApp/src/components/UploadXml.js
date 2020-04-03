import React, { Component } from 'react';
export class UploadXml extends Component {
    static displayName = UploadXml.name;

    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <h1 id="tabelLabel" >Upload file</h1>
                <p>This component demonstrates uploads file xml parse and load data for file 1251 encode.</p>
                <div className="col-sm12">
                </div>
                <div className="col-sm12">
                    <form onSubmit={e => this.submit(e)}>
                        <h1>File Upload in path</h1>
                        <input type="file" className="btn btn-success" accept=".xml" onChange={e => this.setFile(e)} />
                        <button type="submit" className="btn btn-info">Upload</button>
                    </form>
                </div>
            </div>
        );
    }
    async submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('xmlFile', this.state.file);
        await fetch('api/XmlFileStructure',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.tokenKey
                },
                body: formData
            }
        )
    }
    setFile(e) {
        this.setState({ file: e.target.files[0] });
    }
}