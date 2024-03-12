
function Cards() {

    // Example state and function in a parent component (e.g., Cards.js or App.js)

    const [totalCalories, setTotalCalories] = useState(0);

    const onAddFood = (calories) => {
        setTotalCalories(totalCalories + calories);
        console.log("clicked the add food button! that's it sorry :(");
    };
    // Pass onAddFood down to each CardItem, where it's invoked with specific calorie values

    // Example state and modal opening function in a parent component
    const [isCommentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // comments button
    // const onOpenComments = (itemId) => {
    //     setSelectedItemId(itemId);
    //     setCommentsModalOpen(true);
    //     console.log("clicked the comments button! that's it sorry :(");
    //     // 🍅🍅🍅🍅🍅: IMPLEMENT OPENING THE COMMENTS
    // };

    // get userID from local token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Decode the token to extract user information
            const decodedToken = jwtDecode(token);
            // Extract the userID from the decoded token
            return decodedToken.id; // Adjust the property name as per your JWT payload
        }
        alert("Unable to get this user's authToken");
        return null; // Token not found or invalid
    };

    // Add post to calories button!
    const onAddCalories = async (foodId, card_calories) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/count/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers you need, such as authorization headers
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                foodId: foodId, 
                calories: card_calories
            })
        });
        const data = await response.json();
        return data;
    };

    // 🌼 SEARCH BAR 🌼
    const [searchTerm, setSearchTerm] = useState('');

    // Filter cardsData based on search term
    const filteredCards = cardsData.filter(card =>
        card.poster.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const functionSetSearchTerm = (inputVal) => {
    //     setSearchTerm(inputVal);
    // };
    // Render the cards dynamically
    return (
        <div className='cards'>
            <h1> ⭐️ Check out the recent Dining Hall Menu Items! ⭐️ </h1>
            <input
                type="text"
                placeholder="🔍 Search by dining hall, food, or description..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {/* {cardsData.map((card, index) => (
                            <CardItem
                                key={index}
                                src={card.image}
                                name={card.name}
                                description={card.description}
                                calories={card.calories}
                                dining_name={card.poster}
                                onAddCalories={() => onAddCalories(card.id, card.calories)} // Pass card.id to onAddCalories
                                // onOpenComments={onOpenComments} // 🍅🍅 I still need to implement smh
                                food_id={card.id}
                                likes_array={card.likes.length}
                            />
                        ))} */}
                        {/* {filteredItems.map((item) => (
                            // Render your item component here, passing the item as a prop
                        ))} */}

                        {/* Now map over filteredCards instead of cardsData */}
                        {filteredCards.map((card, index) => (
                            <CardItem
                            key={index}
                            src={card.image}
                            name={card.name}
                            description={card.description}
                            calories={card.calories}
                            dining_name={card.poster}
                            onAddCalories={() => onAddCalories(card.id, card.calories)}
                            food_id={card.id}
                            likes_array={card.likes.length}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;