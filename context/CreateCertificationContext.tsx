import axios from "axios";

const createNewCertification = async () => {
  return await axios.post("http://localhost:3000/api/certification", {
    headers: { "session-id": session?.user.id },
    body: {
      name: "Facenok Certification",
      description: "Lorem ipsum fkfj",
      due: "2023-10-27T03:00:00.000Z",
    },
  });
};

export default createNewCertification;
