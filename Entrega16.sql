CREATE DATABASE Prueba;

USE Prueba;

CREATE TABLE items(
	Nombre VARCHAR(30) NOT NULL,
    Categoria VARCHAR(30) NOT NULL,
    Stock INT,
    Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
);

INSERT INTO items(Nombre, Categoria, Stock)
VALUES
('Fideos', 'Harina', '20'),
('Leche', 'Lácteos', '30'),
('Crema', 'Lácteos', '15')
;

SELECT * FROM items;

DELETE FROM items
WHERE Id= 1;

UPDATE items
	SET Stock='45'
    WHERE Id='2'
;

SELECT * FROM items;



