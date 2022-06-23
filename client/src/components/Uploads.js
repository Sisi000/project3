import React from "react";
import Nav from "react-bootstrap/Nav";

const Uploads = () => {
  return (
    <div className="uploads-container" >
      <Nav.Link href="/uploadphoto">Upload Photo</Nav.Link>
      <Nav.Link href="/webcam">Web Cam</Nav.Link>
      <Nav.Link href="/uploadurl">Upload Url</Nav.Link>
    </div>
  );
};

export default Uploads;
