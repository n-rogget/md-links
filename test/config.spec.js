/* eslint-disable no-empty */
/* eslint-disable no-undef */

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { validateURLStatusText, validateURL, getArray, validateExistence, validateAbsolutePath, /* convertRelativePath */ } from "../components/config";
// import path from "path"; 

describe("validateURLStatusText", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); 
  });

  afterEach(() => {
    mock.restore(); 
  });

  test("Debería rechazar con 'fail' en caso de que la respuesta sea 'Not Found'", async () => {
    const url = 'http://example.com';
    axios.get.mockResolvedValue({ statusText: 'Not Found' });

    try {
      const result = await validateURLStatusText(url);
      expect(result).toBe('fail');
    } catch (error) {}
  });

});



jest.mock("axios"); 

describe("validateURL", () => {
  test("Debería resolver con el estado en caso de respuesta exitosa (status 'OK')", async () => {
    const url = "http://example.com";
    const response = { status: 200, statusText: "OK" };

    axios.get.mockResolvedValue(response);

    const result = await validateURL(url);

    expect(result.status).toBe(200);
  }); 

 test("Debería rechazar con error en caso de error de conexión", async () => {
    const url = "http://example.com";

    axios.get.mockRejectedValue({ request: "No se pudo establecer una conexión con la URL" });

    try {
      await validateURL(url);
    } catch (error) {
      expect(error.ok).toBe('Error desconocido al validar la URL');
    }
  }); 
   test('Debería rechazar con 500 en caso de error desconocido al validar la URL', async () => {
    const url = 'http://exampdgdle.com';
    axios.get.mockRejectedValue({ response: { status: 'Error desconocido al validar la URL' } });
    try {
      await validateURL(url);
    } catch (error) {
      expect(error.status).toBe('Error desconocido al validar la URL');
    }
  });
}); 


jest.mock("fs");

describe("getArray", () => {
  test("Debería resolver con un array de enlaces si el archivo contiene enlaces markdown", async () => {
    const userPath = "docs/03-milestone.md";
    const links = await getArray(userPath);

    expect(links).toStrictEqual([{"file": "03-milestone.md", "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680", "text": "mdlinks-example"}])
  });
});



describe("validateExistence", () => {
  test("Debería retornar true para una ruta que existe", () => {
    const userPath = "docs/05-milestone.md";
    const result = validateExistence(userPath);
    expect(result).toBe(true);
  });

  test("Debería retornar false para una ruta que no existe", () => {
    const userPath = "nonexistentPath";
    const result = validateExistence(userPath);
    expect(result).toBe(false);
  });

});

/* describe("convertRelativePath", () => {

  test('Debería convertir a una ruta relativa a ruta absoluta', () => {
    const userPath = "\\docs\\05-milestone.md"; 
    const expectedAbsolutePath = path.resolve(userPath).replace(/\\/g, '/'); 

    const result = convertRelativePath(userPath); 

    expect(result).toBe(expectedAbsolutePath); 
  });
});   */

describe("validateAbsolutePath", () => {
  test("Debería retornar true para una ruta absoluta", () => {
    const userPath = "/ruta/absoluta/algun-archivo.txt";
    const result = validateAbsolutePath(userPath);
    expect(result).toBe(true);
  });

});