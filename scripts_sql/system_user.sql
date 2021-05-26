CREATE TABLE system_user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

insert into system_user(email, password) values ('admin@projetointegrador.com', 'admin123');