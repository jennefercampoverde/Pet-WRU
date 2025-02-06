CREATE DATABASE websiteDatabase;

USE websiteDatabase;

CREATE TABLE usersInfo(
    userID int NOT NULL AUTOINCREMENT,
    UserName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    DOB Date NOT NULL,
    emailAddress varchar(255) NOT NULL,
    userPassword varchar(255) NOT NULL,
    Zipcode varchar(5) NOT NULL,
    City varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

/*CREATE TABLE donations(
    donationID int NOT NULL AUTOINCREMENT,
    userID int NOT NULL,
    Zipcode varchar(5) NOT NULL, 
    status varchar(255) NOT NULL, 
    itemName varchar(255) NOT NULL,
    quantity int NOT NULL,
    condition varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    item_image_path varcahr(255), 
    PRIMARY KEY (donationID),
    FOREIGN KEY(userID) REFERENCES usersInfo (userID)
);*/

CREATE TABLE lostPets(
    lostID  int NOT NULL AUTOINCREMENT,
    userID int NOT NULL, 
    dateCreated Date NOT NULL,
    dateLost Date NOT NULL,
    lastZipcode varchar(5) NOT NULL,
    lastCityID varchar(255) NOT NULL,
    petName varchar(255) NOT NULL,
    animalType varchar(255) NOT NULL,
    animalSize varchar(255) NOT NULL,
    animalColor varchar(255) NOT NULL,
    animalGender varchar(1) NOT NULL,
    animal_image_path varcahr(255),  
    description varchar(255),
    status varchar(255) NOT NULL, 
    PRIMARY KEY (lostID),
    FOREIGN KEY(userID) REFERENCES usersInfo (userID)
);

CREATE TABLE foundPets(
    foundID int NOT NULL AUTOINCREMENT,
    lostID int NOT NULL,
    dateFound date NOT NULL,
    status varchar(255) NOT NULL,
    PRIMARY KEY(foundID),
    FOREIGN KEY(lostID) REFERENCES lostPets(lostID)
    -- I don't think we need the following because then it would automatically update to "lost" -> FOREIGN KEY(status) REFERENCES lostPets(status) ON UPDATE CASCADE;   
);