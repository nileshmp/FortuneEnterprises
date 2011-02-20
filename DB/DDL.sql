DROP TABLE transaction;
DROP TABLE transaction_details;
DROP TABLE merchant;
DROP TABLE products;
DROP TABLE product_type;

DROP SEQUENCE merchant_seq;
DROP SEQUENCE products_seq;
DROP SEQUENCE product_type_seq;
DROP SEQUENCE transaction_seq;
DROP SEQUENCE transaction_details_seq;

CREATE TABLE transaction(
id NUMBER(7) PRIMARY KEY,
merchant_id NUMBER(10),
total NUMBER(10,2),
vat NUMBER(10,2),
grand_total NUMBER(10,2),
date DATE DEFAULT SYSDATE,
tr_type VARCHAR2(10));

CREATE TABLE transaction_details(
id NUMBER(7) PRIMARY KEY,
transaction_id NUMBER(7),
product_id NUMBER(7),
billed NUMBER(5),
shipped NUMBER(5),
price_per_piece NUMBER(10,2),
date DATE DEFAULT SYSDATE);

CREATE TABLE merchant(
id NUMBER(7) PRIMARY KEY,
name VARCHAR2(200),
address VARCHAR2(1000),
tin VARCHAR2(20));

CREATE TABLE products(
id NUMBER(7) PRIMARY KEY,
name VARCHAR2(100),
type_id NUMBER(7),
volume VARCHAR2(20),
gender VARCHAR2(10),
manufacturer VARCHAR2(100),
mrp NUMBER(10,2),
version NUMBER(5));

CREATE TABLE product_type(
id NUMBER(7) PRIMARY KEY,
name VARCHAR2(100));

CREATE SEQUENCE invoice_seq
START with 1
INCREMENT BY 1;

CREATE SEQUENCE merchant_seq
START with 100
INCREMENT BY 1;

CREATE SEQUENCE transaction_seq
START with 1000
INCREMENT BY 1;

CREATE SEQUENCE transaction_details_seq
START with 1000
INCREMENT BY 1;

CREATE SEQUENCE products_seq
START with 100
INCREMENT BY 1;

CREATE SEQUENCE product_type_seq
START with 100
INCREMENT BY 1;