// main.js
import { Serie } from './serie.js';

let paginaActual = 1;
const seriesPorPagina = 6;
const contenedor = document.getElementById('series');

document.addEventListener('DOMContentLoaded', () => {
    cargarSeries(paginaActual);

    document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
    document.getElementById('anterior').addEventListener('click', paginaAnterior);
});

function cargarSeries(pagina) {
    contenedor.innerHTML = '';
    const promesas = [];

    const inicio = (pagina - 1) * seriesPorPagina + 1;

    for (let i = inicio; i < inicio + seriesPorPagina; i++) {
        const url = `https://api.tvmaze.com/shows/${i}`;
        promesas.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promesas)
        .then(data => {
            data.forEach(serieData => {
                const serie = new Serie(
                    serieData.id,
                    serieData.officialSite || serieData.url,
                    serieData.name,
                    serieData.language,
                    serieData.genres,
                    serieData.image?.medium || 'https://via.placeholder.com/210x295?text=Sin+imagen'
                );

                const elemento = serie.createHtmlElement();
                contenedor.appendChild(elemento);
            });
        })
        .catch(error => {
            console.error('Error al cargar series:', error);
        });
}

function paginaSiguiente() {
    paginaActual++;
    cargarSeries(paginaActual);
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarSeries(paginaActual);
    }
}
