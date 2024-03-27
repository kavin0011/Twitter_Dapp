import { useState } from "react";
const Gettweet = ({state})=>{
    const [likes,newlikes]=useState("1");
    const [post,newpost]=useState([]);
    const {contract}=state;
    // let uuid = self.crypto.randomUUID();
    // useEffect(()=>{
    //     const gettweet=async()=>{
    //         const post = await contract.getfulltweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8");
    //         newpost(post);
    //         console.log(post);
    //     }
    //     contract && gettweet();
    // },[contract])
    const gettweet=async()=>{
        // const tweet = await contract.getfulltweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8");
        const post = await contract.getfulltweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8");
        const first_tr = await contract.gettweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8",2);
        console.log(first_tr);
        // console.log(post);
        newpost(post);
    }
    let like;
    const liketweet=async()=>{
        const nolike = document.querySelector("#number").value;
         like = await contract.liketweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8",nolike);
         const totallike = await contract.totaltweet("0xD8338cb83c2107FAf8ceA049D119912aa5babad8");
         await newlikes(totallike);
         console.log(totallike);
        // console.log(like);
        // newpost(like);
    }
    return (
        <>
        {post.map((posts)=>{
            // {posts.like}=like
            return<div>
            <p>{posts.id}</p>
            <p>{posts.admin}</p>
            <p>{posts.content}</p>
            <p>{posts.timestamp}</p>
            <p>{posts.likes}</p>
            </div>
        })}
        <input id="number"></input>
       <button onClick={gettweet}>Get Tweet</button>
       <button onClick={liketweet}> Like Tweet </button>
       <h1>{likes}</h1>
        </>
    )
}
export default Gettweet;