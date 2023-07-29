import { Certification, Company } from "@prisma/client";
import axios from "axios";

interface FetcherProps {
    // url: string;
    // method: string;
    body: { email: string; password: string };
    // json?: boolean;
}

export const signin = async (body: { email: string; password: string }) => {
    console.log(body);

    try {
        const response = await axios({
            url: "/api/signin",
            method: "post",
            data: body,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log(response.data);

        if (!response.data) {
            throw new Error("API Error");
        }

        // If json is false, return the entire Axios response object.
        return response;
    } catch (error) {
        // Handle errors, if any
        console.error("Error during fetch:", error);
        throw error; // Optionally, rethrow the error to handle it elsewhere
    }
};

// export default fetcher;

// const fetcher = async ({ url, method, body, json = true }: FetcherProps) => {
//     // console.log(body)
//     const res = await fetch(url, {
//         method,
//         body: body && JSON.stringify(body),
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     });

//     console.log(res);

//     if (!res.ok) {
//         throw new Error("API Error");
//     }

//     if (json) {
//         const data = await res.json();
//         return data;
//     }
// };

export const register = async (user: Partial<Company>) => {
    // console.log(user);
    // return fetcher({
    //     url: "/api/register",
    //     method: "POST",
    //     body: user,
    //     json: false,
    // });
};

// export const signin = async (user: Partial<Company>) => {
//     // console.log(user);

//     return fetcher({
//         url: "/api/signin",
//         method: "POST",
//         body: user,
//         json: true,
//     });
// };
