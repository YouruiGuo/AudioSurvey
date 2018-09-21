parasails.registerPage('usertest', {

	data: {

	},

	beforeMount: function(){
		_.extend(this, window.SAILS_LOCALS);


	},

	mounted: function(){
		this._timerButton();
		this.hide();

	},

	methods: {

		_timerButton: function(){
			$('#nextButton').attr('disabled','disabled').css({'background-color':'grey'});
			setTimeout(this.enableButton, 20000);

		},

		enableButton: function(){
			$('#nextButton').removeAttr('disabled').css({'background-color':'black'});
		},

		unhide: function(){
			$('#answer').css("display", "block");
		},

		hide: function(){
			$('#answer').css("display", "none");

		}

	}
});
