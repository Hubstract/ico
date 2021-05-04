import React from "react";
import { Card } from "react-bootstrap";
import insertComma from "../../../utils/insertComma";
import { connect } from "react-redux";

function NFTDollarPrice(props) {
  return (
    <Card.Text>
      {props.price
        ? `($${insertComma(
            parseFloat(
              props.price * props.bnbPriceDollar * props.aliaBNBPriceDollar,
              true
            ).toFixed(2)
          )})`
        : "($0.00)"}
    </Card.Text>
  );
}

const mapStateToProps = (state) => {
  return {
    aliaBNBPriceDollar: state.metaMaskReducer.aliaBNBPriceDollar,
    bnbPriceDollar: state.metaMaskReducer.bnbPriceDollar,
  };
};
export default connect(mapStateToProps, {})(React.memo(NFTDollarPrice));
