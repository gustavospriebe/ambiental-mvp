import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import axios from "axios";

export const getData = async (oi: string) => {
  const session = await getServerSession(authOptions);

  const req = await axios.get("http://localhost:3000/api/certifications", {
    headers: { "session-id": session?.user.id },
  });

  const { certificationData } = req.data;

  console.log(oi);

  return certificationData;
};

// async function createNewCertification() {
  //   const req = await axios.post("http://localhost:3000/api/certification", {
  //     headers: { "session-id": session?.user.id },
  //     body: {
  //       name: "Facenok Certification",
  //       description: "Lorem ipsum fkfj",
  //       due: "2023-10-27T03:00:00.000Z",
  //     },
  //   });

  //   return req;
  // }
