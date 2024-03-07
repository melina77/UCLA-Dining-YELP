//get json file of MySQL database and use that data for implementing the search below
//using example database for now in order to make it work

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")
//above is imported from the html

let users = []


searchInput.addEventListener("input", (e) =>{
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)//checks if the search query is included, hides it if its not
        user.element.classList.toggle("hide", !isVisible)
    })//converting toLowerCase() gets rid of case sensitivity
    
    console.log(users)
})//this saves each search query as you type and searches to render new info for each letter you type

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json()
.then(data => {
    user = data.map(user => {//map is used instead of forEach since the values are being returned to populate the users array
        const card = userCardTemplate.textContent.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = user.name
        header.textContent = user.email
        userCardContainer.append(card)
        return {name: user.name, email: user.email, element:card}//shows all these elements for each user
        //gets the info from each of those sections
    //above line gets the content from the html user content and clones all of the content inside of it
    //.children() gives the information from inside of the card
    })
}))//gets response into the data variable in json format
    
//javascript populated the "user cards" for you

