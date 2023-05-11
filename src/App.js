import { Route, Routes } from 'react-router-dom';
import './App.css';
import Category from './components/categories/Category';
import Login from './components/login/Login';
import CategoryCourses from './components/categories/categoryCourses/CategoryCourses';
import CourseVideos from './components/courses/CourseVideos';
function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    
      <Routes>
        <Route element={<Login />} path="/" />
        <Route
          element={user?.data.user.isAdmin && <Category />}
          path="/category"
        />
        <Route element={<div>You are not admin</div>} path="/error" />
        <Route
          element={user?.data.user.isAdmin && <CategoryCourses />}
          path="/category/:id"
        />
        <Route
          element={user?.data.user.isAdmin && <CourseVideos />}
          path="/courseVideos/:id"
        />
      </Routes>
  
  );
}

export default App;
