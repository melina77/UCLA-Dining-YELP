import './App.css';
import Nav from './nav.js';
import {useState, useRef} from 'react';
import { useEffect } from 'react';


    function CommentDisplay({posts, setPosts})  {
          return(      
          <div>
            {posts.map(post => (
              <div className = "comment-box">
              <div className = "text-box">
              <div key={post.id} className = "comment" style={{ marginBottom: '20px' }}>
                {post.image && <img src={`http://localhost:8080/comimages/${post.image}`} style={{ width: '150px', height: '150px' }} />}
                <div style={{flex:1}}>
                 <div>
                  <p style={{ fontFamily: 'monospace' }}>@{post.poster}: <span className = "timestamp">{new Date(post.createdAt).toLocaleString()}</span></p>
                </div>
                <p style={{ fontFamily: 'monospace' }}>{post.body}</p>
                </div>
              </div>
              </div>
              </div>
            ))}
    
          </div>
          );
       }

function Comment() {
  const token = localStorage.getItem('authToken');
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
  const fetchComments = ()=> {
    fetch('http://localhost:8080/home/6b7a12df-de10-4bb1-93d1-f7fbfd8b66a3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setPosts(data);
        })        
        .catch(error => console.error('Error fetching data:', error));
  }
  const handleSubmit = async (e) => {
    console.log('submmiting data');
    e.preventDefault();
    const formData = new FormData();
    formData.append('body', inputValue);
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }    
    try {
      const response = await fetch('http://localhost:8080/home/6b7a12df-de10-4bb1-93d1-f7fbfd8b66a3', {
        method: 'POST',
        body: formData,

        headers: {
         'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
      setInputValue('');
      setImage(null);
      fileInputRef.current.value = null;
      fetchComments();
      CommentDisplay(posts,setPosts);
      fetchComments();
       
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

   useEffect(() => {
      fetchComments()
        
    }, []);

  
  return (
    <div className="App">
      {/* <div className="BG-header">
          BruinGrub  
        </div>
        <hr /> */}
      <h1> ~ Here is the comment section! ~ </h1>
      <p></p>
       <CommentDisplay posts={posts} setPosts={setPosts} />
           <div>

      </div>
      <p />
      <div className="App-header">
      <div className = "box-border">
      <form id="postForm" onSubmit={handleSubmit}>
          <textarea 
          type = "text"
          maxLength={300}
          placeholder='Add a comment'
          size = "30"
          value = {inputValue}
          onChange={(e) =>{
            setInputValue(e.target.value);
            adjustHeight(e)
          }}
          style={{ 
              overflowY: 'hidden',
              width: '500px',
              height: '55px',
              resize: 'none',
              fontFamily: 'monospace'
          }}
          
          />
      <p/>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ 
          padding: '10px 20px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          background: '#8FaBFF',
          
        }}
      />

      <p/>
      {image && <img src={image} alt="Uploaded" style={{ width: '200px', height: '200px' }} />}

      <p>
      <button className="submit" style={{fontFamily: 'monospace'}}>Save & Post</button>
      </p>
        </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
    <div>
      <Comment />
    </div>
    </>
  );
}

export default App;
