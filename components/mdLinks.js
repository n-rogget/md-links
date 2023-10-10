/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, getArray, validateURL, getFiles, compatiblePath } from "./config.js"

// busca enlaces dentro de archivos markdown
const mdLinks = (userPath, validate) => {
  return new Promise((resolve, reject) => {
    const absolutePath = compatiblePath(validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath));
    // si la ruta no existe da mensaje de error
    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe')
      return
    }
    const allLinks = [];
    // procesa el archivo
    const processFile = (file) => {
      // El resultado de getArray (array de enlaces) se usa en la promesa .then
      return getArray(file)
        .then((links) => {
          // si es valido, se crea un array de promesas en el array de enlaces
          if (validate) {
            const promises = links.map((link) => {
              // cada promesa se crea al llamar a validateURL
              return validateURL(link.href)
                .then((status) => {
                  link.status = status.status;
                  link.ok = 'ok';
                  return link
                })
                .catch((error) => {
                  link.status = error.status
                  link.ok = 'fail'
                  return link
                })
            })
            // devuelve promesa que se resuelve con array de promesas si validate es true
            return Promise.all(promises);
          } else {
            return links;
          }
        })
        // Los enlaces procesados se agrefan a allLinks
        .then((processedLinks) => {
          allLinks.push(...processedLinks)
          return allLinks
        });
    };
    const filesArray = getFiles(absolutePath);
    const filePromises = filesArray.map(processFile)
    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
        console.log(absolutePath)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default mdLinks;

