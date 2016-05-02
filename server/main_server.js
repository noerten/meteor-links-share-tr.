Meteor.methods({

    upvote: function(websiteId) {
        var user = Meteor.user();
        // удостоверимся, что пользователь залогинен
        if (!user)
            throw new Meteor.Error(401, "You are not logged in");
        var website = Websites.findOne(websiteId);
        if (_.include(website.voters, user._id))
            throw new Meteor.Error(422, 'You have already voted');
        Websites.update(website._id, {
            $addToSet: {voters: user._id},
            $inc: {votes: 1}
        });
    },
    downvote: function(websiteId) {
        var user = Meteor.user();
        // удостоверимся, что пользователь залогинен
        if (!user)
            throw new Meteor.Error(401, "You are not logged in");
        var website = Websites.findOne(websiteId);
        if (_.include(website.voters, user._id))
            throw new Meteor.Error(422, 'You have already voted');
        Websites.update(website._id, {
            $addToSet: {voters: user._id},
            $inc: {votes: -1}
        });
    }
    });