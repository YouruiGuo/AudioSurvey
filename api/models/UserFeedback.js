/**
 * UserFeedback.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        musicID: {
            type: 'string',
        },

        trueClass: {
            type : 'string',
        },

        predictedClass: {
            type: 'string'
        },

        isTraining: {
            type: 'boolean',
            description: 'whether the music is in training set or testing set',
        }

        userID: {
            model: 'User',
        }
               

    },

};

