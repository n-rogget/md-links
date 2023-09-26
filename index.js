import mdLinks from "./components/mdLinks.js";

let userPath = 'docs/04-milestone.md'

mdLinks(userPath)
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