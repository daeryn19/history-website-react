# History Website with React

This is a JavaScript-based website with three essential pages: Login, Signup and Main browsing page, where users can read about different historical events based on periods, region or country.

## Technologies and Functionalities

The coding language used for the frontend (`index.js` and all the other pages) is JavaScript (React). The styles of the pages are defined using CSS files for each page.

The backend is built using Node.js and Express. User authentication is handled with API endpoints. All registered users are stored in a MongoDB database.

Make sure that you have the required packages installed:
    ```npm install react react-dom react-router-dom``` - for frontend
    ```npm install express cors bcryptjs``` - for backend
Other required dependencies should be installed after running ```npm install``` and are listed in the `package.json` file.

## CI/CD Integration

- Currently, the project is being developed for including a CI/CD pipeline using Docker and Jenkins.
- The project will automatically build and test the application on each commit.
- Push images to Docker Hub.
- Update the application with minimal manual involvement.

## Use cases

- This website can be used to find out historical facts from different periods and geographical areas.
- It provides login and signup options, but it also allows the user to access the website as a guest.
- On the main browsing page, the user can see three lists, each for a specific filter, and can select either the period of time, the region, or the country.
