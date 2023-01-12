# Admin Dashboard for SparkRentals Project
## Content
- [About](#about)
- [Download](#download)
- [Usage](#usage)
- [License and Tools](#license-and-tools)
## About
This project is created by 4 students who attend Blekinge Institute of Technology in web programming. We were given the task of creating a system for a scooter company where we would, among other things, create a mobile-adapted web app for the customer, administrative web interface, a simulation program for the electric scooters, an intelligence program in the bicycle and a Rest API that distributes and retrieves information from the entire system and stores the information on a database.

The entire project is available at: https://github.com/FalkenDev/V-Team-SparkRentals
### Background
Admin dashboard will be a website where admin can log in and manage the system. Admin will be able to manage all cities, scooters and user accounts in the system. On the first page, it should be possible to view general information about all registered cities, scooters and users. There will be sub-pages for map, urban areas, scooters and customers. Each page has a purpose for the user to be able to oversee and manage the area the page covers.

The page will be made with ReactJs and retrieve data from our REST API. Tailwind will be used as CSS framework for the style. The React router library will be used for navigation because React does not have page routing from the start.

<img src="/public/adminDesign.png" alt="Admin Dashboard Design" height="400"/>

## Download
### Required environment variables
***.env:***

    # Rest API
    REACT_APP_REST_API_KEY="React API KEY"
    REACT_APP_API_URL="http://localhost:8393/v1"

    # Configs
    # For the Live Preview Map Update
    REACT_APP_MAP_UPDATE_INTERVAL_BOOLEAN=1
    REACT_APP_MAP_UPDATE_INTERVAL=1000

### Run it localy
- Fork the project / donwload the project.

>npm install

- Create .env file and insert the environment variables and change the inputs.

>npm start

### Run it on Docker
***OPS! Don't forget to send your env file in docker run command***
> docker run -it jamestjata01/spark-rentals-admin-dashboard:latest

## Usage
To use the Admin Dashboard: http://localhost:3000

## License and Tools
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Admin-Dashboard/badges/quality-score.png?b=dev)](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Admin-Dashboard/?branch=dev)  [![Build Status](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Admin-Dashboard/badges/build.png?b=dev)](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Admin-Dashboard/build-status/dev)

