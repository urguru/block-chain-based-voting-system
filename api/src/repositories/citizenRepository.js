const Citizen = require("../schemas/dao/citizen");

const getCitizenByVoterId = async (voterId) => {
	const result = await Citizen.findOne({ voterId });
	return result;
};

const createCitizen = async (citizen) => {
	const result = await Citizen.create(citizen);
	return result;
};

module.exports = {
	getCitizenByVoterId,
	createCitizen,
};
