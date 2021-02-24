const mongoose = require('mongoose');
const { Schema } = mongoose;

const gatewaySchema = new Schema({
	serial_number: { type: String, required: true, trim: true },
	name: { type: String, required: true, trim: true },
	ipv4: { type: String, required: true, trim: true },
	peripherals: [{ type: Schema.Types.ObjectId, ref: 'Peripheral' }]
}, {
	versionKey: false,
	timestamps: true
});

module.exports = mongoose.model('Gateway', gatewaySchema);