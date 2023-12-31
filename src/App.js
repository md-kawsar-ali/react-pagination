import React, { useState, useEffect } from 'react';
import Pagination from './component/Pagination';
import './App.css';

function App() {
  // State for Loaded Posts
  const [posts, setPosts] = useState([]);

  // Required States for pagination
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const skip = (currentPage - 1) * itemsPerPage;

  // Fetching Posts data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${itemsPerPage}`);
        const data = await response.json();
        setPosts(data.posts);
        setTotalItemsCount(data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentPage, skip, itemsPerPage]);

  // Go to top
  const gotToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // HandlePageChange
  const handlePageChange = async (newPage) => {
    await setCurrentPage(newPage);

    gotToTop();
  }

  return (
    <div className='App'>
      <h1>ReactJS Pagination</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h4>{post.id}.</h4>
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 144)}...</p>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalItemsCount={totalItemsCount}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        range={1} // Range: Number of items before & after active
      />
    </div>
  );
}

export default App;
