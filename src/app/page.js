import Cards from "@/components/Cards/Cards";
import Header from "@/components/Layout/Header";
import '/public/css/home.css'

export default function Home() {
  return (
    <div className="fondo">
      <Header />
      <Cards />
    </div>
  );
}
