// Calcular la puntuación final de un producto basado en criterios económicos, ambientales y sociales

// Función para calcular la puntuación económica
function calculateEconomicScore(product, budget) {
    const price = product.price;
    const economicScore = 100 - (price / budget) * 100;
    return Math.max(0, Math.min(100, economicScore));
}

// Función para calcular la puntuación ambiental
function calculateEnvironmentalScore(product) {
    const environmentalImpact = product.carbonImpact; 
    const environmentalScore = 100 - environmentalImpact;
    return Math.max(0, Math.min(100, environmentalScore)); 
}

// Función para calcular la puntuación social
function calculateSocialScore(product) {
    const socialImpact = product.socialImpact; 
    const socialScore = socialImpact;
    return Math.max(0, Math.min(100, socialScore)); 
}

// Función para calcular la puntuación final ponderada
function calculateFinalScore(product, budget) {
    const weights = {
        economic: 0.4,
        environmental: 0.3,
        social: 0.3
    };
    // Asegurar que los pesos sumen 1
    const totalWeight = weights.economic + weights.environmental + weights.social;
    if (totalWeight !== 1) {
        throw new Error('Los pesos deben sumar 1');
    }
    const economicScore = calculateEconomicScore(product, budget);
    const environmentalScore = calculateEnvironmentalScore(product);
    const socialScore = calculateSocialScore(product);


    // Calcular la puntuación final ponderada
    const finalScore = (economicScore * weights.economic) + (environmentalScore * weights.environmental) + (socialScore * weights.social);
    console.log(finalScore);
    if (isNaN(finalScore)) {
        throw new Error('La puntuación final no es un número válido');
    }
    return finalScore;
}

export {
    calculateFinalScore
};