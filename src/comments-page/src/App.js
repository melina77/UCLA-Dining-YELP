import './App.css';
import {useState, useRef, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function CommentDisplay({posts, setPosts})  {
  return(      
  <div>
    {posts.map(post => (
      <div className = "comment-box">
        <div className = "text-box">
          <div key={post.id} className = "comment" style={{ marginBottom: '20px' }}>
            {post.image && <img src={`http://localhost:8080/comimages/${post.image}`} style={{ width: '15%', height: 'auto' }} />}
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

<<<<<<< HEAD
function ImageUpload({fileInputRef, reloadPage}) {
  const [image, setImage] = useState(null);
  // Function to handle the image selection
=======
  //function to handle the image selection
>>>>>>> origin/fullstack
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };

<<<<<<< HEAD
  // Function to trigger file input on button click
  const handleButtonClick = (e) => {
    e.preventDefault();
=======
  //function to trigger file input on button click
  const handleButtonClick = () => {
>>>>>>> origin/fullstack
    fileInputRef.current.click();
  };

  useEffect(() => {
    // Reset image when key changes
    setImage(null);
  }, [reloadPage]);

  return (
    <div className="App">
      <button className="pics" onClick={handleButtonClick}>Add an image</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} //hide the file input
        ref={fileInputRef}
      />
      {image && <img src={image} alt="Uploaded" style={{ width: '75%', marginTop: '20px' }} />}
    </div>
  );
}
    
function Comment() {
  const { postId } = useParams();
  const token = localStorage.getItem('authToken');
  const [reloadPage, setReloadPage] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
<<<<<<< HEAD

  // Fetch comments for specific post
=======
  //get comments from backend for display
>>>>>>> origin/fullstack
  const fetchComments = ()=> {
    fetch(`http://localhost:8080/c/${postId}`, {
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
          setPosts(data);
        })        
        .catch(error => console.error('Error fetching data:', error));
  }
<<<<<<< HEAD

  // Send submitted comments to the database
=======
  //send information to store in backend
>>>>>>> origin/fullstack
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('body', inputValue);
    
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]); // Ensure the image is included
    } else {
      formData.append('image', null);
    }

    try {
      const response = await fetch(`http://localhost:8080/c/${postId}`, {
        method: 'POST',
        body: formData,
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setReloadPage(reloadPage => !reloadPage);
        setImage(null);
        
      } else {
        console.error('Failed to create comment:', response.statusText);
      }

      setInputValue('');
      fileInputRef.current.value = null;
<<<<<<< HEAD
      CommentDisplay(posts, setPosts);
=======
      //refresh page with new comment
      fetchComments();
      CommentDisplay(posts,setPosts);
>>>>>>> origin/fullstack
      fetchComments(); 
    } 
    catch (error) {
      console.error('Error:', error);
  }
}

   useEffect(() => {
<<<<<<< HEAD
      fetchComments()
    }, [reloadPage]);
=======
      fetchComments()    
    }, []);

>>>>>>> origin/fullstack
  
  return (
    <div className="App">
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
        <ImageUpload fileInputRef={fileInputRef} key={reloadPage}/>
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
