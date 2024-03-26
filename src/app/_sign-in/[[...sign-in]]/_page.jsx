import { SignIn } from "@clerk/nextjs";
import "public/css/login.css";

export default function Page() {
  return (
    <div className="fondoMontania">
      <div className="prueba">
        <h1 className="h1Prueba">¡BIENVENIDO!</h1>
        <p className="tituloInicia">INICIA SESION</p>
        <SignIn />
      </div>
    </div>
  );
}
