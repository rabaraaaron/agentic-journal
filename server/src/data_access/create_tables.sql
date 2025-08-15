CREATE TABLE users (
	email VARCHAR(30) PRIMARY KEY,
	password VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL
);
CREATE TABLE entries (
	id SERIAL PRIMARY KEY,
	datetime_last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	date_selected DATE DEFAULT CURRENT_DATE,
	messages VARCHAR(500)[],
	moods VARCHAR(30)[],
	ratings INT[],
	email VARCHAR(30) NOT NULL,
	CONSTRAINT foreign_email FOREIGN KEY (email) REFERENCES users (email)
);