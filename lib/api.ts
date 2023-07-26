interface fetcherProps {
    url: string;
    method: string;
    body: {};
    json: boolean;
}

interface userProps {
    companyName?: string;
    email: string;
    password: string;
}

const fetcher = async ({ url, method, body, json = true }: fetcherProps) => {
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("API Error");
    }

    if (json) {
        const data = await res.json();
        return data;
    }
};

export const register = async (user: userProps) => {
    console.log(user);

    // return fetcher({
    //     url: "/api/register",
    //     method: "POST",
    //     body: user,
    //     json: false,
    // });
};

export const signin = async (user: userProps) => {
    console.log(user);

    // return fetcher({
    //     url: "/api/signin",
    //     method: "POST",
    //     body: user,
    //     json: false,
    // });
};
