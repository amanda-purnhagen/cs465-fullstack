/* GET users view */
const users = (req, res) => {
	res.render('users', { title: "Travlr Getaways"});
};

module.exports = {
	users
}
