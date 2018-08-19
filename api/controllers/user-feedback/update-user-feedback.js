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

  },


  fn: async function (inputs, exits) {

	var user = await User.findOne({id: this.req.me.id});
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
  		var audioInfo = await audio.findOne({musicID: mID});
	  	await userFeedback.create({
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
