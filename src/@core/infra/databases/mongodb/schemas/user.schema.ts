import { Schema } from 'mongoose';

const User = new Schema(
	{
		name: { type: String, trim: true },
		lastname: { type: String, trim: true },
		email: { type: String, trim: true },
		password: { type: String, trim: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

export default User;
