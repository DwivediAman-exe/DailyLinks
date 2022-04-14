const User = require('../models/user');
const Link = require('../models/link');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/auth');
const nanoid = require('nanoid');
const expressJwt = require('express-jwt');
const cloudinary = require('cloudinary');

// nodemailer
const nodemailer = require('nodemailer');

// cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// middleware
exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

exports.signup = async (req, res) => {
	console.log('HIT SIGNUP');
	try {
		// validation
		const { name, email, password } = req.body;
		if (!name) {
			return res.json({
				error: 'Name is required',
			});
		}
		if (!email) {
			return res.json({
				error: 'Email is required',
			});
		}
		if (!password || password.length < 6) {
			return res.json({
				error: 'Password is required and should be 6 characters long',
			});
		}
		const exist = await User.findOne({ email });
		if (exist) {
			return res.json({
				error: 'Email is taken',
			});
		}
		// hash password
		const hashedPassword = await hashPassword(password);

		try {
			const user = await new User({
				name,
				email,
				password: hashedPassword,
			}).save();

			// create signed token
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			});

			//   console.log(user);
			const { password, ...rest } = user._doc;
			return res.json({
				token,
				user: rest,
			});
		} catch (err) {
			console.log(err);
		}
	} catch (err) {
		console.log(err);
	}
};

exports.signin = async (req, res) => {
	// console.log(req.body);
	try {
		const { email, password } = req.body;
		// check if our db has user with that email
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({
				error: 'No user found',
			});
		}
		// check password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.json({
				error: 'Wrong password',
			});
		}
		// create signed token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		user.password = undefined;
		user.secret = undefined;
		res.json({
			token,
			user,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).send('Error. Try again.');
	}
};

exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	// find user by email
	const user = await User.findOne({ email });

	if (!user) {
		return res.json({ error: 'User not found' });
	}

	// generate code
	const resetCode = nanoid(5).toUpperCase();

	// save to db
	user.resetCode = resetCode;
	user.save();

	// prepare transporter for nodemailer
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_FROM,
			pass: process.env.EMAIL_FROM_PASSWORD,
		},
	});

	// prepare mail
	const message = {
		from: 'DailyLinks ✔" <noreply@gmail.com>',
		to: `${email}`,
		subject: 'Password Reset Request Code ✔',
		html: `<h2>Enter this code in the app</h2>
		<h3>Your Password reset code is: ${resetCode}</h3>`,
	};

	// send email
	transporter.sendMail(message, function (err, info) {
		if (err) {
			console.log(err);
			return res.json({ ok: false });
		} else {
			// console.log(info);
			return res.json({ ok: true });
		}
	});
};

exports.resetPassword = async (req, res) => {
	try {
		const { email, password, resetCode } = req.body;

		// find user based on email and resetCode
		const user = await User.findOne({ email, resetCode });

		// if user not found
		if (!user) {
			return res.json({ error: 'Email or reset code is invalid' });
		}

		// if password is short
		if (!password || password.length < 6) {
			return res.json({
				error: 'Password is required and should be 6 characters long',
			});
		}

		// hash password
		const hashedPassword = await hashPassword(password);
		user.password = hashedPassword;
		user.resetCode = '';
		user.save();
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};

exports.uploadImage = async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.body.image, {
			public_id: nanoid(),
			resource_type: 'jpg',
		});

		// updating user model
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				image: {
					public_id: result.public_id,
					url: result.secure_url,
				},
			},
			{ new: true }
		);

		return res.json({
			name: user.name,
			email: user.email,
			role: user.role,
			image: user.image,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.updatePassword = async (req, res) => {
	try {
		const { password } = req.body;

		if (password && password.length < 6) {
			return res.json({
				error: 'Password is required and must be alteat 6 characters long',
			});
		} else {
			const hashedPassword = await hashPassword(password);
			const user = await User.findByIdAndUpdate(
				req.user._id,
				{
					password: hashedPassword,
				},
				{ new: true }
			);

			user.password = undefined;
			user.secret = undefined;

			return res.json(user);
		}
	} catch (err) {
		console.log(err);
	}
};

exports.userProfile = async (req, res) => {
	try {
		const profile = await User.findById(req.params.userId).select(
			'-password -secret'
		);

		const links = await Link.find({
			postedBy: req.params.userId,
		})
			.populate('postedBy', '_id')
			.select('urlPreview views likes');

		return res.json({ profile, links });
	} catch (err) {
		console.log(err);
	}
};
