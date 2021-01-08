const Campground = require('../models/campgrounds');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

module.exports.newForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    // populate reviews and campground author
    const campground = await Campground.findById(id)
        .populate(
            {
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground does not exist');
        return res.redirect('/campground');
    }
    console.log(campground.reviews);
    res.render('campgrounds/show', { campground });
};

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground does not exist');
        return res.redirect('/campground');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campground/${campground._id}`);
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campground/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfuly deleted campground');
    res.redirect('/campground');
};