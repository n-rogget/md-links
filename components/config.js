import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';


// Verificar si la ruta es absoluta. Retorna un boleano
const validateAbsolutePath = ((userPath) => {
  return path.isAbsolute(userPath);
});
// Convertir a una ruta relativa a absoluta
// en este caso userPath es una ruta relativa
const convertRelativePath = (userPath => {
  // resolve para convertir de relativa a absoluta
  let absolutePath = path.resolve(userPath);
  // replace para reemplaza barras barras inversas por diagonales
  absolutePath = absolutePath.replace(/\\/g, '/');
  return absolutePath;
});

// Verificar si la ruta existe en el sistema de archivos
const validateExistence = (userPath => {
  // Retorna un booleando, indicando si existe o no la ruta
  // fs.existSync es una función que verifica si el archivo o directorio existe en el 
  return fs.existsSync(userPath)
});

// filtrar los archivos con extensión md
const extensionMd = (userPath => {
  // retorna la extension del archivo
  return path.extname(userPath);
});

const getArray = (userPath) => {
  return new Promise((resolve, reject) => {
    // lee el contenido del archivo en la ruta especificada. Se codifica el contenido del archivo como texto
    fs.readFile(userPath, 'utf-8', (err, text) => {
  /*  if (err) {
        reject('Error al leer el archivo: ' + err);
      } */
      // Buscamos y extraemos enlaces markdown de un texto. La exp regular coincide con cualquier cadena que tenga el formato 
      // [texto](url). g indica que la busqueda
      // es global y no se detiene tras encontrar la primera coincidencia
      const regex = /\[(.*?)\]\((https?:\/\/.*?)\)/g
      const links = [];
      let match;
      // En cada iteración del bucle se asignan los valores (coincidencias de la exp reg) encontrados a las variables text, 
      // hrefWithExtension y file. Estos valores representan el texto, la URL y el nombre del archivo con extensión respectivamente
      // extraídos de la cadena que coincide con la expresión regular.
      while ((match = regex.exec(text))) {
        // eslint-disable-next-line no-unused-vars
        const [, text, hrefWithExtension, file] = match;

               // agrega un objeto al array, con las propiedades href, text y file con sus respectivos valores.
        links.push({ href: hrefWithExtension, text, file: userPath });
      } 
      // resuelve la promesa con el valor links (array de enlaces)
      resolve(links);
      reject('error al leer el archivo')
    });
  });
};
const validateURL = (url) => {
  return new Promise((resolve, reject) => {
    // se utiliza el método axios.get() para hacer una solicitud GET a la URL especificada.
    axios.get(url)
      .then((response) => {
        // Se verifica si el estado de texto de la respuesta es igual a "OK".
        if (response.statusText === 'OK') {
          // se resuelve la promesa con el estado de la respuesta.
          resolve(response.status);
        } else {
          reject(response.status);
        }
      })
      .catch((error) => {
        //si existe una respuesta de error y si tiene un estado de texto.
        if (error.response && error.response.statusText) {
          reject(error.response.status);
          // Si existe un error en la solicitud y no se pudo establecer una conexión con la URL, se rechaza la promesa con el valor 0. 
        } else if (error.request) {
          reject( 0/* 'No se pudo establecer una conexión con la URL' */ );
          //Si el error no está relacionado con la solicitud o es desconocido, se rechaza la promesa con el valor 500.
        } else {
          reject(500 /* /'Error desconocido al validar la URL' */ );
        }
      });
  });
};

const validateURLStatusText = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.statusText === 'OK') {
          resolve('ok');
        } else {
          reject('No se pudo validar la URL');
        }
      })
      .catch((error) => {
        if (error.response && error.response.statusText === 'Not Found') {
          reject('fail');
        } else {
          reject('Error al validar la URL');
        }
      });
  }); 
};

export { validateAbsolutePath, convertRelativePath, validateExistence, extensionMd, getArray, validateURL, validateURLStatusText };