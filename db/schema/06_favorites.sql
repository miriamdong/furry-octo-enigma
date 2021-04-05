DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  date_added timestamp DEFAULT NOW()
)
