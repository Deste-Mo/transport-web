-- Install the uuid-ossp extension if not already installed
CREATE EXTENSION "uuid-ossp";


-- Create the Account table
-- Create ENUM type for accountType
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'accounttype') THEN
        CREATE TYPE accounttype AS ENUM ('Entreprise', 'Client', 'Camionneur', 'Entreprise camionneur');
    END IF;
END
$$;

-- Create Account table
CREATE TABLE IF NOT EXISTS Account (
    accountId SERIAL PRIMARY KEY,
    accountType accounttype NOT NULL
);

CREATE TABLE Subscription (
  subId SERIAL PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  duration INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Create the Users table
CREATE TABLE Users (
  userId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(75),
  userCin VARCHAR(12),
  companyNumber VARCHAR(20),
  phone VARCHAR(10) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  bio TEXT,
  profileImage TEXT,
  password VARCHAR(255) NOT NULL,
  registerDate DATE DEFAULT CURRENT_DATE, 
  accountId INT NOT NULL,
  subId INT,
  enrDate DATE,
  accessDay INT NOT NULL,
  FOREIGN KEY (accountId) REFERENCES Account(accountId),
  FOREIGN KEY (subId) REFERENCES Subscription(subId)
);

-- Create the Offer table
CREATE TABLE Offer (
  offerId SERIAL PRIMARY KEY,
  userId UUID NOT NULL,
  title VARCHAR(100) NOT NULL,
  capacity VARCHAR(10) NOT NULL,
  depart VARCHAR(100) NOT NULL,
  dest VARCHAR(100) NOT NULL,
  scheduledDate DATE NOT NULL,
  description TEXT NOT NULL,
  imgUrl TEXT NOT NULL,
  dispo BOOLEAN DEFAULT TRUE,
  publicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Create the Message table
CREATE TABLE Message (
  messageId SERIAL PRIMARY KEY,
  senderId UUID,
  receiverId UUID,
  sentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content TEXT NOT NULL,
  viewed BOOLEAN,
  FOREIGN KEY (senderId) REFERENCES Users(userId),
  FOREIGN KEY (receiverId) REFERENCES Users(userId)
);

-- Create the Notification table
CREATE TABLE Notification (
  notifId SERIAL PRIMARY KEY,
  userId UUID NOT NULL,
  content TEXT NOT NULL,
  notifDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  viewed BOOLEAN,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Create the Follow table
CREATE TABLE Follow (
  followId SERIAL PRIMARY KEY,
  followerId UUID NOT NULL,
  followeeId UUID NOT NULL,
  followDate DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (followerId) REFERENCES Users(userId),
  FOREIGN KEY (followeeId) REFERENCES Users(userId)
);

-- Create the Report table
CREATE TABLE Report (
  reportId SERIAL PRIMARY KEY,
  reporterId UUID NOT NULL,
  reportedId UUID NOT NULL,
  reportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  message TEXT NOT NULL,
  reason TEXT NOT NULL,
  FOREIGN KEY (reporterId) REFERENCES Users(userId),
  FOREIGN KEY (reportedId) REFERENCES Users(userId)
);

-- Create the Rating table
CREATE TABLE Rating (
  ratingId SERIAL PRIMARY KEY,
  raterId UUID NOT NULL,
  ratedId UUID NOT NULL,
  ratingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  FOREIGN KEY (raterId) REFERENCES Users(userId),
  FOREIGN KEY (ratedId) REFERENCES Users(userId)
);

-- Create the SaveOffer table
CREATE TABLE SaveOffer (
  saveId SERIAL PRIMARY KEY,
  offerId INT NOT NULL,
  userId UUID NOT NULL,
  saveDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offerId) REFERENCES Offer(offerId),
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- Create the Vehicle table
CREATE TABLE Vehicle (
  vehicleId SERIAL PRIMARY KEY,
  userId UUID NOT NULL,
  make VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
  registrationNumber VARCHAR(20) NOT NULL,
  dispo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);
