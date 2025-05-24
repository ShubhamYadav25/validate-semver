const core = require('@actions/core');
const SemVerValidator = require('./SemVerValidator');

try {
    const version = core.getInput('version');
    const validator = new SemVerValidator();

    if (validator.isValidSemVer(version)) {
        console.log(`ersion "${version}" is valid SemVer.`);
    } else {
        core.setFailed(`Version "${version}" is NOT valid Semantic Versioning.`);
    }
} catch (error) {
    core.setFailed(`Error occurred: ${error.message}`);
}
