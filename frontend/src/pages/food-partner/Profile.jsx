import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/foodPartnerProfile.css";



const Profile = () => {

  const {id}= useParams();
  const [profile, setProfile] = React.useState(null);
  const [videos, setVideos] = React.useState([]);


   useEffect(()=>{ 
    axios.get(`http://localhost:3000/api/foodPartner/${id}`, {
      withCredentials: true
    })
    .then(response=>{
      setProfile(response.data.foodPartner);
      setVideos(response.data.foodPartner.foodItems);
    })
   },[id])

  return (
    <div className="profile-container">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-top">
          
          {/* Avatar */}
          <img src="https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8 " className="avatar"></img>

          {/* Info */}
          <div className="info">
            <div className="name">{profile?.name}</div>
            <div className="address">Address</div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div>
            <p className="stat-value">{profile?.totalMeals}</p>
            <p className="stat-label">total meals</p>
          </div>
          <div>
            <p className="stat-value">{profile?.customerServed}</p>
            <p className="stat-label">Customer served</p>
          </div>
        </div>
      </div>

      {/* VIDEO GRID */}
      <div className="video-grid">
        {videos.map((v) => (
          <div key={v.id} className="video-card">
            <video style={{width: "100%", height: "100%"}} loop 
            src={v.video} muted ></video>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;