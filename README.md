# Postgram

## Deployed link

- I deployed the project on netlify.
- [Link](https://postgram-1.netlify.app/)

**Note: [for database structure and Approach](https://hackmd.io/@rWRGLjFkSDSnN-Oi90ihQw/B1Q5umZ9a)**

## Description

Postgram is a discussion forum where you can post and discuss anonymously with anyone.

- Motive to develop this app is to allow users to express their thoughts without any fear.
- I learned about how to manage RDBMS and fetching proper queries from database.

## Skills

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Installation

- Clone the repo.
- Using `npm install` install all dependencies.
- Start development server `npm run start`

## Features

- Authentication
- Project Mangement
- Drag and drop feature to change status of task.
- Mutliple role

## Features

- OTP Authentication
- Create post
- Comment on post
- View all post

# Database Structure

- **User**

| Attribute     | Type   |
| ------------- | :----- |
| Name          | String |
| Email(unique) | String |

- **OTP**

| Attribute     | Type   |
| ------------- | :----- |
| Email(unique) | String |
| otp           | String |

**It is used to verify email address and it get deleted after 5 minutes from creation.**

- **Post**

| Attribute     | Type   |
| :------------ | :----- |
| \_id          | String |
| Author_id     | String |
| Title         | String |
| Body          | String |
| Comment_Count | Number |
| Reply_Count   | Number |

**Author_id is referenced to Email of User**

- **Comment**

| Attribute | Type   |
| :-------- | :----- |
| \_id      | String |
| Author_id | String |
| Post_id   | String |
| Body      | String |

**Author_id is referenced to Email of User**
**Post_id is referenced to \_id of Post**

- **Reply**

| Attribute  | Type   |
| :--------- | :----- |
| \_id       | String |
| Author_id  | String |
| Post_id    | String |
| Comment_id | String |
| Body       | String |

**Author_id is referenced to Email of User**
**Post_id is referenced to \_id of Post**
**Comment_id is referenced to \_id of Comment**

## API

- Used axios library to interact with APIs.

### For User

- **login**
  - Takes email as input data and verifies the user.
- **signup**
  - Takes email and username as input data and creates an account for user.
- **sendotp**
  - Takes email as input and sends and otp which is verified in login and signup API to verify emails.

### For Post

- **GetAllPostList**
  - To get all post from every user.
- **GetPostList**
  - TO get only your posts.
- **CreatePost**
  - TO create a new post.
- **GetPost**
  - To get a specific post using post_id.
- **AddComment**
  - To add a comment on a post
- **AddReply**
  - To add a reply on a comment of a post.
