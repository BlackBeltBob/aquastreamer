//about.js

var about = {
  info: function(req, res) {

    res.json({ 
      version: '0.0.1a',
      author: 'Bob Wansink',
      company: 'Westrik Multi Sound'
    });
    return;
  },

}

module.exports = about;