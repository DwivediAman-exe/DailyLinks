const mongoose = require('mongoose');
const { Schema } = mongoose;

const linkSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		link: {
			type: String,
			trim: true,
			required: true,
		},
		urlPreview: {},
		postedBy: {
			type: ObjectId,
			ref: 'User',
		},
		views: { type: Number, default: 0 },
		likes: [{ type: ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
