import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.png";
import Profile from "../../img/profileImg.png";
import "./ProfileCard.css";

const ProfileCard = () => {
const [profileData,setProfileData] = useState('')
  const fetchInfo = async () => {
    const formData = {
      userId : localStorage.getItem("userId")
    }
    const API_URL = process.env.REACT_APP_API_URL;


    const response = await fetch(`${API_URL}/api/profile/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    console.log("Fecthing profile info response", response)
    if (response.ok) {
      const resp = await response.json();
      setProfileData(resp)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={localStorage.getItem("image")} alt="" />
      </div>

      <div className="ProfileName">
        <span>{localStorage.getItem("name")}</span>
      </div>

      <div className="followStatus">
        <div>
          <div className="follow">
            <span>{profileData?.followings}</span>
            <span className="textbased">Followings</span>
          </div>
          {/* <div className="vl"></div> */}
          <div className="follow">
            <span>{profileData?.followers}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              {/* <div className="vl"></div> */}
              <div className="follow">
                <span>{profileData?.posts}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;