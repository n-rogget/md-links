/* eslint-disable no-undef */

import mdLinks from "../components/mdLinks";
import { validateExistence, extensionMd, getArray, validateURL } from "../components/config";

jest.mock('../components/config')

describe('mdLinks', () => {
  test('Debería resolver sin validar enlaces cuando validate es falso', async () => {
    const userPath = '/ruta/a/archivo.md';
    validateExistence.mockReturnValue(true);
    extensionMd.mockReturnValue('.md');
    getArray.mockResolvedValue([
      { href: 'http://example.com', text: 'Ejemplo', file: '/ruta/a/archivo.md' },
    ]);

    const result = await mdLinks(userPath, false);
    expect(result).not.toHaveProperty('ok')
    result.forEach(link => {
      expect(link).not.toHaveProperty('ok');
    });

  });

  test('Debería rechazar con un mensaje de error cuando validateExistence devuelve falso', async () => {
    const userPath = '/ruta/a/archivo.md';
    validateExistence.mockReturnValue(false);

    try {
      await mdLinks(userPath, true);
    } catch (error) {
      expect(error).toBe('La ruta no existe')
    }
  });

  test('Debería rechazar con un mensaje de error cuando la extensión no coincide', async () => {
    const userPath = '/ruta/a/archivo.txt';
    validateExistence.mockReturnValue(true);
    extensionMd.mockReturnValue('.txt');

    try {
      await mdLinks(userPath, true);
    } catch (error) {
      expect(error).toBe('El archivo no es markdown')
    }
  });
    test('Debería crear promesas para validar los enlaces cuando la extensión es válida', async () => {
      const userPath = '/ruta/a/archivo.md'; // Ejemplo de un archivo con extensión .md
      validateExistence.mockReturnValue(true);
      extensionMd.mockReturnValue('.md'); // Simula una extensión válida
      const links = [
        { href: 'http://example.com', text: 'Ejemplo', file: '/ruta/a/archivo.md' },
        { href: 'http://example.org', text: 'Ejemplo2', file: '/ruta/a/archivo.md' },
      ];
      getArray.mockResolvedValue(links);
  
      // Espía la función validateURL para simular respuestas exitosas
      validateURL.mockResolvedValue(200);
  
      const result = await mdLinks(userPath, true);
  
      // Verifica que el resultado contenga las propiedades adecuadas después de la validación.
      result.forEach(link => {
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('text');
        expect(link).toHaveProperty('file');
        expect(link).toHaveProperty('status', 200);
      });
  
      // Limpia los espías después de la prueba.
      validateURL.mockRestore();
    });

});








