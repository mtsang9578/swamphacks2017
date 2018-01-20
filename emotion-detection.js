var username = '4633a754-fabd-436b-b87f-075a97f3155f';
var password = '5zExNdA6HEBl';
var version_date = '2017-02-27';

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': username,
  'password': password,
  'version_date': version_date
});
// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// var tone_analyzer = new ToneAnalyzerV3({
//   'username': username,
//   'password': password,
//   'version_date': version_date,
//   headers: {
//     'X-Watson-Learning-Opt-Out': 'true'
//   }
// });

module.exports = {
	emotionResponce : function (text, callback) {
		var parameters = {
  			'text': text,
  			'features': {
   					'entities': {
      				'emotion': true,
      				'sentiment': true,
    			},
    			'keywords': {
      				'emotion': true,
      				'sentiment': true
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
  },
      aggregateWatsonData_average_topThree : function(json) {
        var sadnessSum = 0;
        var joySum = 0;
        var fearSum = 0;
        var disgustSum = 0;
        var angerSum = 0;
        var kWords = [];
        var sorter = function(keyword1, keyword2) {
            var magnituteSquared = Math.pow(keyword1.emotion.sadness,2) + Math.pow(keyword1.emotion.joy,2) + Math.pow(keyword1.emotion.fear,2) + Math.pow(keyword1.emotion.disgust,2) + Math.pow(keyword1.emotion.anger,2);
            var magnitute = Math.sqrt(magnituteSquared);
            var magnituteSquared2 = Math.pow(keyword2.emotion.sadness,2) + Math.pow(keyword2.emotion.joy,2) + Math.pow(keyword2.emotion.fear,2) + Math.pow(keyword2.emotion.disgust,2) + Math.pow(keyword2.emotion.anger,2);
            var magnitute2 = Math.sqrt(magnituteSquared2);
            if (magnitute < magnitute2) {
                return 1;
            }
            if (magnitute == magnitute2) {
              return 0;
            }
            return -1;
        };
        json.keywords.forEach(function(keyword){
            sadnessSum += keyword.emotion.sadness;
            joySum += keyword.emotion.joy;
            fearSum += keyword.emotion.fear;
            disgustSum += keyword.emotion.disgust;
            angerSum += keyword.emotion.anger;
            kWords.push(keyword);
        });
        kWords.sort(sorter);
        var i=0;
        topKeyWords = [];
        while (i < kWords.length && i < 3) {
          topKeyWords.push(kWords[i].text);
          i++;
        }
        var aggregateResponce = {
          'sadnessAverage' : (sadnessSum/json.keywords.length),
          'joyAverage'     : (joySum/json.keywords.length),
          'fearAverage'    : (fearSum/json.keywords.length),
          'disgustAverage' : (disgustSum/json.keywords.length),
          'angerAverage'   : (angerSum/json.keywords.length),
          'topKeyWords'    : topKeyWords
        };
        return aggregateResponce;
      }

	// },
 //  toneResponce : function (text, callback) {
 //    var params = {
 //      'tone_input': text,
 //      'content_type': 'application/json'
 //    };
 //    tone_analyzer.tone(params, function(err, response) {
 //      if (err) {
 //        console.log('error:', err);
 //        callback(err);
 //      }
 //      else
 //        callback(response);
 //              // console.log(JSON.stringify(response, null, 2));
 //    });
 //  }
}