const { ER_CONSTITUENCY_ALREADY_EXISTS } = require("../common/errors");
const constituencyRepository = require("../repositories/constituencyRepository");

const createConstituency = async (constituency) => {
	const existingConstituency = await constituencyRepository.getConstituencyByConstituencyId(constituency.constituencyId);
	if (!existingConstituency) {
		const result = await constituencyRepository.createConstituency(constituency);
		const structuredResult = {
			name: result.name,
			constituencyId: result.constituencyId,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
		};
		return structuredResult;
	} else {
		throw ER_CONSTITUENCY_ALREADY_EXISTS;
	}
};

module.exports = {
	createConstituency,
};
