-- Insert sample data for users and entries tables

-- Insert users
INSERT INTO users (email, password, username) VALUES
('rabara777@outlook.com', 'password123', 'rabara777'),
('melissanicole27@hotmail.com', 'password456', 'melissanicole');

-- Insert sample entries for rabara777@outlook.com
INSERT INTO entries (
    date_selected, 
    messages, 
    moods, 
    ratings, 
    email
) VALUES
-- Recent entries (last few days)
(
    CURRENT_DATE,
    ARRAY['Had a great day at work today!', 'Feeling accomplished after finishing my project'],
    ARRAY['happy', 'satisfied'],
    ARRAY[8, 7],
    'rabara777@outlook.com'
),
(
    CURRENT_DATE - INTERVAL '1 day',
    ARRAY['Feeling a bit stressed about deadlines', 'Need to manage my time better'],
    ARRAY['anxious', 'overwhelmed'],
    ARRAY[4, 3],
    'rabara777@outlook.com'
),
(
    CURRENT_DATE - INTERVAL '2 days',
    ARRAY['Went for a nice walk in the park', 'Weather was perfect'],
    ARRAY['peaceful', 'content'],
    ARRAY[7, 8],
    'rabara777@outlook.com'
),
-- Older entries (last week)
(
    CURRENT_DATE - INTERVAL '5 days',
    ARRAY['Had trouble sleeping last night', 'Feeling tired and irritable'],
    ARRAY['tired', 'irritated'],
    ARRAY[3, 2],
    'rabara777@outlook.com'
),
(
    CURRENT_DATE - INTERVAL '7 days',
    ARRAY['Great weekend with family', 'Felt very connected and loved'],
    ARRAY['joyful', 'grateful'],
    ARRAY[9, 9],
    'rabara777@outlook.com'
);

-- Insert sample entries for melissanicole27@hotmail.com
INSERT INTO entries (
    date_selected, 
    messages, 
    moods, 
    ratings, 
    email
) VALUES
-- Recent entries (last few days)
(
    CURRENT_DATE,
    ARRAY['Struggling with work-life balance', 'Feel like I never have enough time'],
    ARRAY['frustrated', 'overwhelmed'],
    ARRAY[3, 4],
    'melissanicole27@hotmail.com'
),
(
    CURRENT_DATE - INTERVAL '1 day',
    ARRAY['Had a really good conversation with mom', 'Feeling more supported'],
    ARRAY['relieved', 'supported'],
    ARRAY[6, 7],
    'melissanicole27@hotmail.com'
),
(
    CURRENT_DATE - INTERVAL '3 days',
    ARRAY['Feeling lonely lately', 'Miss having closer friendships'],
    ARRAY['lonely', 'sad'],
    ARRAY[2, 3],
    'melissanicole27@hotmail.com'
),
-- Older entries (last week)
(
    CURRENT_DATE - INTERVAL '6 days',
    ARRAY['Accomplished my fitness goals this week', 'Feeling strong and healthy'],
    ARRAY['proud', 'energetic'],
    ARRAY[8, 8],
    'melissanicole27@hotmail.com'
),
(
    CURRENT_DATE - INTERVAL '8 days',
    ARRAY['Dealing with some family drama', 'Trying to stay out of it but it affects me'],
    ARRAY['stressed', 'conflicted'],
    ARRAY[4, 3],
    'melissanicole27@hotmail.com'
);

-- Verify the data was inserted correctly
SELECT 'Users count:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Entries count:' as info, COUNT(*) as count FROM entries;

-- Show sample of inserted data
SELECT 
    u.username,
    u.email,
    e.date_selected,
	e.messages,
    e.moods,
    e.ratings
FROM users u
JOIN entries e ON u.email = e.email
ORDER BY u.email, e.date_selected DESC;