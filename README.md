# Project 4 - My Visa Check

## Overview

For the fourth project of the General Assembly Software Engineering Course, the requirement was to make a Python/Django/PostgreSQL application with full CRUD functionality.

My choice for this project was to make an application that shows you the visa requirements for your trip based on your nationalities.


## Description of the Application

Upon entering, any user can check any country as a nationality and all visa requirements depending on the country they are traveling to.

When you register you can add as many nationalities as you want and you can filter by visa type and nationality you want to use.

If the user has admin powers, they can edit the countries as they wish.

The application itself is very simple but the information is taken directly from Wikipedia which was really the complex part of the application.

## Deployed Application

[Link to the deployed version here](https://myvisacheck.netlify.app/) 

## Application Setup 

*Front-end and back-end*

The application uses separate repositories for the front-end and the back-end - [link to the back-end repository](https://github.com/Melaniemsc/MyVisaCheck-Backend/blob/main/README.md).

- The front-end is built with React and uses axios requests to talk to the back-end.

- The back-end is built with Django and uses class based views to talk to the PostgreSQL database management system.

- The back-end and front-end use JWT token-based authentication to sign in and out users.

## Seeder

To ensure that the application has all the information from Wikipedia, the following was used:
- request: to search the information in the url
- beautiful soup: does the web scraping
- pandas: data analysis


## Displays from the Application

Home page
![MyVisaCheck Home Page](assets\Home.png)

Country page
![MyVisaCheck Country Page](assets\CountryShow.png)

Summary page
![MyVisaCheck Summary Page](assets\Summary.png)



## Technologies Used

*Stack*
- Django
- PostgreSQL

*Languages*
- Python
- JavaScript
- HTML
- CSS

## The Making Of

I really enjoyed doing this project and trying something new like web scraping, it was a lot of patience, trial and error.
The results seem incredible to me.
In the future I would love to improve the visuals and add a new way to view visas