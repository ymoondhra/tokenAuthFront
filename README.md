# tokenAuthFront
This is a React Native project that serves as a base model to build Django back-end APIs that require token and social media authentication. 
It utilizes [Django Rest Framework](https://www.django-rest-framework.org/) and [django-rest-auth](https://github.com/Tivix/django-rest-auth).   
**The compatible front-end application will be posted soon.** 


#### Table of Contents ####
  * [Prerequisites](#Prerequisites)
  * [Project Description](#Project-Description)
  * [Versions](#Versions)
  * [Future Versions](#Future-Versions)
  * [Why I Built This](#Why-I-Built-This)
  * [How I Built This](#How-I-Built-This)

#### Prerequisites ####
To thoroughly comprehend this solution, it is highly recommended to have a strong understanding of the following:
  * Django
  * Django Rest Framework (DRF)
  * django-rest-auth

#### Project Description ####
This project covers the essential authentication functionalities of a back-end API that uses token authentication, which can be found [here](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html),
and social media authentication. The CustomUser is set as the authentication user model, which builds off of [Django's usual user model](https://docs.djangoproject.com/en/2.2/ref/contrib/auth/), 
to allow developers to add extra user data (e.g. user's occupation or country of residence).   

###### Existing Versions ######
|  #  | Functionality Additions | Compatible with Front-End Version # |  
|:---:| :---------------------- | :---------------------------------: |  
|  1  |                         |                  -                  | 

###### Future Versions ######
|  #  | Functionality Additions | Compatible with Front-End Version # |  
|:---:| :---------------------- | :---------------------------------: |  
|  2  | For token auth account creation, require email, first name, last name, and one password (instead of requiring username and two passwords). For login/logout, require email (instead of username) | - |
|  3  | Add Facebook authentication as a property of CustomUser | - | 


#### Why I Built This ####
In my experiences with full-stack applications, I have noticed how I have to rebuild the same functionalities every time (e.g. authentication), 
often having to look back at previous projects I have created. I want to minimize the amount of time developers need to spend on the repetitive aspects 
of creating a back-end API for full-stack applications. 

Moreover, I want developers to be able to pull different versions of this project for the different functionalities they need. For example,
If someone wants to build a back-end API that allows users to log in with Facebook or log in with their actual username, a developer
may pull down only Version 3, which is the first version that has the Facebook login feature. 
However, Version 3 uses email to login/logout instead of username. Therefore, the best approach would be to pull down 
the directories of Version 1 (which uses username) and Version 3, compare the code, and use the helpful comments within the code
to decide what code to remove.

For the developers who would prefer to start from scratch but use this project for reference, the section below outlines how I went about coding this API.


#### How I Built This ####

###### Version 1 ######
Project Creation  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. python3 -m venv env  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. source env/bin/activate  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. django-admin startproject token_auth  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. pip install --upgrade pip  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. pip3 install django, djangorestframework, django-rest-auth, django-allauth  

Overall Coding Structure  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Build Users app  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Build Api app  

Individual App Coding Structure  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Start app with command line  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Build models  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Build serializers  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Build views  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Attach to URLs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. Update settings.py as needed  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7. Migrate  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8. Configure admin: create superuser in command prompt and Add Site in admin website

Project Deployment  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(OPTIONAL). [Hide secret key](https://stackoverflow.com/questions/4906977/how-to-access-environment-variable-values)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Create requirements.txt using pip freeze    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Push token_auth and README.md to GitHub (not env folder)


#### Examples ####
###### [API Endpoints](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html) #######
  * Sign Up: http://127.0.0.1:8000/api/v1/rest-auth/registration/
  * Login: http://127.0.0.1:8000/api/v1/rest-auth/login/
  * The rest of the API endpoints are located [here](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)
