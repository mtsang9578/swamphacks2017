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
        var relevanceSum = 0;
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
            sadnessSum += keyword.emotion.sadness * keyword.relevance;
            joySum += keyword.emotion.joy * keyword.relevance;
            fearSum += keyword.emotion.fear * keyword.relevance;
            disgustSum += keyword.emotion.disgust * keyword.relevance;
            angerSum += keyword.emotion.anger * keyword.relevance;
            relevanceSum += keyword.relevance;
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
          'sadnessAverage' : (sadnessSum)/(json.keywords.length/3.55),
          'joyAverage'     : (joySum)/(json.keywords.length/3.55),
          'fearAverage'    : (fearSum)/(json.keywords.length/3.55),
          'disgustAverage' : (disgustSum)/(json.keywords.length/3.55),
          'angerAverage'   : (angerSum)/(json.keywords.length/3.55),
          'topKeyWords'    : topKeyWords
        };
        return aggregateResponce;
      },
      calculateResponse : function(json) {
          //((anger + sadness)2 - joy/5)*100
          var depressionScore = (((json.sadnessAverage+json.fearAverage)/2)-(json.joyAverage/5))*100;
          var state = "";
          var actions = "";
          var lookOut = "";
          switch (true) {   
            case (depressionScore> 25 && depressionScore <= 65):
                state = "Your friend may be in denial about depression.";
                actions = `Because your friend may be feeling lonely and unproductive, try to encourage a happier environment and support them whenever they are feeling down. If your friend's condition gets worse, encourage a healthier lifestyle because that can induce better feelings.`;
                lookOut = "Your friend may be trying to convince themselves that they don't have depression by saying it is because of fatigue, just a bad mood, or the weather";
                break;
            case (depressionScore > 65 && depressionScore <= 85):
                state = "Your friend may be developing depression.";
                actions = "Don't try to hide the problem, but at the same time, know that you cannot fix your friend. The best thing you can do for your friend is to let them know that they are not alone and that you want to help. Even better, you could direct them to a professional for more help.";
                lookOut =  "Your friend may act aggressive and may not react well to criticism. Sometimes they may not be able to concentrate at a task because they are bogged down by frightening thoughts in their head.";
                break;
            case (depressionScore > 85):
                state = "Your friend may be severely depressed.";
                actions = "If your friend is in this state, they would benefit the most from professional help or antidepressants and other medication. Be wary of any suicidal thoughts your friend may have, and if they occur, talk to your friend to let them know that their life is important to you.\n At  the same  time, though, don't forget about your own mental health. Make sure to take care of yourself and don't blame yourself for your friend's conditions. You are doing your best!";
                lookOut = "This is the most dangerous stage of depression. In this state, your friend may not be able to control their behavior and may lash out, but know that when they lash out, it is not their genuine feelings speaking; it is the depression that is speaking. If the depression is very severe, your friend may experience schizophrenia or memory loss.";
                break;
            default:
                state = "Your friend seems to be in a relatively good state";
                actions = "Even though it may seem like your friend seems okay, if you have been concerned for your friend's emotions for a while, you may want to be wary of their actions. You can do this by boosting their self-esteem. It is sure to make them feel even just a little better.";
                break;
              }
           var response = {
            "depressionScore" : depressionScore,
            "state" : state,
            "actions" : actions,
            "lookOut" : lookOut
           };
           return response;
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