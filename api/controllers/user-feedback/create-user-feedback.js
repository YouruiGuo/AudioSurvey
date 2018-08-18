module.exports = {


  friendlyName: 'Create user feedback',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

  	var user = await User.findOne({id: this.req.me.id});
  	var cPlay = user.currentPlay;
  	var istrain = false;
  	var mID;
  	if (cPlay < user.sequenceTrain.split(",").length) {
  		mID = user.sequenceTrain.split(",")[cPlay];
  		istrain = true;
  	}
  	else{
  		mID = user.sequenceTest.split(",")[cPlay];
  		istrain = false;
  	}

  	sql = "select distinct trueClass from audio";
    valuesToEscape = [];
    var cl = await datastore.sendNativeQuery(sql, valuesToEscape); //the result from the sql query
    //sails.log(num);
    classes = cl.rows; 
    var classlist = [];
    for (var i = classes.length - 1; i >= 0; i--) {
      classlist[i] = classes[i].trueClass;
    }
  	
    return exits.success({
    	musicID: mID,
    	classes: classlist
    });

  }


};
