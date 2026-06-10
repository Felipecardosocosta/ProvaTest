DROP DATABASE IF EXISTS empresa;
CREATE DATABASE empresa CHARACTER SET utf8 COLLATE utf8_general_ci;
USE empresa;

DROP TABLE IF EXISTS movimentacao;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS usuario;


CREATE TABLE usuario(
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    senha VARCHAR(250) NOT NULL,
	acesso VARCHAR(10)NOT NULL DEFAULT ('ALM'),
    CONSTRAINT chk_operador CHECK (acesso IN ('ALM', 'ADMIN'))
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    quantidade_estoque INT NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    data_cadastro DATE NOT NULL DEFAULT (CURRENT_DATE),
    minimo_estoque INT NOT NULL,
    maximo_estoque INT NOT NULL
);

CREATE TABLE movimentacao (
    id_movimentacao INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tipo VARCHAR(10) NOT NULL,
    quantidade INT NOT NULL,
    id_produto INT NOT NULL,
    id_usuario INT NOT NULL,
    datetime_movimentacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_tipo CHECK (tipo IN ('ENTRADA', 'SAIDA')),
    CONSTRAINT fk_movimentacao_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    CONSTRAINT fk_usuario_responsavel FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE token(
    id_token INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    token VARCHAR(400) NOT NULL UNIQUE,
    tipo VARCHAR(250) NOT NULL ,
	datetime_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
   CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);



INSERT INTO produto (nome, quantidade_estoque, valor_unitario, minimo_estoque, maximo_estoque) VALUES
('Amaciante de roupas', 100, 0.50, 20, 150),
('Detergente', 25, 18.90, 10, 60),
('Sabao em po', 40, 22.50, 15, 70);

INSERT INTO usuario (nome, email, senha, acesso) VALUES
('Felipe1', "felipe01.car@gmail.com", 123456, "ADMIN"),
('Felipe2', "felipe02.car@gmail.com", 123456, "ALM"),
('Felipe3', "felipe03.car@gmail.com", 123456, "ALM")
;







INSERT INTO movimentacao (tipo, quantidade, id_produto,	id_usuario) VALUES
('ENTRADA', 50, 1,1),
('SAIDA', 10, 1,2),
('SAIDA', 5, 2,3);
