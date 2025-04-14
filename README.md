# Pet-WRU

## Purpose of Project
Our website is an all-pet-inclusive, cost-free platform that provides users easy access to resources and tools in situations where they have lost or found a pet. By eliminating any fees and tailoring the website for all different types of pets, we aim to enhance awareness, ensuring that individuals can access vital information without financial barriers.

## Version
04/14/2025

## Authors
Authored by [Jennefer Campoverde](https://github.com/jennefercampoverde), [Evan Hamou](https://github.com/EvanHamou), [Sheila Montecino](https://github.com/0-monty-0), [Ethan Portelli](https://github.com/EthanPortelli)

## Installation
### This project uses NodeJs and MariaDb.
- Links to download them (download the version that correlates with your OS):
  - [NodeJs](https://nodejs.org/en/download)
  - [MariaDb](https://mariadb.org/download)

### To set up the database:
  - MariaDb will download with a frontend interface called HeidiSQL
  - Open HeidiSQL, and click "New" to create a new connection.
  - Network Type: MariaDb or MySQL (TCP/IP)
  - Library: libmariadb.dll
  - Hostname should be: 127.0.0.1
  - Port should be: 3306
  - Username and Password can be whatever you want (be sure to remember it)
  - Now, enter your login information to get to the main page of HeidiSQL
  - Once there, follow these steps:
    - Click "File" --> Click "Run SQL file" --> and select database.sql located in Pet-WRU/pet-WRU.
    - Click "Yes" on the confirmation popup, and the database now setup

### To run this project (Pet WRU):
  - Download NodeJs & MariaDb (and setup database)
  - Download this repo as a ZIP file (click the green button that says "< > Code", then click "Download ZIP")
  - Unzip the file, and go to the pet-WRU folder (not to be confused with the Pet-WRU folder)
  - Open this folder in terminal
  - Once opened, type the command: node App.js
  - This will launch the backend server, and give you the link to the website
  - Simply ctrl+click the link to be automatically redirected to the website
  - Congradulations, you may now use this (locally hosted) website :D

### Database Connection Troubleshooting:
  - If you have problems connecting to the database, go to your MariaDb files and find the config file called "my.ini" or "my" (same file, name scheme depends on OS)
  - Once in that file, copy/paste this into that file to ensure the client and database ports are correct:
-     [mysqld]
      datadir=C:/Program Files/MariaDB 11.5/data
      port=3306
      innodb_buffer_pool_size=1004M
      [client]
      port=3000
      plugin-dir=C:\Program Files\MariaDB 11.5/lib/plugin
  - Don't forget to save the changes.  

## User Instructions
In order to use the website, you will first have to create an account with a username, your full name, date of birth, email address, password, zip code, and city.

Once you sign in, you have access to all of the services that the Website provides: creating a missing pet flier and/or a donation post; accessing and viewing the posts pages for missing, reunited, and donation posts; and having a personalized user profile. 

### To Create a Missing Pet Flier:
* You can access this page through the homepage where you are provided a "Report Missing Pet Button", the navigation bar under the "Post" dropdown button, or at the bottom of your profile page. 
* You will have to provide the following information about your missing pet: an image (preferably most recent), name, gender, type of animal, color, size, last seen location, the date lost, and a description providing any additional information you feel is important and most helpful.
* Once all the boxes are filled, click the "Post" button to upload the flier to our website and to generate a Pet ID for your post. This action will immediately direct you to our "Missing Pets" page.

### To Navigate Through the Missing Pets Page:
* You can access this page through the navigation bar under the "Posts" dropdown button or after creating a Missing Pet Flier.
* You have filtering options to narrow down any posts you may be looking for.
  * First filtering option you will see is the search bar. If you have the Pet ID of a post, you can enter it in the search bar and hit the enter key or click the magnifying glass button. The Pet ID is given once a Missing Pet Flier is posted or it can be found at the bottom left corner of a post in this page.
  * If you do not know the Pet ID, you have more options to the left of the screen in the side navigation bar called "Filter". You are able to filter through the following categories: Type of animal, gender, size of animal, the date the post was made, and the zip code of where the animal was last seen. Once you've chosen the filters needed, click the "Apply Filters" button.
  * To clear the filters, you can refresh the page or click the "Clear Filters" in the "Filter" side navigation bar.

### To View More Information of Individual Missing Pet Posts:
* Through the "Missing Pets" page you are able to click on each individual post for more information about each missing pet.
* Once a post is selected, you are directed to a new page where the information of the selected pet is displayed in a container. 
* You are able to view a map of the pet's last seen location by clicking on the "View Map" button next to the "Last Known Location" category. The area of where the pet was last seen is highlighted by a red circle.
  * You can zoom in and out by clicking the "+/-" buttons. You are also able to move the map by left-clicking the mouse and dragging. 
  * To close the map, click the "Close Map" button
* Additionally, you are able to comment under a post, by typing the content of your message within the comment container and clicking the "Post" button. We suggest commenting to show support, as well as sharing any helpful tips or information for the owner of the missing pet.
  * You can delete your comment by clicking the red trash button to the right of your comment post. 
* On your own posts, you are able to mark the flier as found or delete the post by using the respective buttons at the top right of the information container. 

### To Navigate Through the Reunited Pets Page:
* You can access this page through the navigation bar under the "Posts" dropdown button or after marking a Missing Pet Post as found.
* You have filtering options to narrow down any posts you may be looking for.
  * First filtering option you will see is the search bar. If you have the Found Pet ID of a post, you can enter it in the search bar and hit the enter key or click the magnifying glass button. The Found Pet ID is given once a Missing Pet Flier has been marked "found" or it can be found at the bottom left corner of a post in this page.
  * If you do not know the Pet ID, you can filter by the date the post was marked found.
  * To clear the filters, you can refresh the page or click the "Clear Filters" in the "Filter" side navigation bar.

### To Create a Donation Post:
* You can access this page through the navigation bar under the "Donations" dropdown button, or at the bottom of your profile page. 
* You will have to provide the following information about the item you would like to donate: an image, name, quantity, category of item, condition, and a description providing any additional information you feel is important.
* Once all the boxes are filled, click the "Post" button to upload the post to our website. This action will immediately direct you to our "Donation Page".

### To Navigate Through the Donation Page:
* You can access this page through the navigation bar under the "Donations" dropdown button or after creating a Donation post.
* You have filtering options in the side navigation bar, "Filter", to narrow down any donation posts you may be looking for.
  * Filters include: Type of item, condition, and the date the donation was posted. Once you've chosen the filters needed, click the "Apply Filters" button.
  * To clear the filters, you can refresh the page or click the "Clear Filters" in the "Filter" side navigation bar.
* On your own donation posts, you are able to either delete them or mark them as unavailable once they have been claimed by using the buttons at the bottom of the post container.

### To Navigate Through Account Profile Page:
* You can access this page through the navigation bar under the "Account" dropdown button.
* Your personal information will be displayed in the container to the left of your window.
  * You are able to edit your account information by using the input boxes to the right of the page. Once you've entered any changes, click the "Edit" button to submit. Only one change can be made at a time.
* Any posts that you have made will be displayed under the "Related Posts" section, separated by categories: Donation Posts, Missing Posts, and Reunited/Found Posts.

### To Navigate Through Our Footer:
* Our footer has three links: and About Us, Resources, and the GitHub to our project

