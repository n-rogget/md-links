/* eslint-disable no-undef */
import mdLinks from '../components/mdLinks';
import path from 'path';

describe('mdLinks', () => {
  test('debería retornar un array de objetos con los enlaces encontrados en un archivo Markdown', () => {
    const userPath = path.join('C:/Users/nicol/Desktop/trabajo/md-links/files/xmilestone.md'); 
    return mdLinks(userPath, false)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true); 
        expect(links.length).toBeGreaterThan(0); 
      });
  });

  test('debería manejar la validación de enlaces', () => {
    const userPath = path.join('C:/Users/nicol/Desktop/trabajo/md-links/files/xmilestone.md'); 
    return mdLinks(userPath, true)
      .then((links) => {
expect(links.length).toBe(2)    
});
  });

  test('debería manejar errores cuando se proporciona una ruta incorrecta', () => {
    const userPath = 'ruta/incorrecta'; 
    return mdLinks(userPath, false)
      .catch((error) => {
        expect(error).toBe('La ruta no existe'); 
      });
  });
});
