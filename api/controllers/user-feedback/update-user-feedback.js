module.exports = {


  friendlyName: 'Update user feedback',


  description: '',


  inputs: {
  	
  	predictedClass: {
  		type: 'string',
  		description: 'userFeedback'
  	},
  	
  },


  exits: {

      success: {

      }
  },


  fn: async function (inputs, exits) {

    sails.log("here");

  	var user = await User.find({id: this.req.me.id}).limit(1);
    var cPlay = user.currentPlay;
    await User.update({id: this.req.me.id}).set({
  	  	currentPlay: cPlay+1
  	});
  	cPlay = cPlay+1;

  	var istrain = false;
  	var mID;
  	var numTrain = user.sequenceTrain.split(",").length;
  	var numTest = user.sequenceTest.split(",").length;
  	if (cPlay < numTrain) {
  		mID = user.sequenceTrain.split(",")[cPlay];
  		istrain = true;
  	}
  	else{
  		mID = user.sequenceTest.split(",")[cPlay-numTrain];
  		istrain = false;
  	}

  	if (cPlay != 0) {
  		var audioInfo = await Audio.findOne({musicID: mID});
	  	await UserFeedback.create({
	  		musicID: mID,
	  		trueClass: audioInfo.trueClass,
	  		isTraining: istrain,
	  		predictedClass: inputs.predictedClass,
	  		//TODO: user
	  	});
	  	
  	}

  	if (cPlay > numTest+numTrain) {
  		//TODO: Redirect
  	}

    return exits.success();

  }


};
