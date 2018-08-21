module.exports = {


  friendlyName: 'Create user feedback',


  description: '',


  inputs: {

  },


  exits: {
  	success: {
      viewTemplatePath: 'pages/usertest',
    }
  },


  fn: async function (inputs, exits) {

  	var user = await User.findOne({id: this.req.me.id});
  	var cPlay = user.currentPlay;

  	var istrain = false;
  	var mID;

  	var numTrain = user.sequenceTrain.split(",").length;
  	var numTest = user.sequenceTest.split(",").length;
  	sails.log(cPlay);
  	sails.log(numTest+numTrain);
  	if (cPlay >= numTrain+numTest) {
  		return this.res.redirect("/result");
  	}
  	if (cPlay < user.sequenceTrain.split(",").length) {
  		mID = user.sequenceTrain.split(",")[cPlay];
  		istrain = true;
  	}
  	else{
  		mID = user.sequenceTest.split(",")[cPlay-numTrain];
  		istrain = false;
  	}

  	await User.update({id: this.req.me.id}).set({
  		currentPlayID: mID
  	});
  	sails.log(mID);

    var au = await Audio.find({musicID: mID}).limit(1);
    var audioInfo = au[0];
    trueClass = audioInfo.trueClass;

  	var classl;
  	
  	if (!user.classList) {
  		sql = "select distinct trueClass from audio";
	    valuesToEscape = [];
	    datastore = sails.getDatastore();
	    var cl = await datastore.sendNativeQuery(sql, valuesToEscape); //the result from the sql query
	    var classlist = [];
	    classes = cl.rows; 
	    
	    for (var i = classes.length - 1; i >= 0; i--) {
	      classlist[i] = classes[i].trueClass;
	    }
	    classl = classlist.join();
	    await User.update({id: this.req.me.id}).set({
	    	classList: classlist.join()
	    });
  	}
  	else{
  		classl = user.classList;
  	}

    //sails.log(mID);
  	//sails.log(classlist);

    return exits.success({
    	mID: mID,
    	classList: classl,
      cPlay: cPlay,
      totalNum: numTrain+numTest,
      isTrain: istrain,
      trueClass: trueClass
    });

  }


};
