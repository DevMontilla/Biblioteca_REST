const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("./validate-jwt");

module.exports = {
    ...validateFields,
    ...validateJWT,
}
