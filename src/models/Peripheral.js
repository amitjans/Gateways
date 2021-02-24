const mongoose = require('mongoose');
const { Schema } = mongoose;

const peripheralSchema = new Schema({
	uid: { type: Number, required: true },
	vendor: { type: String, required: true, trim: true },
	created: { type: Date, default: Date.now },
	status: { type: Boolean, default: false },
	gateway: { type: Schema.Types.ObjectId, ref: 'Gateway' }
}, {
	versionKey: false,
	timestamps: true
});

module.exports = mongoose.model('Peripheral', peripheralSchema);