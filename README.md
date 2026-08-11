API REST desarrollada con Node.js, Express y MongoDB para registro deusuarios, autenticación mediante JWT, cálculo numerológico, lecturasgeneradas con IA y compatibilidad entre usuarios.

Tecnologías

Node.js

Express

MongoDB / Mongoose

JWT

bcryptjs

Axios

OpenRouter

Nodemon

Thunder Client para pruebas

Instalación

npm install

Para ejecutar el proyecto en desarrollo:

npm run dev

Servidor:

http://localhost:3000

Variables de entorno

Crear un archivo .env:

PORT=3000
MONGODB_URI=TU_MONGODB_URI
JWT_SECRET=TU_JWT_SECRET
OPENROUTER_API_KEY=TU_OPENROUTER_API_KEY
OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free

No publicar el archivo .env.

Endpoints

1. Registrar usuario

POST

http://localhost:3000/api/v1/auth/register

Body

{
  "nombreCompleto": "Carlos Mendoza",
  "email": "carlos.mendoza@example.com",
  "password": "Carlos2026!",
  "fechaNacimiento": "1998-07-15"
}

Respuesta esperada

{
  "message": "Usuario registrado"
}

El usuario registrado puede utilizarse posteriormente para iniciarsesión y obtener un token JWT.

2. Login

POST

http://localhost:3000/api/v1/auth/login

Body

{
  "email": "carlos.mendoza@example.com",
  "password": "Carlos2026!"
}

Respuesta esperada

{
  "message": "Login exitoso",
  "token": "TOKEN_GENERADO_POR_EL_SERVIDOR"
}

Guardar el token porque se necesita para los endpoints protegidos.

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

3. Calcular perfil numerológico

POST

http://localhost:3000/api/v1/numerology/calculate

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

Body

No necesita body.

Función

Obtiene los datos del usuario autenticado y calcula:

Número de Vida

Número de Expresión

Número del Alma

El resultado queda almacenado en MongoDB.

Ejemplo de respuesta

{
  "_id": "ID_DEL_PERFIL",
  "userId": "ID_DEL_USUARIO",
  "numeroVida": 7,
  "numeroExpresion": 3,
  "numeroAlma": 9
}

4. Consultar perfil numerológico

GET

http://localhost:3000/api/v1/numerology/profile

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

Body

No necesita body.

Ejemplo de respuesta

{
  "_id": "ID_DEL_PERFIL",
  "userId": "ID_DEL_USUARIO",
  "numeroVida": 7,
  "numeroExpresion": 3,
  "numeroAlma": 9
}

Si todavía no se ha ejecutado el cálculo:

{
  "message": "Perfil no encontrado. Ejecuta primero POST /calculate"
}

5. Generar lectura con IA

POST

http://localhost:3000/api/v1/readings/generate

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

Body

{
  "tipo": "general"
}

El endpoint utiliza el perfil numerológico del usuario autenticado yenvía los números a OpenRouter para generar una lectura.

Ejemplo de respuesta

{
  "_id": "ID_DE_LA_LECTURA",
  "userId": "ID_DEL_USUARIO",
  "prompt": "El usuario posee: Número de Vida: 7, Número de Expresión: 3, Número del Alma: 9. Genera una lectura general de personalidad.",
  "respuesta": "La combinación de estos números representa...",
  "tipo": "general"
}

6. Consultar historial de lecturas

GET

http://localhost:3000/api/v1/readings/history

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

Body

No necesita body.

Ejemplo de respuesta

[
  {
    "_id": "ID_DE_LA_LECTURA",
    "userId": "ID_DEL_USUARIO",
    "prompt": "Prompt utilizado para generar la lectura",
    "respuesta": "Lectura generada por la IA",
    "tipo": "general"
  }
]

7. Calcular compatibilidad

POST

http://localhost:3000/api/v1/compatibility/calculate

Header

Authorization: Bearer TOKEN_GENERADO_POR_EL_SERVIDOR

Body

El userId corresponde al usuario con el que se desea comparar alusuario autenticado.

{
  "userId": "ID_DE_OTRO_USUARIO"
}

Ejemplo

{
  "userId": "64f2a9c81d7e4b23a91c5f60"
}

Funcionamiento

El sistema compara:

Número de Vida

Número de Expresión

Número del Alma

Después calcula un porcentaje y asigna un nivel:

Alta: 67% o más

Media: entre 34% y 66%

Baja: menos de 34%

Ejemplo de respuesta

{
  "message": "Compatibilidad calculada",
  "resultado": {
    "_id": "ID_DEL_RESULTADO",
    "userId": "ID_DEL_USUARIO_ACTUAL",
    "compatibleUserId": "64f2a9c81d7e4b23a91c5f60",
    "porcentaje": 67,
    "nivel": "Alta"
  }
}

Autenticación

Los endpoints protegidos utilizan JWT.

El token se obtiene mediante:

POST /api/v1/auth/login

Después debe enviarse en el header:

Authorization: Bearer TOKEN

Los endpoints protegidos son:

POST /api/v1/numerology/calculate
GET  /api/v1/numerology/profile

POST /api/v1/readings/generate
GET  /api/v1/readings/history

POST /api/v1/compatibility/calculate

Flujo recomendado de pruebas

Para probar el proyecto desde cero:

1. POST /api/v1/auth/register
        ↓
2. POST /api/v1/auth/login
        ↓
3. Copiar el token
        ↓
4. POST /api/v1/numerology/calculate
        ↓
5. GET /api/v1/numerology/profile
        ↓
6. POST /api/v1/readings/generate
        ↓
7. GET /api/v1/readings/history
        ↓
8. Crear/usar otro usuario con perfil calculado
        ↓
9. POST /api/v1/compatibility/calculate

Códigos HTTP principales

Código   Significado

200      Operación realizada correctamente201      Recurso creado correctamente400      Datos enviados incorrectamente401      Token requerido o inválido / credenciales incorrectas404      Recurso o usuario no encontrado500      Error interno del servidor

Rutas principales

Método   Endpoint                            Autenticación

POST     /api/v1/auth/register             NoPOST     /api/v1/auth/login                NoPOST     /api/v1/numerology/calculate      SíGET      /api/v1/numerology/profile        SíPOST     /api/v1/readings/generate         SíGET      /api/v1/readings/history          SíPOST     /api/v1/compatibility/calculate   Sí

Estructura general del proyecto

api-numerologia/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

Servicios externos

La generación de lecturas utiliza OpenRouter:

https://openrouter.ai/

MongoDB se utiliza como base de datos para usuarios, perfiles, lecturasy compatibilidades.

Estado del proyecto

Proyecto de API de numerología con las funcionalidades principalesimplementadas:

Registro de usuarios

Login y autenticación JWT

Cálculo numerológico

Consulta de perfiles

Generación de lecturas mediante IA

Historial de lecturas

Cálculo de compatibilidad

Persistencia en MongoDB