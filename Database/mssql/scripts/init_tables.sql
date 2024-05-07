USE Info_Skjerm;

CREATE TABLE User
(
    email VARCHAR(100) PRIMARY KEY,
    fullname VARCHAR(100),
    password TEXT,
);

CREATE TABLE Events
(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(100),
    body TEXT,
    starttime DATETIME,
    endtime DATETIME,
);