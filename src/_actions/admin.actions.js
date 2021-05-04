import axios from 'axios'; 

export const updateNFT = (id, data, history) => {
    axios
    .put(`${process.env.REACT_APP_API_URL_ADMIN}update/${id}/`,data)
    .then((res) => {
        history.push({ pathname: "/admin", state: { ...history.location.state } })
    })
    .catch((err) => console.log("err in updateNFT",err))
}

export const mintNFT = (id, data, history) => {
    axios
    .post(`${process.env.REACT_APP_API_URL_MINT}/mintNFT`,data)
    .then((res) => {
        history.push({ pathname: "/admin", state: { ...history.location.state } })
    })
    .catch((err) => console.log("err in updateNFT",err))
}

// export const selectMultiNFTs = (data) => {
//     axios
//     .post('https://admin.xanalia.com/api/nft/update_bulk/',data)
//     .then((res) => res)
//     .catch((err) => err)
// }

// {
//     "artist_name": "string",
//     "art_name": "string",
//     "status": "pending",
//     "file_link": "string",
//     "twitter_link": "string",
//     "description": "string",
//     "nft_type": "2d",
//     "supply": -2147483648,
//   }