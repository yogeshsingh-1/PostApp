const cookieOption = () => {
  return {
    maxAge: 5 * 60 * 60 * 1000, //5h
    secure: false,
    sameSite: "lax",
    httpOnly: true,
  };
};
export default cookieOption;
