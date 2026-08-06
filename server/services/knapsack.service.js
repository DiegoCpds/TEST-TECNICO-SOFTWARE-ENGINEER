import { calculateFinalScore } from "./scoring.service.js";

function knapsackService(items, budget) {
    const n = items.length;
    const weight = items.map(item => item.price);
    const value = items.map(item => calculateFinalScore(item, budget));
    const capacity = budget;

    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= capacity; j++) {
            if (weight[i - 1] <= j) {
                dp[i][j] = Math.max(
                    value[i - 1] + dp[i - 1][j - weight[i - 1]],
                    dp[i - 1][j]
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // El puntaje máximo total
    const puntajeMaximo = dp[n][capacity];
    console.log(`n: ${n}, capacity: ${capacity}`);
    console.log(`Puntaje máximo total: ${puntajeMaximo}`);
    // console.log('Matriz DP:');
    // console.table(dp);

    // 2. RASTREO HACIA ATRÁS (Backtracking) para encontrar los objetos
    const articulosElegidos = [];
    let presupuestoRestante = capacity;

    for (let i = n; i > 0; i--) {
        // Si el valor actual en la matriz es diferente al valor de la fila superior,
        // significa que el artículo 'i-1' FUE INCLUIDO para lograr este puntaje.
        if (dp[i][presupuestoRestante] !== dp[i - 1][presupuestoRestante]) {
            articulosElegidos.push(items[i - 1]); // Guardamos el articulo elegido
            presupuestoRestante -= items[i - 1].price; // Restamos su costo
        }
    }

    return {
        puntajeTotal: puntajeMaximo,
        objetos: articulosElegidos.reverse() // Invertimos para que queden en orden original
    };
}

export default knapsackService;