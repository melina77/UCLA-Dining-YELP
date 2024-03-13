#  <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear.jpeg" height="45" width = "75"> BruinGrub <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear.jpeg" height="45" width = "75">
BruinGrub is a full stack web application that allows UCLA students to see what kinds of food are being offered at the #1 rated university dining hall, leave reviews on food by adding comments, and also keep track of their calories for the day.
## Table of Contents
1. [Components](#components)
2. [Features](#features)
3. [Setup](#setup)
4. [Commands](#commands)  

## Components
### Backend: Node.js, Express.js
* Our backend handles requests for user authentication, dining hall information, food details, comments and calorie tracking. Some of the key APIs are listed in the following:
  * User Authentication: Allows user registration and login to ensure secure access.
  * Dining hall and food truck uploading: Only dining hall users are able to upload food items and calorie information as posts to the database.
  * Calorie tracker: Only student users can add food items to their daily calorie count to keep track of the total intake throughout the course of the day. They can also remove food items from their calorie counter.
    
### Frontend: React.js, CSS
* Our frontend offers a dynamic and user-friendly interface featuring a multitude of pages that the user can switch between including:
  * The main page, where food is displayed in chronological order from the most recent to oldest posts.
  * All users have access to the search bar, they can search through posts on the main page.
  * The calorie-counter page allows student users to add and remove food from their calorie counter, displaying their total calorie intake.
    * Dining hall users do not have access to this page.
  * The comments page, which can be reached by clicking on the comments button under each post.
    * All users can comment on posts, and they have the option to add images to their text comment as well.
  * The posting page is only accessible by dining hall users, allowing them to create a post where they can upload an image, title, and description.
    * Students do not have access to this page.
      
### Datastore: mySQL
* We chose mySQL for the datastore because a lot of our features require us to handle various data types and relationships, especially regarding the users, dining options, comments, and calorie count. Along with allowing us to provide comprehensive security features and easy scaling, mySQL supports the complex queries and transactions that are constantly being called on both our calorie tracker and user comments page. Since we wanted to create an interactive and user-focused dining review platform for UCLA students, mySQL offered the best features in achieving this goal.
## Features:
* ### Dining hall/Food Trucks as users: 
  * As a user, dining halls and food trucks will be able to upload dishes from their menu along with the calorie count for each dish. They are not able to access features that are meant only for students such as the CalorieCounter and liking posts. On the browser for dining hall users, the add to calorie counter button will not show up and the calorie counter page will not show up in the navigation bar.  
* ### Students as users:
  * Students are able to like posts from dinings halls/food trucks and leave a comments on each post. Their comments can optionally contain an image. Additionally, students can keep track of their calories using the calorie counter page. Student do not have access to the posting page in the navigation bar, and they instead students have access to the calorie counter page.
* ### Calorie counter/tracker:
  * Students will be able to keep track of how many calories they have consumed with the calorie counter by simply adding food from a post to their tracker by pressing the button found underneath the post. After adding the food from the main page, students can navigate to the calorie-counter to view their total calorie intake as well as the number of foods they are consuming. In the calorie counter page, students also have the option to delete food items by pressing a button.
## Setup
To run a local instance of BruinGrub, first clone or download a copy of this repository. Follow the commands below to initialize a local instance of each part of the application.
## Commands
To clone the repository, run:  
`git clone https://github.com/melina77/UCLA-Dining-YELP.git`  
### Shell Script  
We created a shell script to setup both the dependencies for the backend server and frontend application. Some of the backend dependencies include express, cors, and sequelize. The frontend dependencies include React.js and react-router-dom. To run the script, use the following commands:  
```
cd UCLA-Dining-YELP
chmod +x run_bruingrub.sh
./run_bruingrub.sh
```
The backend server will be available on http://localhost:8080, while the frontend application should pop up automatically in the browser on http://localhost:3000.  
# Contributors
Lucas Thai, Melina Eftekhari, Michelle Sun, Faith Nguyen, Phuc Truong  
All group members worked collaboratively on completing this group project.
