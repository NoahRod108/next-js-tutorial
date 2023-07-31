## Introduction

This is a test project from JavaScript Mastery on YouTube. This is a project to learn Next.JS and implement new features on my own.

## Video Features

- #tag clickable to find similar posts
- Usernames clickable to navigate to the user profile
- Search bar (functional)
- Create users
- Create Posts
  - Edit Post
  - Delete Post
- Post feed

## Working Features
- All video features
- Following Users
- A feed to see who you follow
- Edit your own profile
      
## Coming Features - Added by me

- [x] Edit profile
- [ ] Loading icons
- [ ] Like posts
- [x] Follow users
- [ ] unfollow users

## Discovered Issues

* Usernames can't be the same
  * FIXED - added numbers to the end of the username if the username already exists.

 *Can follow the same user multiple times.
   *This is an issue with the model not restricting the 'following' array to be unique.
