const Peripheral = require('../models/Peripheral');
const Gateway = require('../models/Gateway');
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
	try {
		const { id } = req.params;
		const peripheral = await Peripheral.findById(id);
		if (!peripheral) {
			return res.status(404).json({ message: `Peripheral with id ${id} does not exists` })
		}
		res.json(peripheral);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong saving the peripheral'
		})
	}
}

peripheralcontroller.create = async (req, res) => {
	try {
		if (!!req.body.uid && !!req.body.vendor) {
			if (!/[0-9]+/.test(req.body.uid)) {
				return res.status(422).json({ error: "The value of the UID field must be a number." });
			}
			let _gateway = await Gateway.findById(req.body.gateway);
			if (_gateway.peripherals.length >= 10) {
				return res.status(422).json({ error: `The selected Gateway (${_gateway.name}) have already 10 peripheral devices assigned.` });
			}
			const peripheral = new Peripheral(req.body);
			let _peripheral = await peripheral.save();
			_gateway.peripherals.push(_peripheral);
			await Gateway.findByIdAndUpdate(_peripheral.gateway, _gateway);
			res.status(201).json({ success: `The peripheral has been stored in the system.` });
		} else {
			return res.status(422).json({ error: "One or more fields are empty." });
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong saving the peripheral'
		})
	}
}

peripheralcontroller.edit = async (req, res) => {
	try {
		if (!!req.body.uid && !!req.body.vendor) {
			if (!/[0-9]+/.test(req.body.uid)) {
				return res.status(422).json({ error: "The value of the UID field must be a number." });
			}
			res.status(200).json(await Peripheral.findByIdAndUpdate(req.params.id, req.body));
		} else {
			return res.status(422).json({ error: "One or more fields are empty." });
		}
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