import {useState} from 'react';
import {useRef} from 'react';

import './App.css';
import './nav.css';
import './header.css';

// function Header() {

//   return (
//     <div>
//       <header>
//         <div className="logo-container">
//           <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
//         </div>
//         <nav>
//           <a className="active" href="#home">Home</a>
//           <a className="active" href="#calorie-counter">Calorie Counter</a>
//           <a className="active" href="#contact">Contact</a>
//           <a className="active" href="#logout">Logout</a>
//         </nav>
//       </header>
//     </div>
//   )
// }

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
      {image && <img src={image} alt="Uploaded" style={{ width: '75%', marginTop: '20px' }} />}
    </div>
  );
}



function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [calories, setCalories] = useState('');
  const fileInputRef = useRef(null);
  const maxWords = 20;

  // Function to update the state with the input's current value
  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
  // Event handler for the first input field
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
      adjustHeight(inputValue);
    }
  };
  // Event handler for form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', inputValue);

    // Include image if provided
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]); // Ensure the image is included
    }

    // Include description
    formData.append('description', inputTwo);

    // Include calories
    formData.append('calories', calories);
    

   // try {
      // Replace 'your-server-endpoint' with your actual endpoint URL
  //    const response = await fetch('your-server-endpoint', {
    //    method: 'POST',
      //  body: formData,
     // });
//      const result = await response.json();
  //    console.log(result);
      // Handle success
   // } catch (error) {
     // console.error('Error submitting form:', error);
      // Handle error
    //}
  }


  return (
      <div className="App">
        <h1> 🌸 Post a Food Item for the Current Meal Period 🌸 </h1>
        <div className="App-header">
          <div className="box-border" >
          <form id="postForm" onSubmit={handleSubmit}>

            {/* input box for food name */}
            <textarea
            type="text"
            value={inputValue}
            onChange={HandleInputChange}
            placeholder="Enter name of the dish..."
            style= {{
              width: '350px',
              height: '30px',
              fontFamily: 'monospace'
            }}
            />
            <ImageUpload fileInputRef={fileInputRef}/>

            {/* input box for description */}
            <textarea
              type="text"
              placeholder = "Add description..."
              value={inputTwo}
              onChange={(e) =>{
                setInputTwo(e.target.value);
                adjustHeight(e);
              }}
              style={{ 
                // overflowY: 'hidden',
                width: '500px',
                height: '50px',
                resize: 'none',
                fontFamily: 'monospace'
              }}
            />

            {/* input box for calories */}
            <div>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories..."
              />
            </div>
          <div>
            <button type="submit">Save & Post</button>
          </div>
        </form>
        </div>
        </div>
        </div>
  );
}

export default function PostPage(){
  return(
    <div>
      {/* <Header /> */}
      <App />
    </div>
  )
};
