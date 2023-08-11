import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import axios from "axios";

export const getData = async (path: string) => {
  const session = await getServerSession(authOptions);

  const req = await axios.get(`http://localhost:3000/api/${path}`, {
    headers: { "session-id": session?.user.id },
  });

  return req.data;
};

export const createCertification = async () => {
  const session = await getServerSession(authOptions);

  const req = await axios.post("http://localhost:3000/api/certification", {
    headers: { "session-id": session?.user.id },
    body: {
      name: "Facenok Certification",
      description: "Lorem ipsum fkfj",
      due: "2023-10-27T03:00:00.000Z",
    },
  });

  return req;
};
