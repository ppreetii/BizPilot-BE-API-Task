module.exports ={
    ENVIRONMENT :{
        DEV : 'development',
        TEST: 'test',
        PROD: 'production'
    },
    REF_CODE_LEN : 8,
    COUPON_CODE_LEN : 5,
    SALT : 12,
    TEMPLATE: {
        PURCHASE_EMAIL:{
            subject : 'Congratulations!!',
            body : `
            Dear {{name}},
            Thank you for being a loyal customer of our product. As a sign of gratitude, We have specially prepared this code
            for you - {{code}}
            Thank you for all your support. We wish to provide you best services in all way possible.

            Regards,
            Mr.XYZ
            CEO
            ABC Company
            `
        }
    },
    BASE_REF_LINK: "/referral",
    JWT_EXPIRATION: 3600,
    VALIDATION: {
        SIGNUP: {
            PSWD_MIN_LEN: 5,
            PSWD_MAX_LEN: 32,
        }
    }
}