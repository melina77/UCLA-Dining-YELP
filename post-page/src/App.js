import logo from './logo.svg';
import {useState} from 'react';
import {useRef} from 'react';

import './App.css';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle the image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };

  // Function to trigger file input on button click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <button className="pics" onClick={handleButtonClick}>Add an image</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
      />
      {image && <img src={image} alt="Uploaded" style={{ width: '100%', marginTop: '20px' }} />}
    </div>
  );
}
function Post(){
  const handleClick = () => {
    return;
  };
 return(
  <button className="post" onClick={handleClick}>Save & Post</button>
 ) 
}




function App() {
  const [inputValue, setInputValue] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 20;

  // Function to update the state with the input's current value
  const HandleInputChange = (event) => {
    const userInput = event.target.value;
    const words = userInput.trim().split(/\s+/);
    const wordsFiltered = words.filter(Boolean); // Filter out empty strings to avoid counting them

    // If the number of words is within the limit, update the state
    if (wordsFiltered.length <= maxWords) {
      setInputValue(userInput);
      setWordCount(wordsFiltered.length);
    } else {
      // Optionally, provide feedback to the user that the word limit has been reached
      alert(`Maximum word count of ${maxWords} exceeded.`);
      // Trim the input value to the first N words within the limit
      const trimmedInput = wordsFiltered.slice(0, maxWords).join(' ');
      setInputValue(trimmedInput);
      setWordCount(maxWords); // Update the word count to maxWords
    }
  };


  return (
      <div className="App">
      
        <header className="App-header">
          Make a Post
          <hr />
          <input
          type="text"
          value={inputValue}
          onChange={HandleInputChange}
          placeholder="Enter title..."
        />
          <ImageUpload />
          <hr />
          <input
          type="text"
          value={inputValue}
          onChange={HandleInputChange}
          placeholder="Add description..."
        />
        <hr />
        <Post/ >

        </header>
        </div>
  );
}

export default App;
