![MD LINKS](https://github.com/n-rogget/md-links/assets/139395222/76ccd882-723a-4513-8215-20049ea0af16)

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
### 3.1  Obtener arreglo con propiedades de los links 
Al ejecutar el siguiente comando:

```md-links ./directorioEjemplo```

Se obtendrá un arreglo de objetos con las propiedades:

```
href: URL encontrada.
text: Texto encontrado dentro del link.
file: Ruta del archivo donde se encontró el link.
```

 CORREGIR FILE y PONER FOTO

 ### 3.2 Obtener arreglo con propiedades y validaciones de los links

Para obtener las validaciones se utiliza el argumento `--validate` de la siguiente manera:

```md-links ./directorioEjemplo --validate```

De esta forma se obtendrá un arreglo de objetos con las propiedades:

```
href: URL encontrada.
text: Texto encontrado dentro del link.
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Si falla se obtiene un mensaje 'fail', de lo contrario 'ok'
```

PONER FOTO


### 3.3 Obtener estadísticas de los links

Para obtener las validaciones se utiliza el argumento `--stats` de la siguiente manera:

```md-links ./directorioEjemplo --stats```

De esta forma obtendrá estadísticas relacionadas a los links de los archivos :

```
FOTOOOO
Cantidad de links: 18
Links únicos: 16
Cantidad de links repetidos:  2
```
```
Cantidad de links: Representan la cantidad total de links encontrados en los archivos analizados.
Cada link único se suma, incluso si aparece varias veces en diferentes archivos.
Links únicos: Representan la cantidad de links distintos presentes en los archivos Markdown.
Si un mismo enlace aparece en varios archivos, solo se contará una vez.
Cantidad de links repetidos: Representan la cantidad de links repetidos en los archivos Markdown.
Si un mismo enlace aparece en varios archivos, se contará aquí.
```
Se puede utilizar esta opción para obtener una visión general de la cantidad total de enlaces y la diversidad de enlaces únicos en los documentos Markdown.




## 4. Proceso de diseño y desarrollo

## 5. Herramientas de elaboración




