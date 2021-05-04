import React,{useState,useEffect} from "react";
import { Card,Spinner } from "react-bootstrap";
import LazyImage from './LazyImage'

function NFTImage(props) {
  let timer;

  const [loading, setLoading] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);

  const { type, image } = props;

  useEffect(() => {
    if (image) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
  }, [loading]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {type === "2D" || type === "GIF" || type === "hot" ? (
        <div className="loader-v">
            {/* <LazyImage src={image}/> */}
          <Spinner animation="border" variant="secondary" />
          <Card.Img variant="top" src={image} />
        </div>
      ) : type === "3D" ? (
        // !playVideo ? (
        <div className="loader-v">
          <Spinner animation="border" variant="secondary" />
          <Card.Img
            variant="top"
            src={image}
            onMouseOver={() => {
              // setPlayVideo(true);
            }}
          />
        </div>
      ) : // ) : (
      //   <video
      //     //   width="300"
      //     //   height="200"
      //     style={{
      //       width: "100%",
      //       height: "100%",
      //       padding: 10,
      //       paddingBottom: 40,
      //       paddingTop: -30,
      //     }}
      //     controls
      //     autoPlay
      //     onMouseLeave={() => {
      //       setPlayVideo(false);
      //     }}
      //   >
      //     <source src={nft.videolink} />
      //   </video>
      // )
      undefined}
    </>
  );
}

export default React.memo(NFTImage);
