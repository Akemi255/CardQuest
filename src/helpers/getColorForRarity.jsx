export function getColorForRarity(rareza) {
    switch (rareza.toLowerCase()) {
      case "comun":
        return "border-red-800"; // Color RGB(82, 4, 4)
      case "plata":
        return "border-gray-300";
      case "oro":
        return "border-yellow-500"; // Color #FFD700
      case "raro":
        return "border-green-500"; // Color #1ecf4d
      case "epico":
        return "border-indigo-600"; // Color #271ecf
      case "mitico":
        return "border-pink-500"; // Color RGB(255, 0, 242)
      default:
        return "border-blue-500"; // Color por defecto
    }
  }