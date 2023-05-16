INSERT INTO users (name, surname, email, password, imageUrl, biography) 
VALUES 
('Eduardo', 'Castro Bianch', 'eduardo@gmail.com', '123', 'https://i.pinimg.com/170x/b9/9a/30/b99a309f679ff9154edc78d8db0575ea.jpg', 'Soy desarollador web'),
('Guillermo', 'De La Rosa', 'guillermo@gmail.com', '123', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSDv22Pa8W1Tmf2uOYMLV-JuG1mMA6K8ezZg&usqp=CAU', 'Soy desarollador web'),
('Fran', 'Valderrey', 'fran@gmail.com', '123', 'https://c.wallhere.com/photos/74/7a/V_for_Vendetta_mask_Guy_Fawkes_mask-76525.jpg!d', 'Soy desarollador web'),
('David', 'Martinez Quiroga', 'david@gmail.com', '123', 'https://images.fineartamerica.com/images/artworkimages/medium/2/calimero-show-vesna-antic.jpg', 'Soy desarollador web');

SELECT * FROM users;

INSERT INTO category (name) 
VALUES 
('Noticias locales'),
('Noticias nacionales'),
('Noticias internacionales'),
('Ciencia y tecnología'),
('Economía y negocios'),
('Deportes'),
('Entretenimiento'),
('Psicología'),
('Estilo de vida');

SELECT * FROM category;

INSERT INTO news (userId, imagenUrl, title, publishDate, score, categoryId, introText, text)
VALUES
    (1, 'https://...jpg', 'Título noticia 1 sobre Ciencia y tecnología', NOW(), 20, 4, 'Introducción de la noticia 1', 'Texto completo de la noticia 1'),
    (2, 'https://...jpg', 'Título noticia 2 sobre Deportes', NOW(), 25, 6, 'Introducción de la noticia 2', 'Texto completo de la noticia 2'),
    (3, 'https://...jpg', 'Título noticia 3 sobre Psicología', NOW(), 30, 8, 'Introducción de la noticia 3', 'Texto completo de la noticia 3'),
    (4, 'https://...jpg', 'Título noticia 4 sobre Entretenimiento', NOW(), 35, 7, 'Introducción de la noticia 4', 'Texto completo de la noticia 4');

SELECT * FROM news;