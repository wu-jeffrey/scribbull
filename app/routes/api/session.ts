import { express } from "express";
const router = express.Router();

// Models
export { Session } from "../../db";

// @route POST api/users
// @desc Register a New User
// @access Public
router.post("/", (req, res, next) => {});

module.exports = router;
