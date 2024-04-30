USE Info_Skjerm;

CREATE TABLE Users
(
    email VARCHAR(100) PRIMARY KEY,
    fullname VARCHAR(100),
    password_hash TEXT,
);

CREATE TABLE Events
(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(100),
    body TEXT,
    startdate DATE,
    starttime TIME,
    enddate DATE,
    endtime TIME,
);