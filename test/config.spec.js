/* eslint-disable no-undef */

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { validateURLStatusText, validateURL, getArray, extensionMd, validateExistence, convertRelativePath, validateAbsolutePath } from "../components/config";
/* import path from "path"; */

describe("validateURLStatusText", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Crear una instancia de axios-mock-adapter
  });

  afterEach(() => {
    mock.restore(); // Restaurar el estado original después de cada prueba
  });

  test("Debería rechazar con 'Error al validar la URL' en caso de otro error", () => {
    const url = "http://example.com";
    const response = { status: 404, statusText: "Not Found" };

    mock.onGet(url).reply(404, response);

    return validateURLStatusText(url).catch((error) => {
      expect(error).toBe("Error al validar la URL");
    });
  });
  test("Debería rechazar con 'fail' en caso de que la respuesta sea 'Not Found'", async () => {
    const url = 'http://example.com';
    axios.get.mockResolvedValue({ statusText: 'Not Found' });

    try {
      const result = await validateURLStatusText(url);
      expect(result).toBe('fail');
    } catch (error) {
      // Manejar el error si ocurre
    }
  });

});



jest.mock("axios"); // Mockea axios para evitar solicitudes reales

describe("validateURL", () => {
  test("Debería resolver con el estado en caso de respuesta exitosa (status 'OK')", async () => {
    const url = "http://example.com";
    const response = { status: 200, statusText: "OK" };

    // Simula una respuesta exitosa
    axios.get.mockResolvedValue(response);

    const result = await validateURL(url);

    expect(result).toBe(200);
  });

  test("Debería rechazar con el estado en caso de respuesta con error (distinto de 404)", async () => {
    const url = "http://example.com";
    const response = { status: 500, statusText: "Internal Server Error" };

    // Simula una respuesta con estado 500
    axios.get.mockResolvedValue(response);

    try {
      await validateURL(url);
    } catch (error) {
      expect(error).toBe(500);
    }
  });

  test("Debería rechazar con 0 en caso de error de conexión", async () => {
    const url = "http://example.com";

    // Simula un error de conexión
    axios.get.mockRejectedValue({ request: "No se pudo establecer una conexión con la URL" });

    try {
      await validateURL(url);
    } catch (error) {
      expect(error).toBe(0);
    }
  });
  test('Debería rechazar con 500 en caso de error desconocido al validar la URL', async () => {
    const url = 'http://exampdgdle.com';
    axios.get.mockRejectedValue({ response: { statusText: 'Unknown Error' } });

    try {
      await validateURL(url);
    } catch (error) {
      expect(error).toBe(500);
    }
  });
});


jest.mock("fs"); // Mockea fs para evitar lecturas reales de archivos

describe("getArray", () => {
  test("Debería resolver con un array de enlaces si el archivo contiene enlaces markdown", async () => {
    const userPath = "docs/04-milestone.md";
    const links = await getArray(userPath);

    expect(links).toEqual([
      {
        href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
        text: 'mdlinks-example',
        file: 'C:/Users/nicol/Desktop/trabajo/md-links/docs/04-milestone.md',
      },
      {
        href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/502cbafc-b4ac-4734-85b3-1734f67af1d3',
        text: 'mdlinks-example-validate',
        file: 'C:/Users/nicol/Desktop/trabajo/md-links/docs/04-milestone.md',
      },
      {
        href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/910720c6-aa3f-4d08-b076-c1add13c95f1',
        text: 'mdlinks-example-stats',
        file: 'C:/Users/nicol/Desktop/trabajo/md-links/docs/04-milestone.md',
      },
      {
        href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/9d9971a0-866a-4c64-a890-4c62c3df3700',
        text: 'mdlinks-example-stats-validate',
        file: 'C:/Users/nicol/Desktop/trabajo/md-links/docs/04-milestone.md',
      },
      {
        href: 'https://www.npmjs.com/',
        text: 'NPM',
        file: 'C:/Users/nicol/Desktop/trabajo/md-links/docs/04-milestone.md',
      }
    ]);
  });


});

describe("extensionMd", () => {
  test("Debería retornar la extensión '.md' para un archivo con extensión '.md'", () => {
    const userPath = "file.md";
    const result = extensionMd(userPath);
    expect(result).toBe(".md");
  });
});



describe("validateExistence", () => {
  test("Debería retornar true para una ruta que existe", () => {
    const userPath = "docs/05-milestone.md";
    const result = validateExistence(userPath);
    expect(result).toBe(true);
  });

  test("Debería retornar false para una ruta que no existe", () => {
    // Supongamos que no existe una carpeta o archivo llamado "nonexistentPath" en tu sistema de archivos
    const userPath = "nonexistentPath";
    const result = validateExistence(userPath);
    expect(result).toBe(false);
  });

  // Agrega más pruebas según sea necesario para otros casos de existencia o no existencia de rutas.
});

describe("convertRelativePath", () => {
  test("Debería convertir una ruta relativa a absoluta y reemplazar las barras inversas por diagonales", () => {
    const userPath = "/docs/05-milestone.md"
    // const result = convertRelativePath(userPath);
    expect(convertRelativePath(userPath)).toBe('C:/Users/nicol/Desktop/trabajo/md-links/docs/05-milestone.md');
  });
});

describe("validateAbsolutePath", () => {
  test("Debería retornar true para una ruta absoluta", () => {
    const userPath = "/ruta/absoluta/algun-archivo.txt";
    const result = validateAbsolutePath(userPath);
    expect(result).toBe(true);
  });
});

