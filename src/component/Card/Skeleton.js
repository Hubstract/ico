import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonImage = ({ height }) => {
    return (
        <React.Fragment>
            <SkeletonTheme color="#D0D0D0" highlightColor="#D8D8D8">
                <Skeleton height={height ? height : 300} width={400} />
            </SkeletonTheme>
        </React.Fragment>
    )
}

export default SkeletonImage;