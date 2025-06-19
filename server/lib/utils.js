import jwt from 'jsonwebtoken';

// Secret key for JWT signing
export const generateAuthToken = (userId) => {
    // Generate a token with a validity of 7 days
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}