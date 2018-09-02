module.exports = {


  friendlyName: 'View result',


  description: 'Display "Result" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/result'
    }

  },


  fn: async function (inputs, exits) {
    
    var user = await User.findOne({id: this.req.me.id});
    classList = user.classList.split(",");
    datastore = sails.getDatastore();
    var sql = "select * from userfeedback where userID = $1 and isTraining = 0 and musicID != ''";
    var valuesToEscape = [user.id];
    var re = await datastore.sendNativeQuery(sql, valuesToEscape);

    var matrix = Array(classList.length).fill().map(() => Array(classList.length).fill(0));

    accuracy = 0;
    for (var i = 0; i < re.rows.length; i++) {
      if (re.rows[i].trueClass == re.rows[i].predictedClass) {
        accuracy += 1;
      }
      matrix[classList.indexOf(re.rows[i].trueClass)][classList.indexOf(re.rows[i].predictedClass)] += 1;
      
    }
    accuracy = accuracy*100.0 / re.rows.length;
    sails.log(accuracy);
    sails.log(matrix);
    // Respond with view.
    return exits.success({
      accuracy: accuracy,
      matrix: matrix,
      classList: classList
    });

  }


};
