import MarketPlaceAbi from "../config/abi/MarketPlaceAbi";
import { providerUrl } from "../config/chainIds";
import MarketContractAddress from "../config/contractAddress/MarketContractAddress";
const Web3 = require("web3");

export const getNFTDetails = async (obj) => {
  let web3 = new Web3(providerUrl);
  let MarketPlaceContract = new web3.eth.Contract(
    MarketPlaceAbi,
    MarketContractAddress
  );
  let nftObj = {
    image: obj.metaData.image,
    description: obj.metaData.description,
    title: obj.metaData.name,
    type: obj.metaData.properties.type,
  };

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }
  nftObj.id = obj.tokenId;
  nftObj.redirectLink = "/market-details?id=" + obj.tokenId;
  nftObj.logoImg = "https://cdn.xanalia.com/assets/images/logo-v2.svg";

  MarketPlaceContract.methods.getAuthor(obj.tokenId).call(function (err, res) {
    if (!err) {
      nftObj.author = res;
    } else {
      //console.log("err getAuthor", err);
    }
  });

  // await MarketPlaceContract.methods
  //   .ownerOf(obj.tokenId)
  //   .call(function (err, res) {
  //     if (!err) {
  //       nftObj.owner_address = res;
  //     } else {
  //       //console.log("err getAuthor", err);
  //     }
  //   });

  MarketPlaceContract.methods.ownerOf(obj.tokenId).call(function (err, res) {
    if (!err) {
      nftObj.owner_address = res;
      // nftObj.owner_address = res;
      MarketPlaceContract.methods
        .tokensOfOwner(res)
        .call(function (err2, res2) {
          if (!err2) {
            nftObj.ownerOf = res2;
          } else {
            //console.log("err ownerTokens", err2);
          }
        });
    } else {
      //console.log("err getAuthor", err);
    }
  });

  MarketPlaceContract.methods
    .getSellDetail(obj.tokenId)
    .call(function (err, res) {
      if (!err) {
        let resArray = Object.values(res);
        nftObj.amount = resArray[1];
        let nftPrice = resArray[1] / 1e18;
        if (nftPrice !== 0 && resArray[2]) {
          nftObj.price = nftPrice;
          let date = toDateTime(resArray[2]);
          nftObj.time = date;
        }
      } else {
        //console.log("err getSellDetail", err);
      }
    });

  return nftObj;
};
