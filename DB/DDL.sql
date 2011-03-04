DROP TABLE transaction;
DROP TABLE transaction_details;
DROP TABLE merchant;
DROP TABLE products;
DROP TABLE product_type;

DROP SEQUENCE merchant_seq;
DROP SEQUENCE products_seq;
--DROP SEQUENCE product_type_seq;
DROP SEQUENCE transaction_seq;
DROP SEQUENCE transaction_details_seq;

CREATE TABLE transaction(
id NUMBER(7) NOT NULL DEFAULT nextval('transaction_seq'),
merchant_id NUMBER(10),
total NUMBER(10,2),
vat NUMBER(10,2),
grand_total NUMBER(10,2),
date DATE DEFAULT SYSDATE,
tr_type VARCHAR2(10));

CREATE TABLE transaction_details(
id NUMBER(7)  NOT NULL DEFAULT nextval('transaction_details_seq'),
transaction_id NUMBER(7),
product_id NUMBER(7),
billed NUMBER(5),
shipped NUMBER(5),
price_per_piece NUMBER(10,2),
date DATE DEFAULT SYSDATE);

CREATE TABLE merchant(
id NUMBER(7) NOT NULL DEFAULT nextval('merchant_seq'),
name VARCHAR2(200),
address VARCHAR2(1000),
tin VARCHAR2(20));

CREATE TABLE products(
id NUMBER(7) NOT NULL DEFAULT nextval('products_seq'),
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

--CREATE SEQUENCE product_type_seq
--START with 100
--INCREMENT BY 1;


-- insert merchant data ----
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('Perfume D Paris','Perfume D Paris, #1/1, 1st floor, above samsonite, MTK Reddy complex, Rind Road Junction, Marathahalli, B-37','29730201322');
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('Sugandh Sagar','Sugandh Sagar, Jayanagar Shopping complex, Bangalore','29910132256');
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('Our Store','Our Store, Bangalore club, Residency road, Bangalore','29610291100');
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('The Store','The Store,F5 Gopalan Arcade, R R Nagar, Mysore Road Bangalore - 98','29240878700');
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('En Vouge','En vouge, 151/44, 2nd cross, 8th main road, Vasanth Nagar, Bangalore - 560052','29210460986');
INSERT INTO merchant (NAME, ADDRESS, TIN) values ('Maa Santoshi Agencies','Maa Santoshi Agencies, 696 Nazarabad Main Road, Mysore - 570010','298404466702');

-- insert product_type data ----
INSERT INTO PRODUCT_TYPE (ID, NAME) VALUES (1001, 'DEO');
INSERT INTO PRODUCT_TYPE (ID, NAME) VALUES (1002, 'PERFUME');
INSERT INTO PRODUCT_TYPE (ID, NAME) VALUES (1003, 'GIFT_SET');

-- insert products data -----
INSERT INTO PRODUCTS (NAME, TYPE_ID, VOLUME, GENDER, MANUFACTURER, MRP, VERSION) VALUES (');

commit;