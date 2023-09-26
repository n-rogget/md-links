import mdLinks from "./components/mdLinks.js";

let userPath = './docs/README-Nicole.md'

mdLinks(userPath)
.then((links) => {
  console.log(links);
})
.catch((error) => {
  console.error(error)
})