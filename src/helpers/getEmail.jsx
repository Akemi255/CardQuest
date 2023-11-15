

export const getEmail = () => {
    if (typeof window !== "undefined") {
  let email = localStorage.getItem('email')
  return email;}
  else{
    return null
  }
}

