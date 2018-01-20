var googleDetection = require ('../google-vision.js');
var emotionDetection = require ('../emotion-detection.js');

module.exports = {
    concentrateText : function (urls, callback) {
        var longText = '';
        var itemsProcessed = 0;

        urls.forEach( function (url) {
            longText += googleDetection.detectLabels(url);
            itemsProcessed++;
                if (itemsProcessed == urls.length){
                    console.log('just finished processing text');
                    console.log(longText);
                    emotionDetection.emotionResponse(longText, function(json) {
                        callback(json);
                    });
                }
        });
    }
}
