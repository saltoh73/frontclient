import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './categoryCourses.css';
import axios from 'axios';
const CategoryCourses = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const categories = useSelector((state) => state.categories.categories);
  const [specificCate, setSpecificCat] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [show, setShow] = useState(false);

  const [courseData, setCourseData] = useState({
    name: '',
    teacher: '',
    description: '',
    levelsOfCourse: 0,
    price: 0,
  });
  const [updateCourseData, setUpdateCourseData] = useState({
    name: '',
    teacher: '',
    description: '',
    levelsOfCourse: 0,
    price: 0,
  });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    categories.map((cate)=>{
      if (cate._id === params.id) {
        setSpecificCat(cate.categoryCourses);
        setCategoryName(cate.name);
        setCategoryId(cate._id);
      }
    });
  });

  const addCourse = async (e) => {
    e.preventDefault();
     await axios
      .put(
        `https://perfectpractice-academy.com/courses/addCoursesToSpecificCategory/${categoryId}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      )
      .then(() => alert('Course is added successfully'))
      .catch(() => alert('error'));
  };

  const deleteCourse = async (courseId) => {
    await axios
      .delete(`https://perfectpractice-academy.com/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then(() => alert('Course is deleted successfully'))
      .catch(() => alert('error'));
  };

  const editCourse = async (e) => {
    e.preventDefault();
    await axios
      .patch(`https://perfectpractice-academy.com/courses/${courseId}`, updateCourseData, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then(() => alert('Course is updated successuflly'));
  };

  return (
    <div className="category-courses">
      <h2>({categoryName}) Courses</h2>
      <form action="" onSubmit={(e) => addCourse(e)}>
        <input
          required
          type="text"
          placeholder="Enter course name"
          name="name"
          onChange={(e) =>
            setCourseData({ ...courseData, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="text"
          placeholder="Enter course teacher"
          name="teacher"
          onChange={(e) =>
            setCourseData({ ...courseData, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="text"
          placeholder="Enter course description"
          name="description"
          onChange={(e) =>
            setCourseData({ ...courseData, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="number"
          placeholder="Enter  levelsOfCourse"
          name="levelsOfCourse"
          onChange={(e) =>
            setCourseData({ ...courseData, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="number"
          placeholder="Enter course price"
          name="price"
          onChange={(e) =>
            setCourseData({ ...courseData, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Add Course</button>
      </form>
      {show && (
        <form action="" onSubmit={(e) => editCourse(e)}>
          <input
            required
            type="text"
            placeholder={'Enter course name'}
            name="name"
            onChange={(e) =>
              setUpdateCourseData({
                ...updateCourseData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            required
            type="text"
            placeholder="Enter course teacher"
            name="teacher"
            onChange={(e) =>
              setUpdateCourseData({
                ...updateCourseData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            required
            type="text"
            placeholder="Enter course description"
            name="description"
            onChange={(e) =>
              setUpdateCourseData({
                ...updateCourseData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            required
            type="number"
            placeholder="Enter  levelsOfCourse"
            name="levelsOfCourse"
            onChange={(e) =>
              setUpdateCourseData({
                ...updateCourseData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            required
            type="number"
            placeholder="Enter course price"
            name="price"
            onChange={(e) =>
              setUpdateCourseData({
                ...updateCourseData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button type="submit">Edit Course</button>
        </form>
      )}
      <div className="courses">
        {specificCate? specificCate.map((course) => {
          return (
            <div className="course">
              <p>{course.name}</p>
              <p>{course.description}</p>
              <p>{course.teacher}</p>
              <p>CourseLevel {course.levelsOfCourse}</p>
              <p>{course.price}$</p>
              <button onClick={() => deleteCourse(course._id)}>delete</button>
              <button
                onClick={() => {
                  setCourseId(course._id);
                  setShow(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => navigate(`/courseVideos/${course._id}`)}>
                Course Videos
              </button>
            </div>
          );
        }):''}
      </div>
    </div>
  );
};

export default CategoryCourses;
