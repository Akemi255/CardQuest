import { SignUp } from "@clerk/nextjs";
import '/public/css/singUp.css'

export default function Page() {
  return(
    <>
      <div className="card-singUp">
      <p className="tituloSingUp">Crea tu cuenta</p>

        <SignUp/>
      </div>
    </>
  )
}