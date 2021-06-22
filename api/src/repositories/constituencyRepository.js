const Constituency = require("../schemas/dao/constituency");

const createConstituency = async (constituency) => {
	const result = await Constituency.create(constituency);
	return result;
};

const getConstituencyByConstituencyId = async (constituencyId) => {
	console.log(constituencyId);
	const result = await Constituency.findOne({ constituencyId });
	return result;
};

module.exports = {
	createConstituency,
	getConstituencyByConstituencyId,
};
