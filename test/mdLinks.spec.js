/* eslint-disable no-undef */

/* import mdLinks from "../components/mdLinks";
// import { validateExistence,  } from "../components/config";
import path from "path"; */

/* jest.mock('../components/config')


describe('mdLinks', () => {


  test('Debería rechazar con un mensaje de error cuando validateExistence devuelve falso', async () => {
    const userPath = '/ruta/a/archivo.md';
    validateExistence.mockReturnValue(false);

    try {
      await mdLinks(userPath, true);
    } catch (error) {
      expect(error).toBe('La ruta no existe')
    }
  });

/*    test('Debería rechazar con un mensaje de error cuando la extensión no coincide', async () => {
    const userPath = '/ruta/a/archivo.txt';
    validateExistence.mockReturnValue(true);
    extensionMd.mockReturnValue('.txt');

    try {
      await mdLinks(userPath, true);
    } catch (error) {
      expect(error).toBe('El archivo no es markdown')
    }
  });  */
/*   test('Debería crear promesas para validar los enlaces cuando la extensión es válida', async () => {
      const userPath = '/ruta/a/archivo.md'; 
      validateExistence.mockReturnValue(true);
      // extensionMd.mockReturnValue('.md'); 
      const links = [
        { href: 'http://example.com', text: 'Ejemplo', file: '/ruta/a/archivo.md' },
        { href: 'http://example.org', text: 'Ejemplo2', file: '/ruta/a/archivo.md' },
      ];
      getArray.mockResolvedValue(links);
  
      validateURL.mockResolvedValue(200);
  
      const result = await mdLinks(userPath, true);

      result.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('text');
        expect(link).toHaveProperty('file');
  
      });
      validateURL.mockRestore();
    });  */
/*     test("Ruta existente debe retornar true", () => {
      const userPath = 'C:/Users/nicol/Desktop/trabajo/md-links/files'
      expect(validateExistence(userPath)).toBe(true);
    }); */

  /*   test('Deberia rechaza con un error cuando la ruta no existe', () => {
      return mdLinks('nonexistent/path', false).catch((error) => {
        // Expectations for when it rejects due to a non-existent path
        expect(error).toBe('La ruta no existe');
        // Add more expectations as needed
      });
    }); */
/* 
    test("debería devolver un array de enlaces", () => {
      return mdLinks("C:/Users/nicol/Desktop/trabajo/md-links/files", false).then((links) => {
        //expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
      });
    }); */
/*     test('Debería arrojar error cuando la ruta no existe', async () => {
      const userPath = 'files/hola.js';
      try {
        const links = await mdLinks(userPath, false);
        // Debería lanzar un error, por lo que no deberías llegar a este punto.
        // expect(links).toBe(false);
      } catch (error) {
        // Asegúrate de que el error tenga el mensaje adecuado
        expect(error).toBe('La ruta no existe');
      }
    }); */
/* }); */

import mdLinks from '../components/mdLinks';
import path from 'path';

describe('mdLinks', () => {
  test('debería retornar un array de objetos con los enlaces encontrados en un archivo Markdown', () => {
    const userPath = path.join('C:/Users/nicol/Desktop/trabajo/md-links/files/xmilestone.md'); // Ruta al archivo de prueba
    return mdLinks(userPath, false)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true); // Debe ser un array
        expect(links.length).toBeGreaterThan(0); // Debe contener al menos un enlace
        // Aquí puedes agregar más expectativas específicas para tus enlaces
      });
  });

  test('debería manejar la validación de enlaces', () => {
    const userPath = path.join('C:/Users/nicol/Desktop/trabajo/md-links/files/xmilestone.md'); // Ruta al archivo de prueba
    return mdLinks(userPath, true)
      .then((links) => {
expect(links.length).toBe(1)    
});
  });

  test('debería manejar errores cuando se proporciona una ruta incorrecta', () => {
    const userPath = 'ruta/incorrecta'; // Ruta incorrecta
    return mdLinks(userPath, false)
      .catch((error) => {
        expect(error).toBe('La ruta no existe'); // Espera un mensaje de error específico
      });
  });
});
