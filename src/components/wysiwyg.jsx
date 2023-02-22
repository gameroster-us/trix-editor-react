import React from "react";
import Trix from "trix";
import axios from 'axios';

class Wysiwyg extends React.Component {
  
  state = {
    name: '',
    file: null
  }
  constructor(props) {
    super(props);
    this.trixInput = React.createRef();
  }
  componentDidMount() {

    this.trixInput.current.addEventListener("trix-change", event => {
      this.props.onChange(event.target.innerHTML);
      this.setState({ name: event.target.innerHTML})
    });
    this.trixInput.current.addEventListener("trix-attachment-add", event => {
      if (event.attachment.file){
        uploadFileAttachement(event.attachment)
      }
    });
    function uploadFileAttachement(attachment) {
      uploadFile(attachment.file, setProgress, setAttributes)
  
      function setProgress(progress) {
        attachment.setUploadProgress(progress)
      }
  
      function setAttributes(attributes) {
        attachment.setAttributes(attributes)
      }
    }
    function uploadFile(file, progressCallback, successCallback) {
      var key = createStorageKey(file)
      var formData = createFormData(key, file)
      var xhr = new XMLHttpRequest()
      
      xhr.open("POST", "http://localhost:3000/api/v1/support_contacts/update_attachment" , true)
  
      xhr.upload.addEventListener("progress", function(event) {
        var progress = event.loaded / event.total * 100
        progressCallback(progress)
      })
  
      xhr.addEventListener("load", function(event) {
        if (xhr.status == 204) {
          var attributes = {
            url:  "http://localhost:3000/api/v1/support_contacts/update_attachment" + key,
            href: "http://localhost:3000/api/v1/support_contacts/update_attachment" + key + "?content-disposition=attachment"
          }
          successCallback(attributes)
        }
      })
  
      xhr.send(formData)
    }
    function createStorageKey(file) {
      var date = new Date()
      var day = date.toISOString().slice(0,10)
      var name = date.getTime() + "-" + file.name
      return [ "tmp", day, name ].join("/")
    }
  
    function createFormData(key, file) {
      var data = new FormData()
      data.append("key", key)
      data.append("Content-Type", file.type)
      data.append("file", file)
      return data      
    }    
  }
  

  handleSubmit = event => {
    event.preventDefault();
    
    const support_contact = {
      description: this.state.name,   
      name: "joel",
      last_name: "Gaqcia",
      second_last_name: "Vazquez",
      email: "defhss@gmail.com",
      telephone: "7822208766",
      body: "Hey! this platform is amazing man. nice job!",
      status: "created"
    };

    axios.post('http://localhost:3000/api/v1/support_contacts', { name: "joel", last_name: "Gaqcia", second_last_name: "Vazquez", email: "defhss@gmail.com", telephone: "7822208766", body: "Hey! this platform is amazing man. nice job!", status: "created", description: this.state.name, support_contact })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }
 
 
  render() {
    return (
        <div className="wrapper">
        <h1>Trix Editor</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="hidden"
            id="trix"
            value={this.props.value}
          />
          <trix-editor
            id="editor"
            input="id"
            ref={this.trixInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Wysiwyg;
