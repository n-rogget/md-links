<img src="https://github.com/n-rogget/md-links/assets/139395222/76ccd882-723a-4513-8215-20049ea0af16" width="300" height="300" />

## Índice

* [1. Introducción](#1-introoduccion)
* [2. Instalación](#2-instalacion)
* [3. Uso de la API](#3-uso-basico)
* [4. Proceso de diseño y desarrollo](#5-proceso-de-diseño-y-desarrollo)
* [5. Herramientas de elaboración](#6-herramientas-de-elaboracion)

***

## 1. Introducción

MD LINKS es una API desarrollada en node.js, la cual se utiliza para buscar y extraer links que se encuentren dentro de archivos `Markdown` (.md) y proporcionar diferentes opciones para que los usuarios puedan verificar si links son válidos o están rotos, y entregar estadisticas al respecto, de esta manera se brinda una solucion efectiva a quienes trabajan con este tipo de archivo verificando la integridad de los links contenidos. MD LINKS nos brinda las siguientes funciones:

* `Extracción de links`: Permite extraer todos los links presentes en los archivos Markdown de forma precisa, 
                       identificando tanto el texto del links como su URL.
* `Validacion de links`: Para aquellos usuarios que deseen asegurarse de que los links dentro de sus archivos siguen siendo válidos,
                      MD LINKS ofrece una opción para validar el estado de cada link mediante peticiones HTTP.
* `Información detallada`: El resultado del análisis muestra información detallada sobre cada link, incluyendo su estado HTTP y si ha pasado la validación, 
                        lo que permite identificar enlaces rotos y realizar correcciones necesarias.

## 2. Instalación

Para instalar MD LINKS, debe seguir los pasos que se indican a continuación:
1. Abrir una terminal o línea de comando en el proyecto donde requiere utilizar la API
2. Ejecutar el siguiente comando npm para la instalación:

   
   ```npm install n-rogget/md-links```

   
Una vez instalada la API, podrá utilizarla para buscar links en los archivos Markdown, validar el estado de los links y obtener estadísticas respecto a ellos.


## 3. Uso de la API
### 3.1  Obtener propiedades de los links 
Para efectos de la explicación ./directorioEjemplo corresponderá a la ruta del archivo o directorio a analizar.
Al ejecutar el siguiente comando:

```md-links ./directorioEjemplo```

Se obtendrá un arreglo de objetos con las propiedades:

```
file: Ruta del archivo donde se encontró el link.
href: URL encontrada.
text: Texto encontrado dentro del link.
```

![image](https://github.com/n-rogget/md-links/assets/139395222/c6016ab2-55f0-48eb-bed9-502429383b2b)


 ### 3.2 Obtener propiedades y validaciones de los links

Para obtener las validaciones se utiliza el argumento `--validate` de la siguiente manera:

```md-links ./directorioEjemplo --validate```

De esta forma se obtendrá un arreglo de objetos con las propiedades:

```
file: Ruta del archivo donde se encontró el link.
href: URL encontrada.
text: Texto encontrado dentro del link.
status: Código de respuesta HTTP.
ok: Si falla se obtiene un mensaje 'fail', de lo contrario 'ok'
```

![image](https://github.com/n-rogget/md-links/assets/139395222/921a02e9-312d-420b-92a7-09d7985b84e3)


### 3.3 Obtener estadísticas de los links

Para obtener las estadísticas se utiliza el argumento `--stats` de la siguiente manera:

```md-links ./directorioEjemplo --stats```

De esta forma obtendrá estadísticas relacionadas a los links de los archivos :

```
- Cantidad de links: Representan la cantidad total de links encontrados en los archivos analizados. Cada link único se suma,
incluso si aparece varias veces en diferentes archivos.
- Cantidad de links únicos: Representan la cantidad de links distintos presentes en los archivos Markdown. Si un mismo enlace
aparece en varios archivos, solo se contará una vez.
- Cantidad de links repetidos: Representan la cantidad de links repetidos en los archivos Markdown. Si un mismo enlace aparece en
varios archivos, se contará aquí.
```

![image](https://github.com/n-rogget/md-links/assets/139395222/b93aa020-e321-4838-9c29-1cdd3350b6ce)
### 3.3 Obtener estadísticas de los links y estadísticas de validaciones de los links

Para obtener las estadísticas se utiliza el argumento `--stats --validate`` de la siguiente manera:

```md-links ./directorioEjemplo --stats --validate```
```
- Cantidad de links: Representan la cantidad total de links encontrados en los archivos analizados. Cada link único se suma,
incluso si aparece varias veces en diferentes archivos.
- Cantidad de links válidos: Representan la cantidad de links encontrados en los archivos analizados cuya ruta es válida.
- Cantidad de links rotos: Representan la cantidad de links encontrados en los archivos analizados cuya ruta no es válida.
- Cantidad de links únicos: Representan la cantidad de links distintos presentes en los archivos Markdown. Si un mismo enlace
aparece en varios archivos, solo se contará una vez.
- Cantidad de links repetidos: Representan la cantidad de links repetidos en los archivos Markdown. Si un mismo enlace aparece en
varios archivos, se contará aquí.
```



![image](https://github.com/n-rogget/md-links/assets/139395222/bca5a0fc-4efd-4c40-b354-f1c4ae701c19)

## 4. Proceso de diseño y desarrollo

Para la organización del proyecto se utilizó Github Proyect, con el objetivo de planificar adecuadamente los tiempos y dividir el desarrollo en metas y tareas pequeñas. 
Se realizó un diagrama de flujo para ordenar las funciones y el proceso de desarrollo.

![Diagrama sin título drawio (4)](https://github.com/n-rogget/md-links/assets/139395222/7c8c1ed7-d5fd-4ec8-8b16-9be7ac47219d)


El desarrollo del proyecto tomo alrededor de 3 sprints y el trabajo se dividio en 5 hitos:

Hito 1: Creación de la función mdLinks que devuelve una promesa con un arreglo de tres propiedades de los links, href, text y file.

Hito 2: Incorporación del argumento validate para agregar dos propiedades sobre validaciones HTTP, status y ok.

Hito 3: Incorporacion de lectura de directorios, además de solo archivos.

Hito 4: Creación de la interfaz de línea de comando.

Hito 5: Incorporación de recursividad de la función para leer directorios.


## 5. Herramientas de elaboración
`JavaScript`: para crear las funciones

`Node.js`: como entorno de programación de JavaScript con sus Módulos fs y path

`Axios`: Librería de Node.js para hacer las peticiones HTTP

`NPM` (Node Package Manager): para crear la interfaz de línea de comando

`Jest`: para testear las funciones sincronas y asincronas

`Github Project`: para planificar el tiempo y dividir las tareas

`Flowchart maker`: Para realizar el diagrama

