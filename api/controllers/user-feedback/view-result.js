module.exports = {


  friendlyName: 'View result',


  description: 'Display "Result" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/result'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
