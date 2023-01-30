# Fire_Fighter_Z Database

The database will connect to Firebase and store all the information about the cards and players in the game, using the credentials in the key.json file.

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
