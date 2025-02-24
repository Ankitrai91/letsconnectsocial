import React, { useEffect, useState } from "react";
import "./Post.css";
import CommentIcon from "../../img/comment.png";
import ShareIcon from "../../img/share.png";
import LikeIcon from "../../img/like.png";
import NotLikeIcon from "../../img/notlike.png";

const Post = ({ data, attribute }) => {
  const [liked, setLiked] = useState(attribute?.likedUser?.includes(localStorage.getItem("userId")));
  const [likeCount, setLikeCount] = useState(attribute?.likes || 0);

  const url = attribute.format === "image" 
    ? `data:image/jpeg;base64,${data}` 
    : `data:video/mp4;base64,${data}`;

  const handleLikes = async () => {
    try {
      const formData = {
        _id: attribute._id,
        userId: localStorage.getItem("userId"),
      };
      const API_URL = process.env.REACT_APP_API_URL;


      const response = await fetch(`${API_URL}/api/profile/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setLiked(result.liked);
        setLikeCount(result.likes);
      } else {
        console.error("Error liking post", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleLikes:", error);
    }
  };

  return (
    <div className="Post">
      {attribute.format === "image" ? (
        <img src={url} alt="imagePreview" className="postMedia" />
      ) : (
        <video src={url} alt="videoPlayer" controls className="postMedia" />
      )}

      <div className="postReact">
        <img 
          src={liked ? LikeIcon : NotLikeIcon}
          alt="like"
          className="icon"
          onClick={handleLikes}
          style={{ width: '24px', height: '24px' }}
        />
        <img src={CommentIcon} alt="comment" className="icon" style={{ width: '24px', height: '24px' }} />
        <img src={ShareIcon} alt="share" className="icon" style={{ width: '24px', height: '24px' }} />
      </div>

      <span className="likeCount">{likeCount} {likeCount === 1 ? "like" : "likes"}</span>

      <div className="detail">
        <span><b>{attribute.name}</b></span>
        <span>{attribute.desc || ""}</span>
      </div>
    </div>
  );
};

export default Post;
