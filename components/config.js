/* eslint-disable no-unused-vars */
import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';
 
//  Con normalize se convierte la ruta en fromato standar, eliminando redundamcias o inconsistencias
const compatiblePath = (userPath) => {
  return path.normalize(userPath);
}

// Devuelve array con los nuevos archivos dentro del directorio
const getFiles = (userPath) => {
  let filesInDirectory = [];
  try {
    const stats = fs.statSync(userPath);
    //Si la ruta es un directorio, se crea una ruta completa para cada archivo
    if (stats.isDirectory()) {
      const files = fs.readdirSync(userPath);
      const fullPath = files.map((file) => path.join(userPath, file))
      fullPath.forEach((file) => {
        // se llama recursivamente a getfiles para cada archivo encontrado y se concatenan los resultados
        const subDirectory = getFiles(file);
        filesInDirectory = filesInDirectory.concat(subDirectory);
      })
      // si la ruta es un archivo y es markdown se agrega la ruta del archivo al array
    } else if (stats.isFile() && (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(path.extname(userPath)))) {
      filesInDirectory.push(userPath);
    }
    return filesInDirectory;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// determina si la ruta es absoluta o no, retorna boleano
const validateAbsolutePath = ((userPath) => {
  return path.isAbsolute(userPath);
});
 
// convierte la ruta en absoluta
const convertRelativePath = (userPath => {
  try {
    let absolutePath = path.resolve(userPath);
    absolutePath = compatiblePath(absolutePath);
    return absolutePath;
  }
  catch (err) {
    console.error('Error al convertir la ruta relativa a absoluta:', err);
  }
});

// Retorna un boleano, veridica si la ruta existe
const validateExistence = (userPath => {
  return fs.existsSync(userPath)
});

// lee un archivo, busca el formato de link, se agregan al array links como objeto. La promesa se resuelve con array de enlaces
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

// Valida la url
const validateURL = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.statusText === 'OK') {
          resolve({ status: response.status, ok: 'ok' });
        } 
      })
      .catch((error) => {
        if (error.response && error.response.statusText === 'Not Found') {
          reject({ status: error.response.status, ok: 'fail' });
        } else if (error.response && error.response.statusText) {
          reject({ status: error.response.status, ok: error.response.statusText });
        } else {
          reject({ status: 'Error desconocido al validar la URL', ok: 'Error desconocido al validar la URL' });
        }
      });
  });
};

export { validateAbsolutePath, convertRelativePath, validateExistence, getArray, validateURL, getFiles, compatiblePath };