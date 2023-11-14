

export const getEmail = () => {
    if (typeof window !== "undefined") {
  let email = localStorage.getItem('email')
  console.log(email);
  return email;}
  else{
    return null
  }
}

