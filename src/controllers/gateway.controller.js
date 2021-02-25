const Gateway = require('../models/Gateway');
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
				return res.status(422).json({ error: "The format for the IPv4 address is incorrect" });
			}
			const gateway = new Gateway(req.body);
			res.status(201).json(await gateway.save());
		} else {
			return res.status(422).json({ error: "One or more fields are empty." });
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
				return res.status(422).json({ error: "The format for the IPv4 address is incorrect" });
			}
			res.status(200).json(await Gateway.findByIdAndUpdate(req.params.id, req.body));
		} else {
			return res.status(422).json({ error: "One or more fields are empty." });
		}
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong editing the gateway'
		})
	}
}

gatewaycontroller.delete = async (req, res) => {
	try {
		await Gateway.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Gateway were deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Something goes wrong deleting the gateway'
		})
	}
}

module.exports = gatewaycontroller;