var googleDetection = require ('../google-vision.js');
var emotionDetection = require ('../emotion-detection.js');

module.exports = {
    concentrateText : function (urls, callback2) {
        console.log("in concentrateText");
        var longText = '';
        var itemsProcessed = 0;

        urls.forEach( function (url) {
            console.log("in foreach loop in process-screenshot");
            googleDetection.detectLabels(url, function(text){
                console.log("url processed");
                longText+=text;
                itemsProcessed++;
                if (itemsProcessed == urls.length) {
                    console.log('just finished processing text');
                    console.log(longText);
                    emotionDetection.emotionResponce(longText, function(json) {
                        console.log("emotion responce finisehd");
                        callback2(json);
                    });
                }
            });
        });
    }
}
