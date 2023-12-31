export const calculateNewFavoritesValue = (currentFavorites) => {
    let newValue = currentFavorites;

    if (currentFavorites > 1000) {
        if (currentFavorites >= 2000 && currentFavorites < 5000) {
            // Reducir en 1000 si está entre 2000 y 5000
            currentFavorites -= 1000;
        } else if (currentFavorites >= 5000 && currentFavorites < 7000) {
            // Limitar a 5000 si es mayor a 5000
            currentFavorites = Math.max(currentFavorites - 3000, 5000);
        } else if (currentFavorites >= 7000) {
            // Limitar a 5000 si es mayor a 7000
            currentFavorites = Math.max(currentFavorites - 4500, 5000);
        }
        // Más de 1000 favoritos
        newValue += calculateIncrement(currentFavorites);
    } else if (currentFavorites >= 500) {
        // Entre 500 y 1000 favoritos
        newValue += calculateIncrement(currentFavorites);
    } else if (currentFavorites >= 100) {
        // Entre 100 y 500 favoritos
        newValue += calculateIncrement(currentFavorites);
    } else if (currentFavorites >= 0) {
        // Entre 0 y 100 favoritos
        newValue += calculateIncrement(currentFavorites);
    }

    // Asegurar que el nuevo valor no supere 8000 si es mayor a 5000
    if (newValue > 8000 && currentFavorites > 5000) {
        newValue = 8000;
    }

    // Asegurar que el nuevo valor no supere 10000
    if (newValue > 10000) {
        newValue = 10000;
    }

    return newValue;
};

// Función auxiliar para calcular el incremento sin usar números aleatorios
const calculateIncrement = (currentFavorites) => {
   
    return currentFavorites + 10; 
};
