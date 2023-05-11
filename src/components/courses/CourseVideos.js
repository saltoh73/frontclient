import React, { useEffect, useState } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import './courseVideos.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../../app/features/courseSlice';
const CourseVideos = () => {
  // const [videos, setVideos] = useState([]);
  const [videosForm, setVideosForm] = useState([]);
  const [v, setV] = useState([]);
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
     axios
      .get('https://perfectpractice-academy.com/courses/all', {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then((courses) => dispatch(getAllCourses(courses.data)))
      .catch((err) => alert(err));
    const courses = JSON.parse(localStorage.getItem('courses'));
   courses.map((course)=>{
      if (course._id === params.id) {
        setCourseId(course._id);
        axios
          .get(`https://perfectpractice-academy.com/courses/${course._id}`, {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
            },
          })
          .then((video) => {
            setV(video.data);
          });
      }
    });
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in videosForm) {
      formData.append('videos', videosForm[key]);
    }
    formData.append('name', name);
    axios
      .put(`https://perfectpractice-academy.com/${courseId}`, formData, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then((data) => alert('Video added successfully'))
      .catch((err) => alert(err));
  };

  const deleteVideo = async (videoId) => {
    await axios
      .delete(`https://perfectpractice-academy.com/media/${videoId}`, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then(() => alert('video is deleted successfully'))
      .catch(() => alert('error'));
  };
  return (
    <form action="" onSubmit={(e) => onFormSubmit(e)}>
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Videos</label>
        <input
          type="file"
          name="videos"
          multiple
          accept=".mp4, .mkv"
          onChange={(e) => setVideosForm(e.target.files)}
        />
      </div>
      <button type="submit">Upload Videos</button>
      {v?.map((video) => {
        return (
          <div className="video-styles">
            <h1>{video?.name}</h1>
            <Video className="vid">
              <source src={video?.videos} />
            </Video>
            <button onClick={() => deleteVideo(video._id)}>Delete Video</button>
          </div>
        );
      })}
    </form>
  );
};

export default CourseVideos;
