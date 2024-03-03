fetch('http://example.com/api/items')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Process and display the data in your UI
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });