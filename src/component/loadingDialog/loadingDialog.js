import React from "react";

import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";


function LoadingDialog(props) {
  return (
    <Modal
      dialogClassName="my-modal "
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.loading}
      onHide={props.closesuccessdialog ? () => props.closesuccessdialog() : {}}
      backdrop="static"
      keyboard={false}
      style={{ padding: 20 }}
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Modal.Header>

      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="modalClass"
      >
        <h5 style={{ fontWeight: "bold", marginTop:-25 }} className="">
          {props.mainheading}
        </h5>
        {props.forloading ? (
          <>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={70}
              width={75}
              timeout={200000}
            />

            <span className="my-1">{props.msg}</span>
            <span className="my-1">{props.submsg}</span>
          </>
        ) : (
          <>
            <img src="https://cdn.xanalia.com/assets/images/up-arrow.png" style={{ width: 70, height: 70 }} />

            <span className="my-1">{props.msg}</span>
            <span className="my-1">{props.submsg}</span>
            <Button
              //   size="lg"
              variant="primary"
              onClick={
                props.closesuccessdialog ? () => props.closesuccessdialog() : {}
              }
              className="my-1 mt-3"
              style={{
                width: "100%",
                fontWeight: "bold",
                borderRadius: 3,
                borderWidth: 0,
              }}
            >
              OK
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(LoadingDialog);
