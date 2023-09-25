import mdLinks from "./components/mdLinks.js";

let userPath = './'

mdLinks(userPath)
.then((links) => {
  console.log(links);
})
.catch((error) => {
  console.error(error)
})