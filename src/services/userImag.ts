export const setDefaultImg = (first: string, last: string) => {
let combine: string[] = [first.charAt(0), last.charAt(0)];
console.log(combine);
return combine;
};

// setDefaultImg("");





// <Button
// className="navIcon"
// onClick={() => navigate("/profile")}
// >
// {!isLoggedIn ? (
//   <FaUserCircle />
// ) : (
//   <div
//     style={{
//       backgroundColor: "purple",
//       color: "black",
//       borderRadius: "50%",
//       width: "40px",
//       height: "40px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontWeight: "bold",
//       fontSize: "18px",
//     }}
//   >
//     {setDefaultImg(firstName, lastName)}
//   </div>
// )}
// </Button>
// );
// };