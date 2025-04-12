# Pet-WRU

## Project Overview, Objectives, and Goals

## Installation
- This project uses NodeJs and MariaDb.
- Links to download them (download the version that correlates with your OS):
  - NodeJs - https://nodejs.org/en/download
  - MariaDb - https://mariadb.org/download

- To set up the backend database:
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

- Database Connection Troubleshooting:
 - If you have problems connecting to the database, go to your MariaDb files and find the config file called "my.ini" or "my" (same file, name scheme depends on OS)
 - Once in that file, copy/paste this to ensure the client and database ports are correct:
      [mysqld]
      datadir=C:/Program Files/MariaDB 11.5/data
      port=3306
      innodb_buffer_pool_size=1004M
      [client]
      port=3000
      plugin-dir=C:\Program Files\MariaDB 11.5/lib/plugin
 - Don't forget to save the changes.  

## Usage
- To run this project (Pet WRU):
  - Download it as a ZIP file (click the green button on the repository that says "< > Code")
  - Unzip the file, and go to the pet-WRU folder (not to be confused with the Pet-WRU folder)
  - Open this folder in terminal
  - Once opened, type the command: node App.js
  - This will launch the backend server, and give you the link to the locally hosted website (port 300)
  - Simply ctrl+click the link to be automatically redirected to the website
  
## Credits and Acknowledgements
