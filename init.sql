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

INSERT INTO users (insert into users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department)
values ('Sam', 'Ade', 'ade@sample.com', 'ade1234', 'Male', 'Secretary', 'Management', '16-04-99');

insert into users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department)
values ('Sami', 'Adei', 'adei@sample.com', 'ade2234', 'Male', 'Secretary', 'Management', '16-04-89');

insert into users (firstName, lastName, Email, Password, Gender, JobRole, Dob, Department)
values ('Same', 'Adel', 'sade@sample.com', 'aqe1234', 'Male', 'Driver', 'Works', '16-06-90');

CREATE TABLE tweets (
TweetID UUID PRIMARY KEY,
title VARCHAR NOT NULL,
article VARCHAR,
imageUrl VARCHAR,
authorId UUID REFERENCES users(userId) ON DELETE CASCADE,
tag VARCHAR NOT NULL,
inapropriate VARCHAR DEFAULT 'no',
createdOn TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
commentId SERIAL PRIMARY KEY,
comment VARCHAR NOT NULL,
authorId UUID REFERENCES users(userId) ON DELETE CASCADE,
inapropriate VARCHAR DEFAULT 'no',
postId UUID REFERENCES posts(postId) ON DELETE CASCADE,
createdOn TIMESTAMP DEFAULT NOW()
);