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

  	var u = await User.find({id: this.req.me.id}).limit(1);
    var user = u[0];
    var cPlay = user.currentPlay;
    
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

		var au = await Audio.find({musicID: mID}).limit(1);
    var audioInfo = au[0];
  	await UserFeedback.create({
  		musicID: mID,
  		trueClass: audioInfo.trueClass,
  		isTraining: istrain,
  		predictedClass: inputs.predictedClass,
  		userID: this.req.me.id
  	});
	  sails.log("here:" mID);  
    await User.update({id: this.req.me.id}).set({
        currentPlay: cPlay+1,
    });
    cPlay = cPlay+1;
    if (cPlay >= numTest+numTrain) {
      return this.res.redirect("/result");
    }
  	else {
      return this.res.redirect("/test/");
    }
    
    //return exits.success();

  }


};
