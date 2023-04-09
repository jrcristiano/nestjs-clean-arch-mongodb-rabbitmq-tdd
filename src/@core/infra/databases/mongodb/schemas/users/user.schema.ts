import { Schema } from 'mongoose';

const User = new Schema(
	{
		name: { required: true, type: String, trim: true },
		lastname: { required: true, type: String, trim: true },
		email: { required: true, type: String, trim: true },
		password: { required: true, type: String, trim: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

export default User;
