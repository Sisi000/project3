import React, { Component } from "react";
import axios from "axios";
import "./UploadUrl.css";

class UploadUrl extends Component {
  state = {
    URL: "",
    // isValid: false
  };

  // validateWebsiteUrl = websiteUrl => {
  //   const urlRegEx =
  //     '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';
  //   return urlRegEx.test(String(websiteUrl).toLowerCase());
  // };

  changeUrl = (e) => {
    const { value } = e.target;
    // const isValid = !value
    // || this.validateWebsiteUrl(value);

    this.setState({
      URL: value,
      // isValid
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { URL } = this.state;
    await axios.post("/uploadurl", { URL }).then((res) => {
         // window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      // alert("Suggested glasses are " + JSON.stringify(res.data.results));
      alert("Suggested glasses are " + res.data.results);
      // console.log("Suggested glasses are", res.data.results);
      this.setState({
        URL: "",
      });
    });
  };

  render() {
    const { URL } = this.state;
    return (
      <div className="containerUrl">
        <form className="formsUrl">
          or enter image Url
          <input type="text" name="URL" value={URL} onChange={this.changeUrl} />
          {/* {!this.state.isValid && (
            <div style={{ color: "red" }}>URL is invalid</div>
          )} */}
          <button className="button-2" onClick={this.submitForm}>
            SubmitUrl
          </button>
          <img src={URL} alt=""></img>
        </form>
      </div>
    );
  }
}
export default UploadUrl;
