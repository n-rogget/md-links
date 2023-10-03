/* eslint-disable no-undef */

import mdLinks from "../components/mdLinks";
import { validateExistence, extensionMd } from "../components/config";

jest.mock('../components/config')


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
  /*   test('Debería crear promesas para validar los enlaces cuando la extensión es válida', async () => {
      const userPath = '/ruta/a/archivo.md'; 
      validateExistence.mockReturnValue(true);
      extensionMd.mockReturnValue('.md'); 
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
    }); */
    test("Ruta existente debe retornar true", () => {
      const userPath = 'files/01-milestone.md'
      expect(validateExistence(userPath)).toBe(true);
    });
    test('Deberia rechaza con un error cuando la ruta no existe', () => {
      return mdLinks('nonexistent/path', false).catch((error) => {
        // Expectations for when it rejects due to a non-existent path
        expect(error).toBe('La ruta no existe');
        // Add more expectations as needed
      });
    });
    it("debería devolver un array de enlaces", () => {
      return mdLinks("ruta/a/tu/archivo.md", false).then((links) => {
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
      });
    });
});