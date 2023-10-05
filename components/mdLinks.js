/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, getArray, validateURL, getFiles, compatiblePath } from "./config.js"


const mdLinks = (userPath, validate) => {
 console.log({ userPath })
  return new Promise((resolve, reject) => {
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    console.log( 1, userPath)
    const absolutePath = compatiblePath(validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath));
   // console.log("convertRelativePath", convertRelativePath(userPath));
    // si absolutePath es verdadero
    //console.log('La ruta es absoluta')

    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe')
      return
    }

    // console.log(filesArray)

    const allLinks = [];
    // procesa archivo, devuelve promesa que resuelve un array
    const processFile = (file) => {
      // devuelve promesa que resulve un array de objetos
      return getArray(file)
        .then((links) => {
          if (validate) {
            // se crea array de promesas con map, 
            // Cada elemento del array se pasa como argumento a la función
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
          return allLinks
        });
    };
    // obtener lista de archivos del directorio, devuelve array con los nombre de los archivos
    console.log({ absolutePath })
    const filesArray = getFiles(absolutePath);
   // console.log({ filesArray })
    // aplicar processFile a cada elemento de filesArray
    const filePromises = filesArray.map(processFile)
   // console.log({ filePromises })
    // Espero que todas las promesas se resuelvan o rechacen

    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
        // console.log(filesArray)
        // console.log(filePromises)
      })
      .catch((error) => {
        reject(error);
      });

  });
}

export default mdLinks;

