// serie.js

export class Serie {
    constructor(id, url, name, language, generes, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.generes = generes;
        this.image = image;
    }

    // Método de instancia: convierte el objeto en un string JSON
    toJsonString() {
        return JSON.stringify(this);
    }

    // Método de clase: crea una instancia a partir de un string JSON
    static createFromJsonString(json) {
        const obj = JSON.parse(json);
        return new Serie(obj.id, obj.url, obj.name, obj.language, obj.generes, obj.image);
    }

    // Método de instancia: crea un elemento HTML para mostrar los datos
    createHtmlElement() {
        const div = document.createElement('div');
        div.classList.add('serie-card');

        const titulo = document.createElement('h3');
        titulo.textContent = this.name;

        const idioma = document.createElement('p');
        idioma.textContent = `Idioma: ${this.language}`;

        const generos = document.createElement('p');
        generos.textContent = `Géneros: ${this.generes.join(', ')}`;

        const imagen = document.createElement('img');
        imagen.src = this.image;
        imagen.alt = this.name;
        imagen.style.cursor = 'pointer';
        imagen.addEventListener('click', () => {
            window.open(this.url, '_blank');
        });

        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Guardar';
        botonGuardar.addEventListener('click', () => {
            Serie.guardarSerie(this);
        });

        div.appendChild(titulo);
        div.appendChild(idioma);
        div.appendChild(generos);
        div.appendChild(imagen);
        div.appendChild(botonGuardar);

        return div;
    }

    // Método de clase: guarda una serie en localStorage
    static guardarSerie(serie) {
        let guardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
        // Evita duplicados por id
        if (!guardadas.some(s => s.id === serie.id)) {
            guardadas.push(serie);
            localStorage.setItem('seriesGuardadas', JSON.stringify(guardadas));
        }
    }
}
