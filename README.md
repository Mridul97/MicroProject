# Micro Project

Micro Project is a social networking website where people can add new friends.

To see the website, go to the link :- https://infinite-escarpment-36399.herokuapp.com/

## Steps to test the website : 

There are five users in the database with usernames harry, ron, hermione, neville and ginny. Password for all the five users is “password”.


### SIGN UP/ REGISTER NEW USER

Click on the Sign Up option in the header section of the webpage.
Enter all the details, and click on register. You will be redirected to the profile of newly created user.
If there is an error in creating a new user, then that error will be displayed and you will be redirected to register page.

### LOGIN AN EXISTING USER 

Click on the Login option in the header section of the webpage.
Enter “harry” in the username section and “password” in the password section, and click on login. You will be redirected to the profile of harry.
If there is an error in creating a new user, then you will be redirected to login page.

### LOGOUT AN USER

Login with username as “harry” and password as “password”.
Click the logout option in the navbar of the website.

### PROFILE PRIVACY

Login with username as “harry” and password as “password”.
On the profile page, click on the friends option. Here, you will see all the friends of harry.
Click on any friend let’s say ron, click on friends option on ron’s profile, you will see ron’s friends. ( harry can see ron’s friends because harry is a friend of ron).
Go to the profile page of harry by clicking on signed in as harry in the navbar.
Click on the find friends option, here you will see more users to whom harry can send friend request. Click on any user, let’s say neville. In the neville’s profile you will not be able to see neville’s friends because harry and neville are not friends.

### USER FEATURES

Login with username as “harry” and password as “password”.
Click on the find friends option, here you will see more users to whom harry can send friend request. Click on add friend for neville, a friend request has been sent to neville.
Go to the profile page of harry by clicking on “signed in as harry” in the navbar.
Click on the pending requests option, here you will see all the requests that harry has sent but are not accepted till now. Click on the neville’s name, In the neville’s profile, it will be mentioned that request has been sent.
Click the logout option in the navbar.
Login with username as “neville” and password as “password”.
Go to the friend requests option on the profile page, there you will see a request of harry potter (you can accept the request by clicking on accept request option). Click on harry potter, click on the accept request option on harry’s profile.

### SEARCHING A USER

Login with username as “harry” and password as “password”.
On the search bar in the header section of the website, search for a user name let’s say hermione ( as you will be typing the name you will see that the search box displays auto suggestions, you can click on the auto suggestion to go to the profile of the suggested user). After that select the option corresponding to username and click on search.
Click on the hermione granger option on the search results page to see the profile of hermione granger.
Go to the profile page of harry by clicking on “signed in as harry” in the navbar.
On the search bar in the header section of the website, search for a user by using the last name, type weasley in the search box, and choose the option corresponding to last name and click on search.
Similarly, you can also search for a user by the first name.
Fuzzy search implementation :-  Go to the profile page of harry by clicking on signed in as harry in the navbar, type “ion” in the search box, and choose the option corresponding to username  and click on search. You will see Hermione Granger as a user in the search result page because “ion” is a substring in the username “hermione”.

Auto suggestions works only for username.

### PROFILE VIEW OF ANOTHER USER

Let’s say that you are logged in as harry and you are viewing the profile of ron,

If harry and ron are friends, then there will be an option to see friends of ron on ron’s profile.

If harry has sent a friend request to ron, then “Request Sent” will be mentioned on the ron’s profile.

If harry has received a friend request from ron, then there will be an option to accept request of ron on ron’s profile.

Otherwise, then there will be an option of add friend i.e., to send friend request to ron on ron’s profile.

### UI OF THE WEBSITE

If a user is logged in the website, then there will be an option of Logout in the navbar of the website.

If no user is logged in, then there will be options of Login and Sign Up in the navbar of the website.

UI is very basic. Flash messages are used for displaying error and success messages.
