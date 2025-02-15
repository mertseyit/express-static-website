-- Önce mevcut tabloları düşür (eğer varsa)
DROP TABLE IF EXISTS login_logs CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS user_feedbacks CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Update timestamp trigger fonksiyonunu oluştur
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedat = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tabloları oluştur
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
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    admin_id integer not null references admins,
    blog_title varchar(255) not null,
    preview_img varchar(255) not null,
    image_name varchar(100) not null,
    blog_text text not null,
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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
    admin_name TEXT,
    admin_email TEXT,
    ip_address VARCHAR(255) NOT NULL,
    status INTEGER NOT NULL CHECK (status IN (0, 1, 2, 3)),
    createdat timestamptz DEFAULT NOW(),
    updatedat timestamptz DEFAULT NOW()
);

-- Her tablo için update trigger'larını oluştur
CREATE TRIGGER update_admins_timestamp
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_blogs_timestamp
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_testimonials_timestamp
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_portfolios_timestamp
    BEFORE UPDATE ON portfolios
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_feedbacks_timestamp
    BEFORE UPDATE ON user_feedbacks
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_activity_logs_timestamp
    BEFORE UPDATE ON activity_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_login_logs_timestamp
    BEFORE UPDATE ON login_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();