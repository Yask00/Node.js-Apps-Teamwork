class HotelsController {
    constructor(data) {
        this.data = data;
    }

    getAllHotels(req, res) {
        return res.render('hotels/all-hotels');
    }

    getHotelDetails(req, res) {
        return res.render('hotels/hotel-details');
    }

    getHotelGallery(req, res) {
        return res.render('hotels/hotel-gallery');
    }
    
}

const init = (data) => {
    return new HotelsController(data);
};

module.exports = { init };
