# Tables:

# User
1. First Name
2. Last Name
3. Phone Number
4. Address
5. RoomOrders []
6. ServiceOrders []

# Hotel
1. Name
2. Email
3. ImageUrls []
4. Description
5. Location -> nearest village, Region, Mountain
6. Lattitude
7. Longitude
8. Rooms []
9. Services []
10. Comments []
11. Likes []

# Room
1. Type -> one, two, three, appartment
2. ImageUrl
3. HotelId
4. Description
5. Price - per night, per 5 nights(- 10%)

# Service
1. Type -> horse walk, all day walk, bulgarian food dinner, folk koncert, ...
2. HotelId
3. Price - per one person, per group of 5

# BookingRoom
1. RoomId, HotelId
2. StartDate
3. NightsCount
4. UserId

# BookingService
1. ServiceId, HotelId
2. EventDate
3. PersonCount
4. UserId

# Order
1. UserId
2. BookingRoom []
3. BookingService []
4. TotalPrice

# Region
1. Name
2. Description
3. ImageUrl
4. MapUrl

# Mountain
1. Name
2. Description
3. ImageUrls []
4. MapUrl

# Comment
1. UserId
2. HotelId
3. RoomId || ServiceId
4. Content
5. CreatedOn

# Like
1. UserId
2. HotelId
3. RoomId || ServiceId
// one User - only one Like for the Service, Room ??
