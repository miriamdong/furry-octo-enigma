-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
);
