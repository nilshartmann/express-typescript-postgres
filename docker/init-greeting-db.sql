create table greeting(
	id serial primary key,
	name text not null,
	msg text not null
);

insert into greeting (name, msg) values ('Klaus', 'Moin');
insert into greeting (name, msg) values ('Susi', 'Hello!');
insert into greeting (name, msg) values ('Max', 'Bonjour');
insert into greeting (name, msg) values ('Susi', 'How are you?');
insert into greeting (name, msg) values ('Max', 'Bon soir');
insert into greeting (name, msg) values ('Felipe', 'Hola, ¿qué tal?');
insert into greeting (name, msg) values ('Alex', 'Happy Birthday');
insert into greeting (name, msg) values ('Felipe', '¡buenos días');
insert into greeting (name, msg) values ('Paul', 'Wie gehts?');
insert into greeting (name, msg) values ('Susi', 'Have a nice day')

