import mdLinks from "./components/mdLinks.js";

let userPath = 'files'

mdLinks(userPath, false)
  .then((links) => {
    if (links.length === 0) {
      console.log('No hay links');
    } else {
      console.log(links);
    }
  })
  .catch((error) => {
    console.error(error);
  });