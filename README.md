# USUARIOS

## Anónimos

- **GET** - [/health] - Responde "I'm alive" -----------------------------------------|#DONE|
- **POST** - [/user] - Nuevo registo con validación de email. ------------------------|#DONE|
- **GET** - [/activate/Código_validación_email] - Activación de usuario. -------------|#DONE|
- **POST** - [/login] - Inicio de sesión. **CON TOKEN** ------------------------------|#DONE|
- **GET** - [/news/:id] - Obtener las noticias de un usuario. **CON TOKEN** ----------|#DONE|
- **GET** - [/news-score] - Obtener las noticias ORDER BY SCORE ----------------------|#DONE|
- **GET** - [/today-news] - Listar noticias del día ordenadas por valoración ---------|#DONE|
- **GET** - [/today-news/:categoryId] - Noticias del día por tema ORDER BY score -----|#DONE|
- **GET** - [/category-news/:categoryId] - Noticias por categoria ORDER BY fecha -----|#DONE|
- **GET** - [/category/:id] - Obtener la categoria por id_categoria ------------------|#DONE|
- **GET** - [/category] - Obtener todas las categorias -------------------------------|#DONE|
- **GET** - [/best] - Obtener las 3 mejores noticias ---------------------------------|#DONE|
- **GET** - [/worst] - Obtener las 3 peores noticias ---------------------------------|#DONE|
- **GET** - [/fake] - Obtener las fake noticias ORDER BY score -----------------------|#DONE|

## Registrados

- _Mismos endpoints anteriores_
- **GET** - [/user] - Información de usuario(Me) **CON TOKEN** -----------------------|#DONE|
- **GET** - [/users] - Información de usuarios. **CON TOKEN** ------------------------|#DONE|
- **GET** - [/user/:id] - Información de usuario. **CON TOKEN** ----------------------|#DONE|
- **GET** - [/news] - Listar noticias ordenadas por fecha **CON TOKEN** --------------|#DONE|
- **GET** - [/news] - Listar noticias ordenadas por score **CON TOKEN** --------------|#DONE|
- **GET** - [/news/:id] - Obtener todas las noticias de un usuario **CON TOKEN** -----|#DONE|
- **DELETE** - [/news/:id] - Eliminar noticia validando id usuario. **CON TOKEN** ----|#DONE|
- **POST** - [/news] - Crear nueva noticia. **CON TOKEN** ----------------------------|#DONE|
- **POST** - [/news/:id/like] - Votar una noticia positivamente. **CON TOKEN** -------|#DONE|
- **POST** - [/news/:id/dislike] - Votar una noticia negativamente. **CON TOKEN** ----|#DONE|
- **POST** - [/news/:id/fake] - Votar una noticia fake. **CON TOKEN** ----------------|#DONE|
- **POST** - [/logout] - Cerrar sesión. **CON TOKEN** --------------------------------|#DONE|
- **PUT** - [/news/:id] - Editar una noticia validando id usuario. **CON TOKEN**------|#DONE|
- **PUT** - [/users] - Actualizar información usuario **CON TOKEN** ------------------|#DONE|

# POSIBLES MEJORAS

- **GET** - [/news/:id/comments] - Obtener los comentarios de una noticia.
- **POST** - [/news/:id/comments] - Comentar y valorar una noticia. **CON TOKEN**
- **PUT** - [/news/:id/comments/:idComment] - Editar un comentario. **CON TOKEN**//SOLO ADMIN
- **DELETE** - [/news/:id/comments/:idComment] - Eliminar un comentario. **CON TOKEN**//SOLO ADMIN
- **POST** - [/news/:id/comments/photo] - Añadir una foto a un comentario. **CON TOKEN**//SOLO ADMIN
- **DELETE** - [/news/:id/comments/photos/:idPhoto] - Eliminar una foto de comentario de noticia. **CON TOKEN**//SOLO ADMIN
- **POST** - [/users/recovery] - Recuperar contraseña de usuario.
- **POST** - [/users/reset] - Insertar nueva contraseña de usuario tras recuperación.
- **PUT** - [/users/:id/password] - Editar contraseña. **CON TOKEN**//SOLO ADMIN
- **POST** - [/category] - Añadir una nueva categoria. **CON TOKEN**
