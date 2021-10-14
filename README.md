# Nexus

> Authors:  
> Rajbir Johar  
> Isaac Curiel  
> Florian Catalan  
> Robert Rivera  
> Brian Coffey

## Table of Contents
1. [Overview](#overview)
2. [Usage](#usage)
3. [How To Run](#how-to-run)
4. [Diagrams](#diagrams)
5. [Stack & Dependencies](#stack-and-dependencies)

## Overview

> Summary of Project, purpose, stack, etc.

<img alt="Next JS" src="https://img.shields.io/badge/nextjs-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white"/> <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/> <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" /> <img alt="Prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/> <img alt="Stack Overflow" src="https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white"/>

## Team

> List of pictures, names, and relevant websites

### Rajbir Johar

<img align="left" src="/documentation/images/rajbir.png" alt="image of Rajbir Johar" width="75" height="75">

Hey I'm Rajbir! You can find out more about me on my [Portfolio](https://rajbir.io/) or my [Github](https://github.com/rajbirjohar). Currently, I'm interested in automotives, especially german cars, building bespoke mechanical keyboards, and web development and design.

<br/>

### Isaac Curiel

<img align="left" src="/documentation/images/isaac.png" alt="image of Isaac Curiel" width="75" height="75">

Hey there, I'm Isaac! Some of my interests include stationery, mainly fountain pens, and sports (Go Rams!). Check out my [Github](https://github.com/isaac-18) for more. 

<br/>

### Florian Catalan
<img align="left" src="/documentation/images/florian.png" alt="image of Florian Catalan" width="75" height="75">

Hello, I'm Florian. 4th year CS major at UCR and you can find more from me at my [Github](https://github.com/floriancat). I enjoy playing video games, watching movies/shows designing, and editing in my free time. 

<br/>

### Brian Coffey
<img align="left" src="/documentation/images/brian.png" alt="image of Brian Coffey" width="75" height="75">

Hey, I'm Brian! I am a 4th year Computer Science major at UCR, and I am applying for my Masters in Education. Follow my [Github](https://github.com/brianpcoffey) to keep up to date with my projects! I also have many interests, such as bouldering, surfing, coffee, and really just trying anything new! 

<br/>

### Robert Rivera
<img align="left" src="/documentation/images/robert.png" alt="image of Robert Rivera" width="75" height="75">

Hello, I'm Robert! I'm a 4th year Computer Science major at UCR. If you are interested in learning more about me, check out my [LinkedIn](https://www.linkedin.com/in/robertrivera288/) and [Github](https://github.com/Robert288) pages. 

<br/>

## Usage

> Screenshot or GIF of website

### How To Run

1. Clone or fork this project on your local machine.
2. Ensure you have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed.
3. Within the root directory, run `yarn` or `yarn install` to install all required packages needed for this project.
4. Then run `yarn run dev` to start your local server at `http://localhost:3000` and enter this address in your favorite browswer.
5. From here, you can edit and poke around and watch your changes hot update.

⚠️ **Important: In order to achieve full functionality, you will need to configure your environment variables as explained below.**

## Configuration

### Set up a MongoDB database

1. Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).
2. Once you have created your cluster and database, select **Connect** to begin connecting your frontend to your database.
3. You will need to create a database user and note down the username and password.
4. Then select the method **Connect Your Application** where you will be prompted with a link as represented below.
```
mongodb+srv://<user>:<password>@cluster0.qhvo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
5. This link represents your **MONGODB_URI** where you will replace `<user>`, `<password>`, and `myFirstDatabase` with your respective values without `<>`.

### Set Up Environment Variables

Rename `.env.example` to `.env.local`

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string.
- `MONGODB_DB` - The name of your Database.
- `NEXTAUTH_URL` - The canonical url of your website. Your local environment should be `http://localhost:3000`. Your production should be your actual domain.
- `GOOGLE_CLIENT_ID` - The ID generated by the Google API dashboard when you are setting up OAuth.
- `GOOGLE_CLIENT_SECRET` - The password by the Google API dashboard when you are setting up OAuth.

⚠️ **Important: The `.gitignore` should already filter the .env files but just in case, never commit your environment variables.**

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Diagrams

> UI/UX Mockups/State Diagrams

### Frontend Structure

Overall System Diagram

```bash
├── master
│   ├── components
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── ...
│   ├── pages
│   │   ├── index.js
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── ...
│   │   ├── ...
│   ├── lib
│   │   ├── mongodb.js
│   │   ├── ...
│   ├── styles
│   │   ├── global.css
│   │   ├── header.module.css
│   │   ├── layout.module.css
│   │   ├── ...
│   ├── ...
├── staging
│   │   ├── pages
│   │   ├── components
│   │   ├── lib
│   │   ├── styles
│   ├── ...
└── .gitignore
```
