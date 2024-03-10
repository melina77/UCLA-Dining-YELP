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
      {image && <img src={image} alt="Uploaded" style={{ width: '70%', marginTop: '20px' }} />}
      </div>
    </div>
  );
}

function Comment() {
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
    // Append the caption or description text to the FormData object
    formData.append('caption', inputValue);

    // Replace 'https://your-backend.com/api/posts' with your actual API endpoint
    fetch('https://localhost:8080/c/', {
      method: 'POST',
      body: formData,
      // Omit Content-Type header, let the browser set it with the correct boundary for multipart/form-data
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };


  const CommentDisplay = () => {
    const [posts, setPosts] = useState([
      {
      id: 1,
      imageURL: './images/logo512.png',
      caption: 'This burger was so good. 10/10 would come here again. De Neve is the best dining hall.',
      username: 'happybruin',
      timestamp: '2:00 PM'
      }
    ]);

  useEffect(() => {
      fetch('https://localhost:8080/c/')
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
            <p style={{ fontFamily: 'monospace' }}>@{post.username}: <span style={{ color: '#888888', fontSize: '0.8em' }}>{post.timestamp}</span></p>
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
      <div className="App-header">
      <div className = "box-border">
      <form id="postForm" onSubmit={handleSubmit}>
      <textarea
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
    <Nav />
    <div>
      <Comment />
    </div>
    </>
  );
}

export default App;
