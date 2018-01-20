// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
	keyFilename: './googleKeyFile.json'
});
const fileNameConst = "./text.png";
module.exports = { 
  detectLabels : function (fileName) {
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs label detection on the local file
  client
    .textDetection(fileNameConst)
    .then(results => {
      const labels = results[0].textAnnotations;
      console.log('Text:');
      labels.forEach(text => console.log(text));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_label_detection]
}
}
