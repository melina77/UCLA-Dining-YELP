import './App.css';
import Nav from './nav.js';
import {useState, useRef} from 'react';
import { useEffect } from 'react';

function ImageUpload({fileInputRef}) {
  const [image, setImage] = useState(null);
  // Function to handle the image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-button">
      <button className="pics" onClick={handleButtonClick} style={{fontFamily: 'monospace'}}>Upload an image</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
      />
      <div>
      {image && <img src={image} alt="Uploaded" style={{ width: '30%', marginTop: '20px' }} />}
      </div>
    </div>
  );
}

function Comment() {
  const token = localStorage.getItem('authToken');
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  
  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object to hold the data to submit
    const formData = new FormData();
    // Append the selected file to the FormData object. Ensure that `fileInputRef.current.files[0]` exists
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }
    
    formData.append('body', inputValue);

    fetch('http://localhost:8080/home/a9ff0392-3fa3-4b7d-8e1e-fb05b66e4f50', {
      method: 'POST',
      body: JSON.stringify({body: inputValue}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };


  const CommentDisplay = () => {
    const [posts, setPosts] = useState([
    ]);

  useEffect(() => {
      fetch('http://localhost:8080/home/a9ff0392-3fa3-4b7d-8e1e-fb05b66e4f50', {
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
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching data:', error));
        
    }, []); // Empty dependency array means this effect runs once on component mount
  

    return (
      <div className = "comment-box">
        <div className = "text-box">
        {posts.map(post => (
          <div key={post.id} className = "comment" style={{ marginBottom: '20px' }}>
            {post.imageURL && <img src={post.imageURL} alt={post.caption} style={{ width: '20%', marginTop: '10px' }} />}
            <div style={{flex:1}}>
              <div>
            <p style={{ fontFamily: 'monospace' }}>@{post.username}: <span className = "timestamp">{post.timestamp}</span></p>
            </div>
            <p style={{ fontFamily: 'monospace' }}>{post.caption}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  }

  

  
  return (
    <div className="App">
      {/* <div className="BG-header">
          BruinGrub  
        </div>
        <hr /> */}
      <h1> ~ Here is the comment section! ~ </h1>
      <CommentDisplay />
      <p></p>
      <CommentDisplay />
      <p />
      <div className="App-header">
      <div className = "box-border">
      <form id="postForm" onSubmit={handleSubmit}>
      <textarea classname= "add-comment"
            placeholder = "Add a comment..."
            value={inputValue}
            onChange={(e) =>{
              setInputValue(e.target.value);
              adjustHeight(e);
            }}
            style={{ 
              overflowY: 'hidden',
              width: '500px',
              height: '55px',
              resize: 'none',
              fontFamily: 'monospace'

            }}
        />
        <ImageUpload fileInputRef={fileInputRef}/> 
        <button className="submit" style={{fontFamily: 'monospace'}}>Save & Post</button>
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
