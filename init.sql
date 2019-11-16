CREATE TABLE users (
userId SERIAL PRIMARY KEY,
firstName VARCHAR,
lastName VARCHAR,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
gender VARCHAR,
jobRole VARCHAR,
Dob Date,
department VARCHAR,
userType VARCHAR DEFAULT 'employee',
createdOn TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department, userType)
values ('Sam', 'Ade', 'ade@sample.com', 'ade1234', 'Male', 'Secretary', '04-16-99','Management', 'employee' );

insert into users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department, userType)
values ('Sami', 'Adei', 'adei@sample.com', 'ade2234', 'Male', 'Secretary', '06-04-89','Management', 'employee');

insert into users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department, userType)
values ('Same', 'Adel', 'sade@sample.com', 'aqe1234', 'Male', 'Driver', '07-06-90', 'Works', 'employee');

CREATE TABLE tweets (
TweetId SERIAL PRIMARY KEY,
title VARCHAR NOT NULL,
article VARCHAR,
imageUrl VARCHAR,
authorId SERIAL REFERENCES users(userId) ON DELETE CASCADE,
tag VARCHAR NOT NULL,
inapropriate VARCHAR DEFAULT 'no',
createdOn TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
commentId SERIAL PRIMARY KEY,
comment VARCHAR NOT NULL,
authorId SERIAL REFERENCES users(userId) ON DELETE CASCADE,
inapropriate VARCHAR DEFAULT 'no',
postId SERIAL REFERENCES tweets(tweetId) ON DELETE CASCADE,
createdOn TIMESTAMP DEFAULT NOW()
);