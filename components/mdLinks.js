/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, getArray, validateURL, getFiles, compatiblePath } from "./config.js"


const mdLinks = (userPath, validate) => {
  return new Promise((resolve, reject) => {
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    const absolutePath = compatiblePath(validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath));
    // console.log(absolutePath);
    // si absolutePath es verdadero
    console.log('La ruta es absoluta')

    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe')
      return
    }
    // obtiene un array de arhivos con extension md en absolutePath
    
    
    // console.log(filesArray)
    
    const allLinks = [];
   // procesa archivo, devuelve promesa que resuelve un arry
    const processFile = (file) => {
      // devuelve promesa que resulve un array de objetos
    // console.log(getArray(file)) 
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

   // para cada archivo me devuelve un nuevo arra con las promesas devueltas de process file
   // Me crea un nuevo array, con lo que se indica en processFile
const filesArray = getFiles(absolutePath, '.md');
   const filePromises = filesArray.map(processFile)
   
    // Espero que todas las promesas se resuelvan o rechacen

    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error);
      });
 
  });
}

export default mdLinks;

