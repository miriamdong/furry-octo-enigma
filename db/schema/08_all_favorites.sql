SELECT favorites.date_added, users.name, listings.title
FROM favorites
JOIN users ON favorites.user_id = users.id
JOIN listings ON listings.id = favorites.listing_id
GROUP BY favorites.user_id, users.name, favorites.listing_id, favorites.date_added, listings.title
ORDER BY favorites.date_added;
