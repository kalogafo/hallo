document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const totalCostDisplay = document.getElementById('totalCost');
    const downloadBtn = document.getElementById('downloadBtn');
    const audio = document.getElementById('halloweenMusic');

    // --- 1. Lógica de la Calculadora de Gastos ---
    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        // Obtener valores del formulario (se asume que los inputs son en la moneda local, ej. pesos)
        // Usamos Number() para asegurar que los valores sean tratados como números
        const costGame = Number(document.getElementById('game').value) || 0;
        const costCelebrity = Number(document.getElementById('celebrity').value) || 0;
        const costFoodPerPerson = Number(document.getElementById('food').value) || 0;
        const costDrinksPerBottle = Number(document.getElementById('drinks').value) || 0;
        const numGuests = Number(document.getElementById('guests').value) || 1;

        // Suponemos que necesitas 1 botella de trago por cada 5 invitados para simplificar.
        const numBottles = Math.ceil(numGuests / 5);

        // Cálculo del costo total
        const totalFoodCost = costFoodPerPerson * numGuests;
        const totalDrinksCost = costDrinksPerBottle * numBottles;
        const totalCost = costGame + costCelebrity + totalFoodCost + totalDrinksCost;

        // Formatear el resultado a la moneda local para una mejor visualización (ej. pesos colombianos)
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP', // Puedes cambiar 'COP' a tu moneda local (USD, MXN, etc.)
            minimumFractionDigits: 0,
        });

        // Mostrar el resultado
        totalCostDisplay.textContent = formatter.format(totalCost);
        alert(`¡El presupuesto estimado para tu fiesta es de ${formatter.format(totalCost)}! 💸`);
    });

    // --- 2. Funcionalidad del Botón de Descarga ---
    downloadBtn.addEventListener('click', () => {
        // Simulación de descarga de un archivo (la imagen debe existir en el mismo dominio o ser un Blob/Data URL)
        // Usamos una Data URL simple para simular una imagen fantasma.

        const simulatedImageURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='; // Pixel negro simple

        const link = document.createElement('a');
        link.href = simulatedImageURL;
        link.download = 'Mi-Foto-Halloween-Boto.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Descargando foto... ¡Esperamos ver ese disfraz!");
    });

    // --- 3. Lógica para el Audio de Fondo (Solución para Autoplay) ---
    // Los navegadores modernos bloquean el 'autoplay'.
    // Esta función intenta reproducir el audio cuando el usuario interactúa por primera vez con la página.
    function enableAudio() {
        if (audio.paused) {
            audio.play().catch(error => {
                // console.log("El navegador sigue bloqueando el autoplay. Necesita más interacción.", error);
            });
        }
    }

    // Escucha el primer clic o toque del usuario para iniciar la música
    document.body.addEventListener('click', enableAudio, { once: true });
    document.body.addEventListener('touchstart', enableAudio, { once: true });
});