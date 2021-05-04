import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Countdown from "react-countdown";

var launchDate = new Date("Sun, 21 Mar 2021 05:00:00 GMT").toUTCString();
var currDate = new Date();

let daysDiff =
  (new Date(launchDate).getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);

let hoursDiff = (daysDiff - parseInt(daysDiff)) * 24;
let minDiff = (hoursDiff - parseInt(hoursDiff)) * 60;
let secDiff = (minDiff - parseInt(minDiff)) * 60;
let milisec = (secDiff - parseInt(secDiff)) * 1000;

const daysLeft = parseInt(daysDiff) * 24 * 60 * 60 * 1000;
const hourLeft = parseInt(hoursDiff) * 60 * 60 * 1000;
const minLeft = parseInt(minDiff) * 60 * 1000;
const secLeft = parseInt(secDiff) * 1000;
const dayLeft = daysLeft + hourLeft + minLeft + secLeft + milisec;

function NotificationDialog(props) {
  useEffect(() => {
    return () => {
      localStorage.setItem("lastVisit", new Date().getTime());
    };
  }, []);
  return (
    <>
      <Modal
        size="lg"
        className="notify-modal"
        show={true}
        onHide={() => props.setShowDialog(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div  className="modal-logo">
            <img src="https://cdn.xanalia.com/assets/images/logo-v2.svg"/> 
          </div>
          <Modal.Title>
            <div
            className="modal-title_"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#008FFF",
                fontSize: 18,
                marginTop: "4%",
                marginBottom: "4%",
              }}
            >
              {" "}
              TOKEN UPGRADE NOTIFICATION
            </div>
          </Modal.Title>
          <div className="modal-content_">
            <p>
              Here we would like to sincerely draw your attention to the
              announcements; considering the future upgrades and accommodations
              of the decentralized NFT marketplace, our current ALIA v1.0 token
              will need to be upgraded to the ALIA v1.5 token contract.
            </p>

            <h2>
              <Countdown
                date={new Date().getTime() + dayLeft}
                renderer={renderer}
              />
            </h2>

            <div style={{ color: "red" }}>
              Please make sure to remove you LP before.
            </div>

            <h5>Here is what to do  </h5>
            <ul className="listing-modal">
              <li>
                ALIA 1.0 Holder who is not creating ALIA/BNB LP in Pancake Swap.
                You will automatically get ALIA v.1.5 at 3/21 UTC 05:00 AM. You
                have time 24h to create new LP in PancakeSwap and stake them in
                <a href="/"> xanalia.com</a>
              </li>

              <li>
                ALIA 1.0 Holder who is creating ALIA/BNB LP in Pancake Swap.
                Please remove your LP before 3/21 UTC 05:00 AM. then you will
                automatically get ALIA v.1.5 at 3/21 UTC 05:00 AM. You have time
                24h to create new LP in PancakeSwap and stake them in
                <a href="/"> xanalia.com</a>
              </li>
            </ul>

            <div className="full-details">
            <a href="https://xanalianft.medium.com/alia-token-upgrade-and-reschedule-of-staking-reward-ce81d7b3b923" target="_blank"> Full details about the topic is here: 
                 Link</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <span>
         0 Day 00:00:00
      </span>
    );
  } else {
    // Render a countdown
    return (
      <span>
         {days} Day {hours>=10 ? hours :  "0" + hours  }:{minutes >=10 ? minutes : "0" + minutes     }:{seconds>= 10 ? seconds :  "0" +  seconds}
      </span>
    );
  }
};

export default NotificationDialog;
