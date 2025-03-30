INSERT INTO usersInfo (userName, firstName, lastName, dob, emailAddress, userPassword, zipcode, city) VALUES ('monty', 'Sheila', 'Monte', '2003-03-28', 'sheila@gmail.com', '1234', '11550', 'Hempstead');

INSERT INTO usersInfo (userName, firstName, lastName, dob, emailAddress, userPassword, zipcode, city) VALUES ('ehamou', 'Evan', 'Hamou', '2002-03-03', 'ehamou@gmail.com', 'spider32!', '11520', 'Merrick');

INSERT INTO usersInfo (userName, firstName, lastName, dob, emailAddress, userPassword, zipcode, city) VALUES ('ashmo21', 'Ashley', 'Mooney', '2001-09-23', 'ashm67@gmail.com', 'mhj12Hum%', '11375', 'Forest Hills');

INSERT INTO lostPets (userID, dateLost, lastZipcode, lastCityID, petName, animalType, animalSize, animalColor, animalGender, animal_image_path, description, status) VALUES (1, '2025-03-01', '11556', 'Uniondale', 'Sunny', 'Dog', 'M', 'Yellow', 'Male', 'orangeCat.jpg', 'My dog Sunny was last seen wearing a green harness in Uniondale and is easily startled. Please reach out if you have any information.', 'Lost');

INSERT INTO lostPets (userID, dateLost, lastZipcode, lastCityID, petName, animalType, animalSize, animalColor, animalGender, animal_image_path, description, status) VALUES (3, '2025-03-04', '11379', 'Middle Village', 'Dag', 'Cat', 'S', 'Black', 'Male', 'GoldenRet.jpeg', 'My cat Dag was last seen wearing an orange leash and is very friendly. Please reach out if you have any information.', 'Lost');

INSERT INTO foundPets (lostID, dateFound, status) VALUES (1, '2025-04-16', 'Found');

INSERT INTO postComments (lostID,commentText, userID) VALUES (1, 'Good Luck, hopefully you find them soon!', 2);

INSERT INTO donations (userID, zipcode, itemStatus, itemCategory, itemName, quantity, itemCondition, itemDescription, item_image_path) VALUES (1, '11375', 'Available', 'Bedding', 'Dog Bed', 1, 'New', 'A comfortable, soft, blue dog bed, perfect for medium to large dogs. Never used.', 'donationsImages/bluebed.jpg');
