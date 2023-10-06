#!/usr/bin/env node

/* eslint-disable no-undef */
import chalk from 'chalk';
import mdLinks from "./components/mdLinks.js";

const [,, ... args] = process.argv
const userPath = args[0];
const putValidate = args.includes('--validate');
const putStats = args.includes('--stats');

if (!userPath) {
    console.error('Ingrese una ruta válida');
    process.exit(1); // Salir del programa con código de error
  }

if (putValidate && putStats) {
    mdLinks(userPath, true)
    .then((links) => {
      const linksValidated = links.filter(link => link.ok === 'ok');
      const linksBroken = links.filter(link => link.ok === 'fail');      const oneLink = new Set(links.map(link => link.href)); 
/*       const linkRepeated = links.filter((link, index) => {
        return links.findIndex((l) => l.href === link.href) !== index;
      }); */
      console.log(chalk.magentaBright('Cantidad de links:', links.length)); 
      console.log(chalk.blueBright('Links válidos:', linksValidated.length)); 
      console.log(chalk.cyanBright('Links rotos:', linksBroken.length));
      console.log(chalk.greenBright('Links únicos:', oneLink.size)); 
      console.log(chalk.yellowBright('Cantidad de links repetidos: ', links.length-oneLink.size)); 
/*       console.log(chalk.redBright('Links repetidos: '), linkRepeated)
 */        
      })
    .catch((error) => {
      console.error(error);
    });

} else if (putValidate) {
    mdLinks(userPath, true)
  .then((links) => {
    links.forEach(link => {
        const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
        console.log(chalk.magentaBright('file: ', userPath))
        console.log(chalk.blueBright('href: ',link.href))
        console.log(chalk.cyanBright('text: ', truncatedText))
        console.log(chalk.greenBright('status: ', link.status))
        console.log(chalk.yellowBright('ok: ', link.ok))
        console.log(' ');
    })
   
  })
  .catch((error) => {
    console.error(error);
  });
} else if (putStats) {
  mdLinks(userPath, false)
  .then((links) => {
      const oneLink = new Set(links.map(link => link.href)); 
    /*   const linkRepeated = links.filter((link, index) => {
        return links.findIndex((l) => l.href === link.href) !== index;
      }); */
      console.log(chalk.cyan('Cantidad de links:', links.length));
      console.log(chalk.blueBright('Links únicos:', oneLink.size));
      console.log(chalk.magentaBright('Cantidad de links repetidos: ', links.length-oneLink.size))
   //   console.log(chalk.redBright('Links repetidos: '), linkRepeated)
    })
  .catch((error) => {
    console.error(error);
  });

} else {
    mdLinks(userPath)
    .then((links) => {
      links.forEach(link => {

          const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
          console.log(chalk.magentaBright('file: ', userPath))
          console.log(chalk.blueBright('href: ', link.href))
          console.log(chalk.greenBright('text: ', truncatedText));
          console.log(' ');
          
      });
  })
  .catch((error) => {
      console.error(error);
    }); 
}
