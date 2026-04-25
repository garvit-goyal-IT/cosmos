import React, { useState } from "react";
import "../../styles/createFood.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const CreateFood = () => {
    const navigate= useNavigate()       
  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle text input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle video upload
  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, video: file });
      setPreview(URL.createObjectURL(file)); // 🔥 preview
    }
  };

  // Submit (no backend yet)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("video", form.video);
    
    const response=await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
    })

    console.log(response.data )
    navigate('/')
  };

  return (
    <div className="create-container">

      <form className="create-form" onSubmit={handleSubmit}>
        <h2 className="title">Create Food</h2>

        {/* Video Upload */}
        <div className="form-group">
          <label>Upload Video</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />

          {preview && (
            <video src={preview} controls className="preview" />
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Food Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter food name"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write something..."
          />
        </div>

        {/* Submit */}
        <button className="submit-btn">Upload</button>
      </form>

    </div>
  );
};

export default CreateFood;