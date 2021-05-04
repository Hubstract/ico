import React from 'react';
import "../../containers/Slider/sliderss.scss";
import "../../containers/Market/market.scss";
import SkeletonImage from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonShortText from './SkeletonShortText';

const SkeletonIIndex = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <React.Fragment>
      {arr.map((index) => {
        return (
          <div
            key={index}
            className="grid-item slider-grid-item"
            style={{ background: "#D0D0D0" }}
          >
            <div className="gurd-main">
              <div className={"gurd-image slider-image "}>
                <SkeletonImage />
              </div>
            </div>
            <div className="gurd-footer gurd-slider-footer">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <SkeletonShortText />
                </div>
                <div className="wrap-element slider-ele">
                  <SkeletonText />
                </div>
              </div>
            </div>
          )
        })
      }
    </React.Fragment>
  );
}

export default SkeletonIIndex;
