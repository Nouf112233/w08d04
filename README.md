# About the project
## Social Media Website Backend
 
  This is a backend for a social media website built in Express.

# Installing Dependencies

## Node js
Follow instructions to install the latest version of Node js for your platform in the Node js docs.

## NPM Dependencies
Once you have the project in your local machine, install dependencies by running:

npm install

This will install all of the required packages.

### Key Dependencies
. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

. mongoose is an elegant mongodb object modeling for node.js.

. morgan is a HTTP request logger middleware for node.js.

. bcrypt is a A library to help you hash passwords.

. jsonwebtoken is a JSON Web Token implementation (symmetric and asymmetric).

### Setting up the variables
You have to set up some variables in the .env file, for the app to run properly.

PORT=5000
DB_URL=`Your MongoDB DB URL`
SALT=`Your SALT here`
SECRET_KEY=`Your SECRET KEY here`

 ### role:

    .user
    .admin

 ### user:

    .create post. 
    .delelt post.
    .update post.  
    .get all post. 
    .get post by id with own comment.
    .delete comment,
    .update comment.

      

 Admin:
    .get all users.
    .delete user by id.
    .delete any post by id.
    .delete any comment by id

# digrame

![Diagram.drawio img](https://github.com/Nouf112233/w08d04/blob/main/Diagram.drawio.png)

# UML

![umlw08d04 img](https://github.com/Nouf112233/w08d04/blob/main/umlw08d04.png)

