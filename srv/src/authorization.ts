import express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

export default function jwtAuthorization(): express.RequestHandler {
  return jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-xo32gxsh.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://github-commenter/api",
    issuer: "https://dev-xo32gxsh.auth0.com/",
    algorithms: ["RS256"],
  });
}

// TODO add in profile information
export function laxAuthentication(): express.RequestHandler {
  return (req, res, next) => {
    next();
  };
}
