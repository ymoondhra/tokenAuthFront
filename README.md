# tokenAuthFront
Demonstration: https://drive.google.com/drive/u/0/folders/1IOAupRokQvc6zpEiNif99iOT2pcD7Vnl   
This is a React Native project that serves to professionally and robustly showcase the functionality of its back-end complement, which is an API that manages authentication (e.g. create account, log in). Further details can be found in the [Project Description](#Project-Description).    
**The compatible back-end project can be found [here](https://github.com/ymoondhra/django-token-base).** 

#### Table of Contents ####
  * [Prerequisites](#Prerequisites)
  * [Project Description](#Project-Description)
  * [Run The Project](#Run-The-Project)
  * [Versions](#Versions)

#### Prerequisites ####
To thoroughly comprehend this solution, it is highly recommended to have a strong understanding of the following:
  * JavaScript (ES6)
  * [React Native](https://facebook.github.io/react-native/)
  * [React Navigation](https://reactnavigation.org/)
  * [Token authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)    

#### Project Description ####
This React Native application provides a user interface and realistic flow for the services that the 
[back-end server](https://github.com/ymoondhra/django-token-base) provides, from creating an account 
to fetching the user's information from the database.      
This front-end project focuses on providing the best possible experience for every user on both android and iOS devices. For example, when a response from the server contains multiple authentication error messages, `server.js` calculates the priority of each message and only displays the most significant one. If the user tries to create an account with a username that already exists in the database, they are automatically redirected to the log in page along with the credentials they typed in and an appropriate message.      
It utilizes packages for features like [asynchronous storage](https://github.com/react-native-community/async-storage) to store the authentication token and [navigation](https://reactnavigation.org/) to navigate between screens.     

#### Run The Project ####
1. `git clone https://github.com/ymoondhra/tokenAuthFront.git`
2. `cd tokenAuthFront`
3. `npm install`
4. `npm audit fix`
4. Setup iOS: `cd ios && pod install && cd ..`
5. Setup android: Place [this file](https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore) in `android/app/`
5. Run iOS: `react-native run-ios` or open `ios/tokenAuthFront.xcworkspace` in XCode and click the play button
6. Run Android: `react-native run-android` or open the `android` folder in Android Studio and run it there
7. Start the [back-end server](https://github.com/ymoondhra/django-token-base)

#### Versions ####

###### Existing Versions ######
|  #  | Functionality Additions | Compatible with Back-End Version #  |  
|:---:| :---------------------- | :---------------------------------: |  
|  1  | Found in the [Project Description](#Project-Description) | 1  | 

###### Future Versions ######
|  #  | Functionality Additions | Compatible with Back-End Version #  |  
|:---:| :---------------------- | :---------------------------------: |  
|  2  | Use email address as username |               -               |
|  3  | Support social media account authentication and creation | -  | 
