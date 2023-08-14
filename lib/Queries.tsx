import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";

export const getData = async (path: string, sessionId: string) => {
  const session = await getServerSession(authOptions);

  const req = await axios.get(`https://ambiental-mvp.vercel.app/api/${path}`, {
    headers: { "session-id": sessionId },
  });

  return req.data;
};

export const getDataWithParams = async (
  path: string,
  sessionId: string,
  certId: string,
) => {
  const req = await axios.get(`https://ambiental-mvp.vercel.app/api/${path}`, {
    headers: { "session-id": sessionId, "cert-id": certId },
  });

  return req.data;
};
