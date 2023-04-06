const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Customer = require("../models/customer");
const COMMON = require("../constants/common");
const API = require("../constants/api");
const Utils = require("../utils/helper");
const config = require("../configs/config");

const { sendEmail } = require("../utils/email");

exports.signup = async (name, email, password, referralCodeUsed = null) => {
  try {
    let referer;
    if (referralCodeUsed) {
      referer = await Customer.findOne({
        where: { referral_code: referralCodeUsed },
      });

      if (!referer) {
        return {
          status: 404,
          message: "Invalid Link",
        };
      }
    }
    const isUserExist = await Customer.findOne({ where: { email } });
    if (isUserExist) {
      return {
        status: 400,
        message: "User already exists with this email.",
      };
    }
    const referralCode = Utils.generateCode(COMMON.REF_CODE_LEN);

    const hashedPswd = await bcrypt.hash(password, COMMON.SALT);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPswd,
      referral_code: referralCode,
    });

    if (referralCodeUsed && referer) {
      newCustomer.referred_by = referer.id;
      newCustomer.referred_code_used = referralCodeUsed;

      if (referer.position > 1) {
        referer.position -= 1;
        await referer.save();
      } else {
        // check if coupon is not already given out, then only send email with purchase code
        if (!referer.purchase_coupon_code) {
          const purchaseCode = Utils.generateCode(COMMON.COUPON_CODE_LEN);
          referer.purchase_coupon_code = purchaseCode;
          await referer.save();
          let subject = COMMON.TEMPLATE.PURCHASE_EMAIL.subject;
          let body = COMMON.TEMPLATE.PURCHASE_EMAIL.body
            .replace(/{{name}}/g, referer.name)
            .replace(/{{code}}/g, purchaseCode);

          await sendEmail(subject, body, referer.email);
        }
      }
    }

    await newCustomer.save();

    const referralLink =
      API.CUSTOMER + COMMON.BASE_REF_LINK + `/${referralCode}`;
    return {
      id: newCustomer.id,
      email: newCustomer.email,
      waitingListPosition: newCustomer.position,
      referralCode,
      referralLink,
    };
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await Customer.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          config.jwtSecret,
          { expiresIn: COMMON.JWT_EXPIRATION }
        );

        return {
          id: user.id,
          email,
          access_token: `Bearer ${token}`,
          expires_in: 3600,
        };
      } else {
        return {
          status: 400,
          message: "Incorrect Password",
        };
      }
    } else {
      return {
        status: 404,
        message: "Customer Not Found",
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (id, code) => {
  try {
    let userQuery = {};
    if (id) userQuery.id = id;
    if (code) userQuery.referral_code = code;

    const user = await Customer.findOne({
      where: userQuery,
    });

    if (!user) {
      return {
        status: 404,
        message: code & id || id ? "User Not Found" : code ? "Invalid Code" : "Invalid Data"
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      position: user.position,
      referralCode: user.referral_code,
    };
  } catch (error) {
    throw error;
  }
};
