import jsonwebtoken from "jsonwebtoken";

const generarJWT = (id) => {
  const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
export default generarJWT;
