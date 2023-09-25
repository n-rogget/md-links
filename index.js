import { mdLinks } from "./components/mdLinks.js";

let userPath = 'components/05-milestone.md'

mdLinks(userPath)
.then((links) => {
  console.log(links);
})
.catch((error) => {
  console.error(error)
})