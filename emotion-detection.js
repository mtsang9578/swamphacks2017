var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '4633a754-fabd-436b-b87f-075a97f3155f',
  'password': '5zExNdA6HEBl',
  'version_date': '2017-02-27'
});

module.exports = {
	emotionResponce : function (text, callback) {
		var parameters = {
  			'text': text,
  			'features': {
   					'entities': {
      				'emotion': true,
      				'sentiment': true,
      				'limit': 2
    			},
    			'keywords': {
      				'emotion': true,
      				'sentiment': true,
      				'limit': 2
    			}
  			}
		}
		natural_language_understanding.analyze(parameters, function(err, response) {
  		if (err) {
    		console.log('error:', err);
    		callback(err);
    	}
  		else
    		callback(response);
    	    		// console.log(JSON.stringify(response, null, 2));
		});
	}
}