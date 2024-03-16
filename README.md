#  <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear-transparent.png" height="45" width = "75"/> BruinGrub <img src = "https://raw.githubusercontent.com/melina77/UCLA-Dining-YELP/fullstack/public/bruin-bear-transparent.png" height="45" width = "75"/>
BruinGrub is a full stack web application that allows UCLA students to see what kinds of food are being offered at the #1 rated university dining hall, leave reviews on food by adding comments, and also keep track of their calories for the day.

The link to our GitHub Repository: https://github.com/melina77/UCLA-Dining-YELP

Contributors and GitHub usernames:
1) Michelle Sun - 22sunm50
2) Phuc Truong - PTruong9090
3) Melina Eftekhari - melina77
4) Lucas Thai - Lukerulez29
5) Faith Nguyen - faithnguyen7

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
  * Calorie-counter: Only student users can add food items to their daily calorie count to keep track of the total intake throughout the course of the day. They can also remove food items from their own counter.
    
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
* We chose mySQL for the datastore because a lot of our features require us to handle various data types and relationships, especially regarding the users, dining options, comments, and calorie count. Along with allowing us to provide comprehensive security features and easy scaling, mySQL supports the complex queries and transactions that are constantly being called on both our calorie-counter and user comments page. Since we wanted to create an interactive and user-focused dining review platform for UCLA students, mySQL offered the best features in achieving this goal.
## Features:
* ### Dining hall/Food Trucks and Students as separate users: 
  * As a user, dining halls and food trucks will be able to upload dishes from their menu along with the calorie count for each dish. They are not able to access features that are meant only for students such as the calorie-counter and liking posts. On the browser for dining hall users, the add to calorie-counter button will not show up and the calorie-counter page will not show up in the navigation bar. Students are able to like posts from dinings halls/food trucks and leave a comments on each post. Their comments can optionally contain an image. Additionally, students can keep track of their calories using the calorie counter page. Student do not have access to the posting page in the navigation bar, and they instead have access to the calorie-counter page.
* ### Liking and Commenting on Posts:
  * Both students and dining halls have the ability to leave comments on posts. When clicking on the comments button at the bottom of each post on the main page, users are redirected to a page containing past comments from users. Each of these comments documents the name of the user who posted the comment, the text of the comment, and an image (optional). In addition, posts on the main page can be liked by student users. On each of these posts, the current number of likes is displayed and the like button is marked yellow if a student user has already liked the post. There is also functionality for unliking posts. If a student user is logged in and has previously liked a post (like button is yellow), then clicking the like button again will remove their like from the post.
* ### Calorie-counter:
  * Students will be able to keep track of how many calories they have consumed with the calorie counter by simply adding food from a post to their tracker by pressing the button found underneath the post. After adding the food from the main page, students can navigate to the calorie-counter to view their total calorie intake as well as the number of foods they are consuming. In the calorie-counter page, students also have the option to delete food items by pressing a button.
## Setup
To run a local instance of BruinGrub, first clone or download a copy of this repository. Follow the commands below to initialize a local instance of each part of the application.  
**NOTE:** The final version of Bruingrub is on the *'fullstack'* branch, which is the default branch.
### Setting up MySQL Datastore  
To start the backend portion, you must set up a MySQL server. One way to do this is by downloading mySQL workbench if not previously downloaded. Go to 
https://dev.mysql.com/downloads/mysql/ and download the package compatible with your machine. Next, go to https://dev.mysql.com/downloads/workbench/ and download the package compatible with your machine. Open up the workbench and create a new connection by clicking the "+" button next to "MySQL Connections" and typing "BruinGrub" into the "Connection Name" field. Now, we want to set up the schema. First, open your newly created connection by clicking on the square that says "BruinGrub". Once it is open, locate in the top left bar a cylinder icon with a "+" (you can double check this is correct by hovering over the icon and it should say "Create a new schema in the connected server"). Once you click the button to create a schema, you must name it "cs35l-proj" in the "Schema Name: " field. Do not modify any other fields, simply click "Apply" and then you can click "Apply" again in the bottom right corner of the next pop-up. Then you can click "Close". Congratulations, your MySQL Workbench has been set up!

(Alternatively, you can use other services to host your MySQL database)


## Commands
Node.js must be installed along with Git.

To clone the repository, run:  
`git clone https://github.com/melina77/UCLA-Dining-YELP.git`  
After cloning the repository, locate the config.json file found in <i>server</i> under <i>config</i>, where you can specify your configurations for connecting to your database. If your mySQL root password is not <i>password</i>, change the "password" to be your mySQL root password.

You only need to change the fields that are under "development" and do not modify the "test" or "production" fields. In our example, when we were setting up MySQL Workbench, we named the "username: " as "root", the "password: " as "password", and the "database: " as "cs35l-proj".  


### Shell Script  
We created a shell script to setup both the dependencies for the backend server and frontend application. Some of the backend dependencies include express, cors, and sequelize. The frontend dependencies include React.js and react-router-dom. To run the bash script on Linux, use the following commands:  
```
cd UCLA-Dining-YELP
chmod +x runbruingrub.sh
./runbruingrub.sh
```
The backend server will be available on http://localhost:8080, while the frontend application should pop up automatically in the browser on http://localhost:3000.  
# Contributors
Lucas Thai


Melina Eftekhari
1. Frontend and connected to Backend for Login/Registration Page.
2. Frontend styling changes to stay consistent across the whole site.
3. Frontend and backend of search feature.
4. Frontend additions to Navigration/Header Bar.
5. Frontend additions to Calorie Counter.


Michelle Sun
1. Frontend and connected to Backend for Login/Registration Page
2. Frontend and connected to Backend for Main Page (including the Search Bar)
3. Frontend for Comments Page
4. Frontend for Post Page

Faith Nguyen
1. Frontend and connected to Backend for Comments Page
2. Frontend for Posts Page

Phuc Truong
1. Backend and Frontend for Calorie Counter
2. Backend and Frontend for Navigation/Header Bar
3. Backend for Post Page

Lucas Thai
1. MySQL database structure in server/models folder
2. Backend routers for calorie counter, comments, food, likes, and users
3. Authentication and file upload system middlewares

All group members worked collaboratively on completing this group project.
