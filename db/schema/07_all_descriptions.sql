SELECT listings.*, products.name as description
FROM listings
JOIN listingItems ON listing_id = listings.id
JOIN products ON product_id = products.id
GROUP BY listings.id, products.name
ORDER BY listings;
