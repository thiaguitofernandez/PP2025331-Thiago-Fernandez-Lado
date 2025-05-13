import { Serie } from './serie.js';

        const contenedor = document.getElementById('series');
        let series = [];

        function cargarSeriesGuardadas() {
            const guardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
            series = guardadas.map(s => new Serie(s.id, s.url, s.name, s.language, s.generes, s.image));
            mostrarSeries(series);
        }

        function mostrarSeries(lista) {
            contenedor.innerHTML = '';
            lista.forEach(serie => {
                contenedor.appendChild(serie.createHtmlElement());
            });
        }

        document.getElementById('ordenarNombre').addEventListener('click', () => {
            const ordenadas = [...series].sort((a, b) => a.name.localeCompare(b.name));
            mostrarSeries(ordenadas);
        });

        document.getElementById('ordenarIdioma').addEventListener('click', () => {
            const ordenadas = [...series].sort((a, b) => a.language.localeCompare(b.language));
            mostrarSeries(ordenadas);
        });

        cargarSeriesGuardadas();