CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
	firstname varchar(255) not null, 
	lastname varchar(255) not null, 
  email VARCHAR(255) UNIQUE NOT NULL,
	email_verified boolean not null,
  password TEXT NOT NULL,
	token text,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
	admin_id integer not null references admins,
	blog_title varchar(255) not null,
	preview_img varchar(255) not null,
	image_name varchar(100) not null,
	blog_text text not null,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id),
    testimonial_name TEXT NOT NULL,
    testimonial_position TEXT NOT NULL,
    testimonial_rate INTEGER NOT NULL,
    testimonial_text VARCHAR(255) NOT NULL,
    testimonial_profile VARCHAR(255) NOT NULL,
    image_name varchar(100) not null,
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id),
    preview_img VARCHAR(255) NOT NULL,
    portfolio_title TEXT NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);

