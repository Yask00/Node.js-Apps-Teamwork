module.exports = {
    allHotels: (req, res) => {
        res.render('hotels/all-hotels');
    },
    hotelDetails: (req, res) => {
        res.render('hotels/hotel-details');
    },
    hotelGallery: (req, res) => {
        res.render('hotels/hotel-gallery');
    },
};
