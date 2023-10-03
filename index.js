import mdLinks from "./components/mdLinks.js";

let userPath = 'C:/Users/nicol/Desktop/trabajo/md-links/files'

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