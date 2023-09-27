import { validateAbsolutePath, validateExistence, convertRelativePath, extensionMd, getArray } from "./config.js"

const mdLinks = (userPath) =>
  new Promise((resolve, reject) => {
    console.log(userPath)
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
          resolve(getArray(absolutePath))
        } else {
          reject('El archivo no es markdown')
        }
      } else {
        reject('La ruta no existe');
      }
  });




export default mdLinks;