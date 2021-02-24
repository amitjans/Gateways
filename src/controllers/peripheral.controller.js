const Peripheral = require('../models/Peripheral');
const peripheralcontroller = {};

peripheralcontroller.index = async (req, res) => {
	try {
		const list = await Peripheral.find().populate('gateway');
		res.status(200).json(list);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong retriving the peripheral'
		})
	}
}

peripheralcontroller.details = async (req, res) => {
	const { id } = req.params;
	const peripheral = await Peripheral.findById(id);
	if (!peripheral) {
		return res.status(404).json({ message: `Peripheral with id ${id} does not exists` })
	}
	res.json(peripheral);
}

peripheralcontroller.create = async (req, res) => {
	try {
		const peripheral = new Peripheral(req.body);
		res.status(200).json(await peripheral.save());
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong saving the peripheral'
		})
	}
}

peripheralcontroller.edit = async (req, res) => {
	try {
		res.json(await Peripheral.findByIdAndUpdate(req.params.id, req.body));
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong editing the peripheral'
		})
	}
}

peripheralcontroller.delete = async (req, res) => {
	try {
await Peripheral.findByIdAndDelete(req.params.id);
res.json({ message: "Peripheral were deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong deleting the peripheral'
		})
	}
}

module.exports = peripheralcontroller;