const pollingBoothRepository = require('../repositories/pollingBoothRepository');
const adminRepository = require('../repositories/adminRepository');
const constants = require('./constants');
const logger = require('../logging/logger');

const populateCECAndGenesisPollingBooth = async () => {
    const existingCEC = await adminRepository.getCECDetails();
    if (existingCEC) {
        logger.info("There already exists a CEC in the database so cannot createa new one");
        return;
    }
    const pollingBoothId = process.env.GENESIS_ADDRESS;
    const existingPollingBooth = await pollingBoothRepository.getPollingBoothByPollingBoothId(pollingBoothId);
    if (existingPollingBooth) {
        logger.info("The PollingBoothId provided in the config file is already present.So aborting CEC creation with the given pollingBoothId")
        return;
    }
    const email = process.env.EMAIL;
    const existingAdmin = await adminRepository.getAdminByEmailId(email);
    if (existingAdmin) {
        logger.info("There already exists an admin with the emailId mentioned in the config.So aborting the CEC creation with the given emailId")
        return;
    }
    const password = process.env.PASSWORD;
    const name = process.env.NAME;
    const gender = process.env.GENDER;
    const pollingBooth = {
        pollingBoothId,
        name: "Mobile PollingBooth"
    }
    const admin = {
        name,
        gender,
        email,
        password,
        pollingBoothId,
        role: constants.roles.CEC
    }
    await adminRepository.createCECWithGenesisPollingBooth(admin, pollingBooth);
    logger.info("Created CEC and Genesis Polling Booth with the details provided in the config file");
}

module.exports = {
    populateCECAndGenesisPollingBooth
}