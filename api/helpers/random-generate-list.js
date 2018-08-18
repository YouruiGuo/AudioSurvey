// api/helpers/format-welcome-message.js
module.exports = {

  friendlyName: 'Format welcome message',


  description: 'Return a personalized greeting based on the provided name.',


  inputs: {
    numTotalTrain: {
      type: 'number',
      description: 'the total number of audios for the training'
    },

    numTotalTest: {
      type: 'number',
      description: 'the total number of audios for the testing'
    }
  },


  fn: async function (inputs, exits) {
    var sequenceTrain = [];
    var sequenceTest = [];
    datastore = sails.getDatastore();
    sql = "select distinct trueClass from audio";
    valuesToEscape = [];
    var num = await datastore.sendNativeQuery(sql, valuesToEscape); //the result from the sql query
    //sails.log(num);
    numTotal = inputs.numTotalTest + inputs.numTotalTrain; //number of audios that should be randomly selected to play
    classes = num.rows; 
    var classlist = [];
    for (var i = classes.length - 1; i >= 0; i--) {
      classlist[i] = classes[i].trueClass;
    }
    var numClasses = classlist.length;
    for (var i = 0; i < numClasses; i++) {
      sql_rand = "select musicID from audio where trueClass = $1 order by rand() limit $2";
      valuesToEscape = [classlist[i], numTotal];
      var temp = await datastore.sendNativeQuery(sql_rand, valuesToEscape);

      for (var j = 0; j < temp.rows.length; j++) {
        if (j < inputs.numTotalTrain) {
          sequenceTrain.push(temp.rows[j].musicID);
        }
        else{
          sequenceTest.push(temp.rows[j].musicID);
        }
      }


    }
    //sails.log(sequenceTrain, sequenceTest);
    
    return exits.success({
      0: sequenceTrain,
      1: sequenceTest
    });
  }

};