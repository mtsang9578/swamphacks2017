// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
	keyFilename: './googleKeyFile.json'
});
const fileNameConst = "./text1.jpg";
module.exports = {
  detectLabels : function (fileName, callback) {
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const fileName = 'Local image file, e.g. /path/to/image.png';

  // Performs label detection on the local file
  client
    .documentTextDetection(fileName)
    .then(results => {
      const labels = results[0].fullTextAnnotation;

    var totalString = '';
    var width = labels.pages[0].width;
    var blocks = labels.pages[0].blocks;
    var blockString = '';
    blocks.forEach(function (block) {
        var paragraphs = block.paragraphs;
        var paragraphString = '';
        paragraphs.forEach(function (paragraph) {
            //paragraphString += paragraph.boundingBox.vertices[0].x + "\n";
            var words = paragraph.words;
            var wordString = '';
            words.forEach(function (word) {
                var symbols = word.symbols;
                var symbolString = '';
                symbols.forEach(function (symbol) {
                    symbolString += symbol.text;
                });
                wordString += symbolString + " ";
            });
            if ((paragraph.boundingBox.vertices[0].x/width) < 0.1){
              paragraphString += wordString + " ";
            } 
        });
        blockString += paragraphString + "\n" ;
    });
    totalString += blockString + "\n\n"

    console.log(totalString);
    callback(totalString);
      //labels.forEach(text => console.log(text));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END vision_label_detection]
  },
  detectFaceExpression : function (fileURL, callback) {
  client
  .faceDetection(fileURL)
  .then(results => {
    const faces = results[0].faceAnnotations;
      callback(faces);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  }
}
