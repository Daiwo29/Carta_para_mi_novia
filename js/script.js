(function () {
    var env = document.getElementById('env');
    var reader = document.getElementById('reader');
    var estado = 'cerrado';

    // Si una foto no existe, se oculta en vez de mostrar un icono roto
    document.querySelectorAll('.ph img').forEach(function (img) {
        function ocultar() { img.parentNode.style.display = 'none'; }
        img.addEventListener('error', ocultar);
        if (img.complete && img.naturalWidth === 0) ocultar();
    });

    function abrir() {
        if (estado !== 'cerrado') return;
        estado = 'abriendo';
        env.classList.add('open');                       // se abre la solapa y sube la hoja
        setTimeout(function () {
            document.body.classList.add('reading');        // aparece la carta
            reader.setAttribute('aria-hidden', 'false');
            estado = 'leyendo';
        }, 1250);
    }

    function cerrar() {
        if (estado !== 'leyendo') return;
        estado = 'cerrando';
        document.body.classList.remove('reading');       // baja la carta
        reader.setAttribute('aria-hidden', 'true');
        setTimeout(function () {
            env.classList.remove('open');                  // se cierra el sobre
            estado = 'cerrado';
        }, 900);
    }

    env.addEventListener('click', abrir);
    document.getElementById('close').addEventListener('click', cerrar);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
})();