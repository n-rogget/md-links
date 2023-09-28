import { validateAbsolutePath, validateExistence, convertRelativePath, extensionMd, getArray, validateURL, validateURLStatusText } from "./config.js"

const mdLinks = (userPath, validate) =>
  new Promise((resolve, reject) => {
    console.log(userPath)
    console.log(validate)
    //  se asigna con el valor de userPath si la función validateAbsolutePath(userPath) retorna verdadero, 
    // de lo contrario se asigna el valor retornado por la función convertRelativePath(userPath).
    let absolutePath = validateAbsolutePath(userPath) ? userPath : convertRelativePath(userPath);
    // si absolutePath es verdadero
    validateAbsolutePath(absolutePath)
    console.log(absolutePath)
    console.log('La ruta es absoluta')
    if (validateExistence(absolutePath)) {
      // console.log(absolutePath)
      console.log('La ruta si existe')
      // si la extension del archivo coincide con alguna de esas, se llama a getarray
      if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extensionMd(absolutePath))) {
        getArray(absolutePath)
          .then((links) => {
            // Si validate es verdadera
            if (validate) {
              // se crea array de promesas con map-
              const promises = links.map((link) => {
                return validateURL(link.href)
                  .then((status) => {
                    link.status = status;
                    return link
                  })
                  .catch((error) => {
                    link.status = error
                    return link
                  })
                  .then(() => {
                    return validateURLStatusText(link.href)
                        .then((status) => {
                            link.ok = status
                            return link
                        })
                        .catch((error) => {
                            link.error = error
                            return link
                        })
                        .then(() => {
                            return link; // Devuelve el objeto link para la siguiente cadena de promesas
                        });
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

export default mdLinks;