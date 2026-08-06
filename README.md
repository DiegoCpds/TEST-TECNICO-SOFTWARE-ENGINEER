# 🛒 Retail Store

Aplicación web desarrollada como prueba técnica para **Software Engineer**.

El proyecto implementa un sistema de gestión de productos utilizando una arquitectura cliente-servidor, separando el frontend y backend para facilitar el mantenimiento y escalabilidad.

---

## Descripción

Retail Store permite analizar productos y tomar decisiones de compra sostenibles, optimizando presupuesto e impacto ambiental/social

La aplicación cuenta con:

- Un frontend desarrollado con React + Vite.
- Un backend desarrollado con Node.js + Express.
- Persistencia de datos utilizando MongoDB.

---

# Arquitectura del proyecto

```
Retail Store
│
├── frontend
│   ├── React
│   ├── Vite
│   └── TypeScript
│
├── server
│   ├── Node.js
│   ├── Express
│   ├── Mongoose
│   └── API REST
│
├── retailStore.products.json
│
└── README.md
```

---

# Tecnologías utilizadas

## Frontend

- React
- Vite
- TypeScript
- CSS

## Backend

- Node.js
- Express
- Mongoose

## Base de datos

- MongoDB

## Herramientas

- Git
- GitHub
- pnpm

---

# Requisitos

Antes de ejecutar el proyecto se debe tener instalado:

- Node.js (versión 24.19 o superior recomendada)
- pnpm (versión 11.20.0 o superior recomendada)
- MongoDB (versión 8.3.7 o superior recomendada)

Verificar instalación:

```bash
node -v
pnpm -v
mongod --version
```

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/DiegoCpds/TEST-TECNICO-SOFTWARE-ENGINEER.git

cd TEST-TECNICO-SOFTWARE-ENGINEER
```

---

# Frontend

Ingresar a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
pnpm install
```

---

# Backend

Ingresar a la carpeta server:

```bash
cd ../server
```

Instalar dependencias:

```bash
pnpm install
```

---

# Configuración de base de datos

El proyecto utiliza MongoDB.

Configuración utilizada:

```
Base de datos:
retail_store
```

Colección principal:

```
products
```

La conexión utilizada es:

```
mongodb://localhost:27017/retail_store
```

---

# Cargar datos iniciales

El repositorio incluye un archivo con datos iniciales:

```
retailStore.products.json
```

Estos datos pueden ser importados utilizando MongoDB Compass:

1. Abrir MongoDB Compass.
2. Conectarse al servidor local:

```
mongodb://localhost:27017
```

3. Crear o seleccionar la base de datos:

```
retail_store
```

4. Crear la colección:

```
products
```

5. Importar el archivo:

```
retailStore.products.json
```

---

# Ejecución del proyecto

## Backend

Desde la carpeta `server`:

```bash
node server.js
```

El servidor quedará disponible en:

```
http://localhost:3000
```

---

## Frontend

Desde la carpeta `frontend`:

```bash
pnpm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

# Endpoints principales

## Productos

### Obtener productos

```
GET /products
```

### Crear producto

```
POST /products
```

### Actualizar producto

```
PUT /products/:id
```

### Eliminar producto

```
DELETE /products/:id
```

### Obtener lista de productos optimos

```
POST /products/optimal
```

---

# Algoritmos implementados

## scoring.service.js - Sistema de Scoring de Sostenibilidad (económico, ambiental, social):
Es un sistema que mide la sostenibilidad de cada producto en base a su impacto económico, ambiental y social. Se calcula cada puntuación por separado, con el fin de normalizar el valor entre 0 y 100, siendo 0 el peor puntaje y 100 el mejor puntaje. Luego se ponderan los 3 puntajes para tener un puntaje final "finalScore".

- Para el puntaje económico, se toma en consideración el valor del producto sobre el presupuesto indicado, con esto mientras menor sea el valor del producto tendrá mejor puntaje.

- Para el puntaje ambiental se toma el dato "carbonImpact" de cada producto y el puntaje será mayor a medida que la variable sea menor.

- Para el puntaje social, se toma el dato "socialImpact" y el puntaje será igual al dato entregado (esto asumiendo que el dato socialImpact es mejor socialmente mientras mayor sea)

- Para el puntaje final, se ponderan los 3 puntajes anteriores, cada uno asignado con un peso en la variable "weights" (ajustable), considerando que los pesos en total sumen 1. La función retornará el puntaje final "finalScore"

## knapsack.service.js - Algoritmo de Mochila Multi-objetivo para optimización de lista de compras:
Se trata de la implementación del algoritmo de Mochila o knapsack, para optimizar los productos en base a su impacto económico, social y ambiental.
- Se toma como Peso el precio de cada producto, como Valor el puntaje obtenido del sistema de Scoring de Sostenibilidad, y como restricción o capacidad máxima el presupuesto, el cual es entregado por el usuario. Esto con el objetivo de maximizar Valor (Score de sostenibilidad) mientras que se ahorra lo máximo posible sin pasarse del presupuesto.

---
# Uso de IA
Durante el desarrollo del proyecto se utilizó IA como herramienta de apoyo técnico y consulta.
Sus principales usos fueron:
- Validación de la interpretación del problema y análisis de los requerimientos de la prueba técnica.
- Discusión de posibles enfoques de solución y apoyo en la elección de estrategias de implementación.
- Orientación para adaptar algoritmos al contexto del proyecto y evaluar su correcta aplicación.
- Resolución de dudas sobre implementación y configuración de tecnologías utilizadas en el proyecto (React, Vite, Node.js, Express, MongoDB y Git).
- Apoyo en la depuración de errores encontrados durante el desarrollo, incluyendo problemas relacionados con dependencias, configuración de paquetes y manejo del entorno de desarrollo.
- Revisión de estructura y organización del proyecto, incluyendo recomendaciones para separar frontend y backend.
- Orientación sobre buenas prácticas de desarrollo, documentación y organización del repositorio.
- Apoyo en la creación y mejora del archivo README.md, incluyendo estructura de instalación, ejecución y descripción del proyecto.
- Consulta sobre mejoras potenciales del proyecto, como manejo de variables de entorno, control de versiones y posibles estrategias de despliegue.


---

# 👨‍💻 Autor

**Diego Céspedes**

GitHub:

https://github.com/DiegoCpds
