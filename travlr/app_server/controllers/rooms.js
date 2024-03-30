var fs = require('fs');
var vacancies = JSON.parse(fs.readFileSync('./data/vacancies.json','utf8'));

/* GET rooms view */
const rooms = (req, res) => {
	res.render('rooms', { title: 'Travlr Getaways', vacancies});
};

module.exports = {
	rooms
};
