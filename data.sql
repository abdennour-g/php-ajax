create database myData default character set utf8;
use myData;
CREATE TABLE IF NOT EXISTS client (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(30) DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
insert into client(name, email)
values ('imad', 'imad@gamail.com'),
    ('ali', 'ali@hotmail.com'),
    ('riad', 'riad@gmail.com');