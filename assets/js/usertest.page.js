parasails.registerPage('usertest', {

	data: {
			  // Form data
	    formData: { /* … */ },

	    // For tracking client-side validation errors in our form.
	    // > Has property set to `true` for each invalid property in `formData`.
	    formErrors: { /* … */ },

	    // Syncing / loading state
	    syncing: false,

	    // Server error state
	    cloudError: '',

	    // Success state when form has been submitted
	    cloudSuccess: false,
	},

	beforeMount: function(){
		_.extend(this, window.SAILS_LOCALS);

	},

	mounted: function(){

	},

	methods: {


		submittedForm: async function() {
	      // Redirect to the logged-in dashboard on success.
	      // > (Note that we re-enable the syncing state here.  This is on purpose--
	      // > to make sure the spinner stays there until the page navigation finishes.)
	      this.syncing = true;
	      window.location = '/test';
	    },


		 handleParsingForm: function() {
	      // Clear out any pre-existing error messages.
	      this.formErrors = {};

	      var argins = this.formData;

	      // Validate full name:
	      if(!argins.fullName) {
	        this.formErrors.fullName = true;
	      }

	      // Validate email:
	      if(!argins.emailAddress || !parasails.util.isValidEmailAddress(argins.emailAddress)) {
	        this.formErrors.emailAddress = true;
	      }

	      // Validate password:
	      if(!argins.password) {
	        this.formErrors.password = true;
	      }

	      // Validate password confirmation:
	      if(argins.password && argins.password !== argins.confirmPassword) {
	        this.formErrors.confirmPassword = true;
	      }

	      // Validate ToS agreement:
	      if(!argins.agreed) {
	        this.formErrors.agreed = true;
	      }

	      // If there were any issues, they've already now been communicated to the user,
	      // so simply return undefined.  (This signifies that the submission should be
	      // cancelled.)
	      if (Object.keys(this.formErrors).length > 0) {
	        return;
	      }

	      return argins;
	    },

	}
});