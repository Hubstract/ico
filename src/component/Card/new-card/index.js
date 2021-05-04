import React, { useCallback } from "react";
// import { connect } from "react-redux";
import CardComponent from "./cardJsonComponent";

function NewCard(props) {
  const showDetail = useCallback((item) => {
    props.history.push({
      pathname: `/market-details/${item.id}`,
      state: {
        nftData: item,
      },
    });
  }, []);

  return (
    <React.Fragment>
      {props.data &&
        props.data.map((nft, index) => {
          return (
            <CardComponent
              key={index}
              showDetail={showDetail}
              id={index}
              nft={nft}
              // {...props}
            />
          );
        })}
    </React.Fragment>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     aliaBNBPriceDollar: state.metaMaskReducer.aliaBNBPriceDollar,
//     bnbPriceDollar: state.metaMaskReducer.bnbPriceDollar,
//   };
// };

// export default connect(mapStateToProps, null)(React.memo(NewCard));
export default React.memo(NewCard);
