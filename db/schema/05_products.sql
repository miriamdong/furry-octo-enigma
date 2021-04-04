-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS Products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at timestamp DEFAULT NOW()
);
