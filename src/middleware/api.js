const JWT = require("jsonwebtoken");
const BEARER = 'Bearer ';

export function auth(request, response, next) {
    const header = request["headers"]["authorization"];
    if (header === undefined || !header.startsWith(BEARER))
        return response.status(401).json({
            type: "unauthorized",
            message: "Invalid Token Type",
        });
    const token = header.substring(BEARER.length, header.length);
    if (token === null || token === undefined)
        return response.status(401).json({
            type: "unauthorized",
            message: "Invalid Token Type",
        });
    JWT.verify(token, "SANGGOROSECRETKEY", async (e, user) => {
        if (e) {
            return response.status(401).json({
                type: "unauthorized",
                message: "Token Not Verified",
            });
        }
        request.user = user;
    });
    next();
}