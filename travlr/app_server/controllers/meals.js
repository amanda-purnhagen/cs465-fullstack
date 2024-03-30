var fs = require('fs');
var menus = JSON.parse(fs.readFileSync('./data/menus.json','utf8'));

/* GET meals view */
const meals = (req, res) => {
	res.render('meals', { title: 'Travlr Getaways', menus});
};

module.exports = {
	meals
};
