import React from "react";
import Nav from "react-bootstrap/Nav";

const Uploads = () => {
  return (
    <>
      <Nav.Link href="/uploadphoto">Upload Photo</Nav.Link>
      <Nav.Link href="/webcam">Web Cam</Nav.Link>
      <Nav.Link href="/uploadurl">Upload Url</Nav.Link>
    </>
  );
};

export default Uploads;
