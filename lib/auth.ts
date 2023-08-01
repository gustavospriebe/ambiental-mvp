import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
    plainTextPassword: string,
    hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);




// deletar as seguintes funcoes depois de refatorar
export const createJWT = (user: any) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    console.log(`user: ${user}`);
    const issuedAtInSeconds = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAtInSeconds + 60 * 60 * 24 * 7;

    return new SignJWT({ payload: { id: user.id, email: user.email } })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(expiresAt)
        .setIssuedAt(issuedAtInSeconds)
        .setNotBefore(issuedAtInSeconds)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: any) => {
    console.log(`jwt: ${jwt}`);
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload as any;
};

export const getUserFromCookie = async (cookies: any) => {
    console.log(`cookies: ${cookies}`);
    const jwt = cookies.get(process.env.COOKIE_NAME);

    const { id } = await validateJWT(jwt?.value);

    const user = await db.company.findUnique({
        where: {
            id: id as string,
        },
    });

    return user;
};
