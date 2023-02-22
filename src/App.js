import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import "trix/dist/trix";
import "trix/dist/trix.css";
import axios from "axios";
import parse from "html-react-parser";
import Wysiwyg from "./components/wysiwyg";

// statrt trix editor code

export default class App extends React.Component {

  state = {
    content: ""
  }

  render(){
    return(
      < Wysiwyg 
        onChange={this.handleContentChange} 
        onEditorReady={this.handleEditorReady} 
      />
    );
  }
  handleContentChange = (content) => {
    this.setState({content : content});
  };

  handleEditorReady(editor) {
    editor.insertString("editor is ready");
  }

} //end of trix editor code

//statrt of index page show code

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//         items: [],
//         DataisLoaded: false
//     };
//   }
//   componentDidMount() {
//     fetch("http://localhost:3000/api/v1/support_contacts")
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({
//             items: json,
//             DataisLoaded: true
//         });
//       }
//     )
//   }
//   render() {
//     console.log(this.state.items)
  
//     const { DataisLoaded, items } = this.state;
//     if (!DataisLoaded) return <div>
//       <h1> Pleses wait some time.... </h1> </div> ;
//     return (
//       <div className = "App">
//         <h1> Fetch data from an api in react </h1>  {

//           items.map((item) => (console.log(item),
//             <ol key = { item.id } >
//               Name: { item.name }, 
//               Email: { item.email }, 
//               description: { parse(item.description) } { <img src={item.attachment_url} alt="" /> }<br />
//               body: { item.body } 
//             </ol>
            
//           ))
//         }
//       </div>
//     );
//   }
// }
// export default App;
// end of index page show code