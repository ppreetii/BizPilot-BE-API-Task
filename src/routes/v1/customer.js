const { Router } = require("express");

const customerController = require("../../controllers/v1/customer");
const isAuthorised = require("../../middlewares/auth");
const API = require("../../constants/api");

const router = Router();

router.post(API.SIGNUP, customerController.signup);
router.post(API.REFERRAL, customerController.signup);
router.post(API.LOGIN, customerController.login);
router.get('/', customerController.getUser)

module.exports = router;
