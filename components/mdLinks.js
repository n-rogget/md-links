/* eslint-disable no-unused-vars */
import { validateAbsolutePath, validateExistence, convertRelativePath, extensionMd, getArray, validateURL, getFiles } from "./config.js"

const mdLinks = (userPath, validate) =>
  new Promise((resolve, reject) => {
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    /*  let absolutePath = validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath); */
    let absolutePath = getFiles(userPath, '.md');
    console.log(absolutePath);
    // si absolutePath es verdadero
    /* validateAbsolutePath(absolutePath) */
    console.log('La ruta es absoluta')
    if (Array.isArray(absolutePath)) {
      const filePath = absolutePath.map((file) => {
        let newPath = validateAbsolutePath(file) ? userPath : convertRelativePath(file);
        if (validateExistence(newPath)) {
          // console.log(absolutePath)
          console.log('La ruta si existe')
          // si la extension del archivo coincide con alguna de esas, se llama a getarray
          if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extensionMd(newPath))) {
            getArray(newPath)
              .then((links) => {
                // Si validate es verdadera
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

                  });
                  Promise.all(promises)
                    .then((validatedLinks) => {
                      resolve(validatedLinks);
                    })
                    .catch((error) => {
                      reject(error)
                    })
                } else {
                  resolve(getArray(absolutePath))
                }
              })
            /*      .catch((error)) */
            /*   resolve(getArray(userPath)) */
          } else {
            reject('El archivo no es markdown')
          }
        } else {
          reject('La ruta no existe');
        }
      });
    }
  });

export default mdLinks;