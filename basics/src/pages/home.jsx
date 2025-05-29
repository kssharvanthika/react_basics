import { useState, useEffect } from 'react';
import navbar from '../component/navbar';
import Navbar from '../component/navbar';
function Home() {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1') // Example API
      .then(response => response.json())
      .then(data => setPost(data));
  }, []);

  return (

    <div style={{ padding: '1rem' }}>
         
      <h1>🏠 Home Page</h1>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <div style={{ marginTop: '2rem' }}>
        <h2>Fetched Post:</h2>
        {post ? (
          <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
