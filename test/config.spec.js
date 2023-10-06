/* eslint-disable no-undef */

import axios from "axios";
import { validateURL} from "../components/config";


jest.mock("axios"); 

describe("validateURL", () => {
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

