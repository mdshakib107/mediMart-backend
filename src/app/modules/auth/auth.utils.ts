import jwt, { JwtPayload,Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { email: string; role: string },
    secret: Secret, 
    expiresIn: number | string  
  ): string => {
    const options: SignOptions = { expiresIn: expiresIn as number | SignOptions["expiresIn"] }; 
    return jwt.sign(jwtPayload, secret, options);
  };
  
  export const verifyToken = (token: string, secret: Secret): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
  };
