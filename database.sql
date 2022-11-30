\ c postgres;

drop database solar;

create database solar;

\ c solar;

drop table roles cascade;

CREATE TABLE roles (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    PRIMARY KEY ("id")
);

drop table users cascade;

CREATE TABLE users (
    "id" SERIAL,
    "name" VARCHAR(50),
    "idRoles" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idRoles") REFERENCES roles ("id")
);

drop table tickets cascade;

CREATE TABLE tickets (
    "id" SERIAL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(120) NOT NULL,
    "idMother" INTEGER NULL,
    "code" VARCHAR(20) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATE NOT NULL DEFAULT NOW(),
    "idUsers" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idUsers") REFERENCES users("id") ON DELETE CASCADE
);

drop table files cascade;

CREATE TABLE files(
    "id" SERIAL,
    "idTickets" INTEGER,
    "name" VARCHAR(100),
    "mimetype" VARCHAR(30),
    "extension" VARCHAR(10),
    "filesPath" VARCHAR(100),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("idTickets") REFERENCES tickets("id") ON DELETE CASCADE
);