#  <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear.jpeg" height="75" width = "100"> BruinGrub <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear.jpeg" height="75" width = "100">
BruinGrub is a full stack web application that allows UCLA students to see what kinds of food are being offered at the #1 rated university dining hall, leave reviews on food by adding comments, and also keep track of their calories for the day.
## Table of Contents
1. [Components](#components)
2. [Features](#features)
3. [Setup](#setup)
4. [Commands](#commands)  

## Components
### Backend: Node.js, Express.js
* Our backend handles requests for user authentication, dining hall information, food details, comments and calorie tracking. Some of the key APIs are listed in the following:
  * User Authentication: allows user registration and login to ensure secure access.
  * Dining hall and food truck uploading: only dining hall users and food trucks are able to upload food items and calorie information to the database.
  * Calorie tracker: users can add food items to their daily calorie count to keep track of the total intake throughout the course of the day.
    
### Frontend: React.js, CSS, HTML
* Our frontend offers a dynamic and user-friendly interface featuring a multitude of pages that the user can switch between including:
  * The main page, where food is displayed in chronological order from the most recent to oldest posts.
  * All users can search through posts on the main page.
  * The calorie-counter page, which allows student users to add and remove food from their calorie counter, displaying their total calorie intake.
    * Dining hall users do not have access to this page.
  * The comments page, which can be reached by clicking on the comments button under each post.
    * Only student users can comment on posts, they can add images to their comment as well
  * The posting page is for dining hall users to post, where they can upload an image, title, and a description for each post. 
    * Students do not have access to this page.
      
### Datastore: mySQL
* We chose mySQL for the datastore because a lot of our features require us to handle various data types and relationships, especially regarding the users, dining options, comments, and calorie count. Along with allowing us to provide comprehensive security features and easy scaling, mySQL supports the complex queries and transactions that are constantly being called on both our calorie tracker and user comments page. Since we wanted to create an interactive and user-focused dining review platform for UCLA students, mySQL offered the best features in achieving this goal.
## Features:
* ### Dining hall/Food Trucks as users: 
  * As a user, dining halls and food trucks will be able to upload dishes from their menu along with the calorie count for each dish.
* ### Students as users:
  * Students are able to like posts (which are the specific dishes) of dinings halls/food trucks and can leave a review on each food. 
* ### Calorie counter/tracker:
  * Students will be able to keep track of how many calories they have consumed with the calorie counter by simply adding the food of choice to their tracker with the button found underneath the food item. 
## Setup
To run a local instance of BruinGrub, first clone or download a copy of this repository. Follow the commands below to initialize a local instance of each part of the application.
## Commands
To clone the repository, run:  
`git clone https://github.com/melina77/UCLA-Dining-YELP.git`  
### Shell Script  
We created a shell script to setup both the dependencies for the backend server and frontend application. Some of the backend dependencies include express, cors, and sequelize. The frontend dependencies include React.js and react-router-dom. To run the script, use the following commands:  
```
```
The backend server will be available on http://localhost:8080, while the frontend application should pop up automatically in the browser on http://localhost:3000.  
# Contributors
Lucas Thai, Melina Eftekhari, Michelle Sun, Faith Nguyen, Phuc Truong
