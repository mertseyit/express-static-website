CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
	firstname varchar(255) not null, 
	lastname varchar(255) not null, 
  email VARCHAR(255) UNIQUE NOT NULL,
	email_verified boolean not null,
  password TEXT NOT NULL,
	token text,
  resetpasswordtoken TEXT,
  resetpasswordtokenexp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
	admin_id integer not null references admins,
	blog_title varchar(255) not null,
	preview_img varchar(255) not null,
	image_name varchar(100) not null,
	blog_text text not null,
	createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id),
    preview_img VARCHAR(255) NOT NULL,
    portfolio_title TEXT NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_feedbacks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    replied BOOLEAN NOT NULL DEFAULT FALSE,
    who_replied INTEGER NULL REFERENCES admins(id) ON DELETE SET NULL,
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    admin_name TEXT NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    event INTEGER NOT NULL CHECK (event IN (0, 1, 2)), -- 0: created, 1: deleted, 2: updated
    page VARCHAR(255) NOT NULL,
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE login_logs (
    id SERIAL PRIMARY KEY,
    admin_name TEXT NOT NULL,
    admin_email TEXT NOT NULL CHECK (admin_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    ip_address VARCHAR(255) NOT NULL,
    status INTEGER NOT NULL CHECK (status IN (0, 1, 2)), -- 0: unauthorized, 1: incorrect password, 2: success
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


