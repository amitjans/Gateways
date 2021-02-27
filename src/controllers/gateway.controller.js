const Gateway = require('../models/Gateway');
const Peripheral = require('../models/Peripheral');
const gatewaycontroller = {};

gatewaycontroller.index = async (req, res) => {
	try {
		const list = await Gateway.find().populate('peripherals');
		res.status(200).json(list);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong retriving the list of gateways'
		})
	}
}

gatewaycontroller.details = async (req, res) => {
	try {
		const { id } = req.params;
		const gateway = await Gateway.findById(id).populate('peripherals');
		if (!gateway) {
			return res.status(404).json({ message: `Gateway with id ${id} does not exists` })
		}
		res.json(gateway);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong retriving the list of gateways'
		})
	}
}

gatewaycontroller.create = async (req, res) => {
	try {
		if (!!req.body.serial_number && !!req.body.name && !!req.body.ipv4) {
			if (!(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(localhost)$/.test(req.body.ipv4))) {
				return res.status(422).json({ message: "The format for the IPv4 address is incorrect" });
			}
			const gateway = new Gateway(req.body);
			await gateway.save();
			res.status(201).json({ message: `The gateway has been created.` });
		} else {
			return res.status(422).json({ message: "One or more fields are empty." });
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong saving the gateway'
		})
	}
}

gatewaycontroller.edit = async (req, res) => {
	try {
		if (!!req.body.serial_number && !!req.body.name && !!req.body.ipv4) {
			if (!(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(localhost)$/.test(req.body.ipv4))) {
				return res.status(422).json({ message: "The format for the IPv4 address is incorrect" });
			}
			await Gateway.findByIdAndUpdate(req.params.id, req.body);
			res.status(200).json({ message: `The gateway has been updated.` });
		} else {
			return res.status(422).json({ message: "One or more fields are empty." });
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong editing the gateway'
		})
	}
}

gatewaycontroller.delete = async (req, res) => {
	try {
		await RemoveFromPeripherals(req.params.id);
		await Gateway.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Gateway were deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong deleting the gateway'
		})
	}
}

async function RemoveFromPeripherals(id) {
	let obj = await Gateway.findById(id).populate('peripherals');
	for (let i = 0; i < obj.peripherals.length; i++) {
		let temp = obj.peripherals[i].toObject({ getters: true });
		console.log(temp);
		delete temp.gateway;
		delete temp._id;
		console.log(temp);
		await Peripheral.findByIdAndUpdate(obj.peripherals[i]._id, { $set: temp, $unset: { gateway: null }});

	}
}

module.exports = gatewaycontroller;