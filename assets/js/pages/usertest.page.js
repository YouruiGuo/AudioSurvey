parasails.registerPage('usertest', {

	data: {
	
	},

	beforeMount: function(){
		_.extend(this, window.SAILS_LOCALS);
		
		
	},

	mounted: function(){
		this._timerButton();

	},

	methods: {

		_timerButton: function(){
			$('#nextButton').attr('disabled','disabled').css({'background-color':'grey'});
			setTimeout(this.enableButton, 20000);
			
		},

		enableButton: function(){
			$('#nextButton').removeAttr('disabled').css({'background-color':'black'});
		}
		

	}
});