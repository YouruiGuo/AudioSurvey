parasails.registerPage('usertest', {

	data: {
		classList: [],
	},

	beforeMount: function(){
		_.extend(this, window.SAILS_LOCALS);

		var classes = this.me.classList;
		classList = classes.split(",");
	},

	mounted: function(){

	},

	methods: {

	}
});