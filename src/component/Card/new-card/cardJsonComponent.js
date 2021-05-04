import React, { useState, useEffect } from "react";
import { Card, Modal, Spinner } from "react-bootstrap";
import insertComma from "../../../utils/insertComma";
// import LazyImage from "./LazyImage";
import DollarPriceComponent from "./DollarPriceComponent";
import ImageComponent from "./ImageComponent";


function CardComponent(props) {
  const nft = props.nft;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

  return (
    <React.Fragment>
      <Card key={props.id} onClick={() => props.showDetail(nft)}>
        <ImageComponent type={nft.type}  image={nft.image}></ImageComponent>
        <Card.Body>
          <Card.Title>
            {" "}
            <b>
              {nft.price ? insertComma(parseInt(nft.price).toFixed(2)) : "0.00"}
            </b>{" "}
            ALIA
          </Card.Title>
          {/* <Card.Title>
            {" "}
            <b>{nft.price ? nft.price : "0.00"}</b> ALIA
          </Card.Title> */}

          <DollarPriceComponent price={nft.price}></DollarPriceComponent>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default React.memo(CardComponent);

{
  /* <div onClick={() => setShow(!show)}>
<Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  className="homeProductCardModal"
>
  <Modal.Header closeButton></Modal.Header>
  <Modal.Body onClick={(e) => e.stopPropagation()}>
    {nft.type === "2D" || nft.type === "GIF" || nft.type === "hot" ? (
      <Card.Img variant="top" src={nft.image} />
    ) : nft.type === "3D" ? (
      !playVideo ? (
        <Card.Img
          variant="top"
          src={nft.image}
          onMouseOver={() => {
            // setPlayVideo(true);
          }}
        />
      ) : (
        <video
          //   width="300"
          //   height="200"
          style={{
            width: "100%",
            height: "100%",
            padding: 10,
            paddingBottom: 40,
            paddingTop: -30,
          }}
          controls
          autoPlay
          onMouseLeave={() => {
            setPlayVideo(false);
          }}
        >
          <source src={nft.videolink} />
        </video>
      )
    ) : undefined}
    <Button variant="primary">
      More detail
    </Button>
  </Modal.Body>
</Modal>
</div> */
}
