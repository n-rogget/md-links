/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, extensionMd, getArray, validateURL, getFiles, compatiblePath } from "./config.js"


const mdLinks = (userPath, validate) =>
  new Promise((resolve, reject) => {
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    /*  let absolutePath = validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath); */
    let absolutePath = compatiblePath(validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath));
    console.log(absolutePath);
    // si absolutePath es verdadero
    /* validateAbsolutePath(absolutePath) */
    console.log('La ruta es absoluta')
    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe')
    }
    const filesArray = getFiles(absolutePath, '.md');
    const allLinks = [];
    /*  if (Array.isArray(absolutePath)) {
       const filePath = absolutePath.map((file) => {
         let newPath = validateAbsolutePath(file) ? userPath : convertRelativePath(file);
         if (validateExistence(newPath)) {
           // console.log(absolutePath)
           console.log('La ruta si existe')
           // si la extension del archivo coincide con alguna de esas, se llama a getarray
           if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extensionMd(newPath))) {
             getArray(newPath)
               .then((links) => {
                 if (links.length === 0){
                   console.log ('No hay links')
                 }
                 // Si validate es verdadera */
    const processFile = (file) => {
      return getArray(file)
        .then((links) => {
          if (validate) {
            // se crea array de promesas con map-
            const promises = links.map((link) => {
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
            return Promise.all(promises);
          } else {
            return links;
          }
        })
        .then((processedLinks) => {
          allLinks.push(...processedLinks)
        });
    };
    const filePromises = filesArray.map(processFile);
    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error)
      })
 
  });

export default mdLinks;
