/* eslint-disable no-unused-vars */
import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';

const compatiblePath = (userPath) => {
  return path.normalize(userPath);
}
const getFiles = (userPath) => {
  let filesInDirectory = [];
  try {
/*     const normalPath = compatiblePath(path); */
    const stats = fs.statSync(userPath);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(userPath);
      const fullPath = files.map((file) => path.join(userPath, file))

      fullPath.forEach((file) => {
        const subDirectory = getFiles(file);
        // console.log(subDirectory)
        filesInDirectory.push(...subDirectory);

      })
    
   }  else if (stats.isFile() && (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(path.extname(userPath)))) {
    filesInDirectory.push(userPath);
  }

    return filesInDirectory; 
  
  } catch (error) {
    console.error('Error:', error);
   throw error; 
  }
};

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
  absolutePath = compatiblePath(absolutePath);
  return absolutePath;
});

// Verificar si la ruta existe en el sistema de archivos
const validateExistence = (userPath => {
  // Retorna un booleando, indicando si existe o no la ruta
  // fs.existSync es una función que verifica si el archivo o directorio existe en el 
  return fs.existsSync(userPath)
});
/* 
// filtrar los archivos con extensión md
const extensionMd = (userPath => {

  // retorna la extension del archivo
  return path.extname(userPath);
}); */

const getArray = (userPath) => {
  return new Promise((resolve, reject) => {
    const links = [];
    const fileRelativePath = path.basename(userPath);

    fs.readFile(userPath, 'utf-8', (err, text) => {
      if (err) {
        reject('Error al leer el archivo: ' + err);
      }

      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g; // Expresión regular original
      let match;

      while ((match = regex.exec(text))) {
        const [, text, hrefWithExtension] = match;

        const linkObject = { href: hrefWithExtension, text, file: fileRelativePath };
        links.push(linkObject);
      }

      resolve(links);
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
          resolve({status: response.status, ok: 'ok'});
        } /* else {
          reject(response.status);
        } */
      })
      .catch((error) => {
        //si existe una respuesta de error y si tiene un estado de texto.
        if (error.response && error.response.statusText === 'Not Found') {
          reject({ status: error.response.status, ok: 'fail' });
          // Si existe un error en la solicitud y no se pudo establecer una conexión con la URL, se rechaza la promesa con el valor 0. 
        } else if (error.response && error.response.statusText) {
          reject({status: error.response.status, ok: error.response.statusText});
          //Si el error no está relacionado con la solicitud o es desconocido, se rechaza la promesa con el valor 500.
        } else {
          reject({ status: 'Error desconocido al validar la URL', ok: 'Error desconocido al validar la URL'});
        }
      });
  });
};

export { validateAbsolutePath, convertRelativePath, validateExistence, getArray, validateURL, getFiles, compatiblePath };