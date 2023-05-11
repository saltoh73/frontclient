import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../app/features/categorySlice';
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const navigate = useNavigate();
  //   const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories.categories);
  const [editCategory, setEditCategory] = useState(false);
  const [editCategoryValue, setEditCategoryValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [catId, setCatId] = useState('');
  const [editValue, setEditValue] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const addCategory = async (e) => {
    e.preventDefault();
   await axios
      .post(
        'https://perfectpractice-academy.com/category/add',
        { name: inputValue },
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      )
      .then(() => alert('Category is added succefully'))
      .catch(() => alert('error'));
  };
  useEffect(() => {
     axios
      .get('https://perfectpractice-academy.com/category')
      .then((categories) => {
        dispatch(getAllCategories(categories.data));
      });
  });

  const deleteCategory = async (categoryId) => {
     await axios
      .delete(`https://perfectpractice-academy.com/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      })
      .then(() => alert('Category is deleted succefully'))
      .catch(() => alert('error'));
  };
  const updateCategory = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `https://perfectpractice-academy.com/${catId}`,
        { name: editValue },
        {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      )
      .catch(alert('Category is updated successfully'));
  };
  return (
    <div className="category">
      <h2>Categories page</h2>
      <div className="form-div">
        <form action="" onSubmit={(e) => addCategory(e)}>
          <label htmlFor="">Add Category</label>
          <input
            type="text"
            placeholder="Enter Category Name"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            required
          />
          <button type="submit">Add Category</button>
        </form>
        {editCategory && (
          <form
            className="form-edit"
            action=""
            onSubmit={(e) => updateCategory(e)}
          >
            <label htmlFor="">Edit Category</label>
            <input
              type="text"
              placeholder={editCategoryValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
            <button type="submit">Edit Category</button>
          </form>
        )}
      </div>
      <div className="all-cat">
        {categories?.map((cat) => {
          return (
            <div className="cat" key={cat._id}>
              <div>{cat.name}</div>
              <button
                className="delete-cat"
                onClick={() => deleteCategory(cat._id)}
              >
                Delete
              </button>
              <button
                className="edit-cat"
                onClick={() => {
                  setEditCategory(true);
                  setEditCategoryValue(cat.name);
                  setCatId(cat._id);
                }}
              >
                Edit
              </button>
              <button onClick={() => navigate(`/category/${cat._id}`)}>
                Category Courses
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
