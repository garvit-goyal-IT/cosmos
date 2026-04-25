import "../../styles/reels.css";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

const Home = () => {
  const [videos, setVideos] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [liked, setLiked] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const videoRefs = React.useRef([]);

  // Fetch
  React.useEffect(() => {
    axios.get("http://localhost:3000/api/food", {
      withCredentials: true
    })
    .then(res => setVideos(res.data.foodItems))
    .catch(err => console.log(err));
  }, []);

  // Auto play + detect active video
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = Number(entry.target.dataset.index);

          if (entry.isIntersecting) {
            entry.target.play();
            setActiveIndex(index); // 🔥 track active
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach(v => v && observer.observe(v));

    return () => observer.disconnect();
  }, [videos]);

  // Toggle like
  const toggleLike = (id) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const toggleSave = (id) => {
    setSaved(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="reels-container">
      {videos.map((video, index) => (
        <div className="reel" key={video._id}>

          <video
            ref={el => (videoRefs.current[index] = el)}
            data-index={index}
            src={video.video}
            className="video"
            loop
            muted
            playsInline
          />

          {/* ACTIONS */}
          <div className="actions">

  {/* LIKE */}
  <div className="action" onClick={() => toggleLike(video._id)}>
    {liked[video._id] ? (
      <FaHeart className="icon liked" />
    ) : (
      <FaRegHeart className="icon" />
    )}
    <span>23</span>
  </div>

  {/* SAVE */}
  <div className="action" onClick={() => toggleSave(video._id)}>
    {saved[video._id] ? (
      <BsBookmarkFill className="icon saved" />
    ) : (
      <BsBookmark className="icon" />
    )}
    <span>23</span>
  </div>

  {/* COMMENT */}
  <div className="action">
    <FaRegCommentDots className="icon" />
    <span>45</span>
  </div>

</div> 

          {/* BOTTOM */}
          <div className="overlay">
            <p className="description">{video.description}</p>

            <Link className="btn" to={`/foodPartner/${video.foodPartner}`}>
              Visit Store
            </Link>
          </div>
        </div>
      ))}

      {/* NAV */}
      <div className="bottom-nav">
        <div className="nav-item active">🏠<p>Home</p></div>
        <div className="nav-item">🔖<p>Saved</p></div>
      </div>
    </div>
  );
};

export default Home;