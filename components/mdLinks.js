/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, extensionMd, getArray, validateURL, getFiles, compatiblePath } from "./config.js"


const mdLinks = (userPath, validate) =>
  new Promise((resolve, reject) => {
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    let absolutePath = compatiblePath(validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath));
    console.log(absolutePath);
    // si absolutePath es verdadero
    console.log('La ruta es absoluta')
    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe')
    }
    const filesArray = getFiles(absolutePath, '.md');
    console.log(filesArray)
    const allLinks = [];
                
    const processFile = (file) => {
      return getArray(file)
        .then((links) => {
          if (validate) {
            // se crea array de promesas con map
            const promises = links.map((link) => {
              /* console.log(validateURL(link.href)) */
              return validateURL(link.href)
                .then((status) => {
                  link.status = status.status;
                  link.ok = status.ok;
                  return link
                })
                .catch((error) => {
                  link.status = error.status
                  link.ok = error.ok
                  return link
                })
            })
            // Se devuelve la promesa cuando todas las promesas del array se cumplieron
            return Promise.all(promises);
          } else {
            return links;
          }
        })
        .then((processedLinks) => {
          //... se pasa cada elemento del array como argumento individual, se resuelven por separado
          allLinks.push(...processedLinks)
        });
    };
    // con map creo el array de promesas en filesArray
    const filePromises = filesArray.map(processFile);
    // Espero que todas las promesas se resuelvan o rechacen
    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error)
      })
 
  });

export default mdLinks;
