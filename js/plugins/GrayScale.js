//=============================================================================
// GrayScale.js
//=============================================================================
// PLUGIN PARA RPG MAKER MV
// Aplica un filtro de blanco y negro a todo el juego.
// Creado para uso personal - Free to use
//=============================================================================

/*:
 * @plugindesc Aplica un efecto de Blanco y Negro a todo el juego.
 * @author TuNombre
 *
 * @param Intensidad
 * @desc Nivel de blanco y negro. 100 = completamente en B&N, 0 = color normal.
 * @default 100
 *
 * @help
 * ============================================================
 * PLUGIN: GrayScale
 * ============================================================
 * Este plugin aplica un filtro de blanco y negro a toda la
 * pantalla del juego de forma automática al iniciar.
 *
 * Podés cambiar la intensidad en los parámetros del plugin:
 *   100 = Blanco y negro total
 *   50  = Semisaturado
 *   0   = Color normal
 *
 * No requiere configuración adicional. Solo activarlo y listo.
 * ============================================================
 */

(function() {

    // Leemos el parámetro de intensidad definido arriba
    var parameters = PluginManager.parameters('GrayScale');
    var intensidad = Number(parameters['Intensidad'] || 100);

    // Nos aseguramos de que esté entre 0 y 100
    intensidad = intensidad.toString() + '%';

    // Aplicamos el filtro CSS al canvas principal del juego
    // Esto afecta TODO: mapas, menús, batallas, etc.
    function aplicarFiltro() {
        var canvas = document.getElementById('GameCanvas');
        if (canvas) {
            canvas.style.filter = 'grayscale(' + intensidad + ')';
            canvas.style.webkitFilter = 'grayscale(' + intensidad + ')'; // compatibilidad
        }
    }

    // Enganchamos la función al momento en que el juego termina de cargar
    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        _SceneManager_initialize.call(this);
        aplicarFiltro();
    };

    // También lo aplicamos al actualizar la escena, por si acaso
    var _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.call(this, sceneClass);
        // Pequeño delay para asegurarnos que el canvas ya existe
        setTimeout(aplicarFiltro, 100);
    };

})();
