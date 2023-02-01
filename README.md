# Fire Fighter Z

Fire Fighter Z is a web game application that was created as a school project within one week. Players take turns using cards with various abilities to combat enemies. The project was built using Flask for Python and Firebase for database management.

![fire fighter z demo](https://user-images.githubusercontent.com/74910872/216054259-23a2b3e1-1873-4b09-8a87-6768ca80541e.png)

## Technology Stack:

This project is built with the Flask framework for Python, and uses Firebase for database management. The project uses Cross-Origin Resource Sharing (CORS) to handle cross-domain requests. The front-end of the project is built using Parcel, a fast, zero-configuration web application bundler.

## Features:

- User authentication system: Users can log in using their username and password.
- Database: Store all the information about the cards and players in the game.
- Draw Cards: Users can draw cards from the deck and store them in their personal collection.
- Combat System: You can use your cards to defeat zombies.
- Rest API

# Getting Started

## Requirements
To run the database, you need the following:

- Python 3.7.9
- - Firebase is currently only up to date with this version of Python, so you need to install it to run the database. You can download it from the [Python](https://www.python.org/downloads/windows/) website.
- Flask
- - You can install Flask using the following command:
```
pip install flask
```
- Firebase
- - You can install Firebase using the following command:
```
pip install firebase_admin
```
- Flask-CORS
- - You can install Flask-CORS using the following command:
```
pip install flask_cors
```

## Key Configuration
In addition to the above requirements, you also need to set up the key.json file. This file contains the credentials for accessing your Firebase project, and is required for the database to connect to Firebase.

You can generate the key.json file by following these steps:

1. Go to the Firebase Console.
2. Select the project that you want to use for the database.
3. Click on the "Settings" icon (gear icon) and select "Project settings".
4. Navigate to the "Service Accounts" tab.
5. Click on the "Generate new private key" button.
6. A key.json file will be downloaded. Save this file in the same directory as the database code.

## Running the Application

To run the application, follow these steps:

1. Navigate to the root directory of the project in your terminal.
2. Run the following command to install the dependencies:
```
npm install
```
3. Start the Flask server by running:
```
python server/app.py
```
4. Start the frontend by running:
```
npm start
```

Now you should be able to access the application in your browser at http://localhost:1234. Note that it might be running on a different port.
