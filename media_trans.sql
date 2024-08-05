CREATE EXTENSION "uuid-ossp";


CREATE SCHEMA IF NOT EXISTS "public";

CREATE SEQUENCE "public".account_accountid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".conversation_idconversation_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".follow_followid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".message_messageid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".notification_notifid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".offer_offerid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".rating_ratingid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".report_reportid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".saveoffer_saveid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".sendnotification_sendnotifid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".subscription_subid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".vehicle_vehicleid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE TYPE "public".accounttype AS ENUM ('Entreprise','Client','Camionneur');

CREATE  TABLE "public".account ( 
	accountid            serial  NOT NULL  ,
	accounttype          varchar(50)  NOT NULL  ,
	CONSTRAINT account_pkey PRIMARY KEY ( accountid )
 );

CREATE  TABLE "public".subscription ( 
	subid                serial  NOT NULL  ,
	label                varchar(50)  NOT NULL  ,
	duration             integer  NOT NULL  ,
	price                numeric(10,2)  NOT NULL  ,
	CONSTRAINT subscription_pkey PRIMARY KEY ( subid )
 );

CREATE  TABLE "public".users ( 
	userid               uuid DEFAULT uuid_generate_v4() NOT NULL  ,
	firstname            varchar(50)  NOT NULL  ,
	lastname             varchar(75)    ,
	usercin              varchar(12)    ,
	companynumber        varchar(20)    ,
	phone                varchar(10)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	email                varchar(100)    ,
	bio                  text    ,
	profileimage         text    ,
	"password"           varchar(255)  NOT NULL  ,
	registerdate         date DEFAULT CURRENT_DATE   ,
	accountid            integer  NOT NULL  ,
	subid                integer    ,
	enrdate              date    ,
	accessday            integer DEFAULT 2   ,
	CONSTRAINT users_pkey PRIMARY KEY ( userid ),
	CONSTRAINT users_accountid_fkey FOREIGN KEY ( accountid ) REFERENCES "public".account( accountid )   ,
	CONSTRAINT users_subid_fkey FOREIGN KEY ( subid ) REFERENCES "public".subscription( subid )   
 );

CREATE  TABLE "public".vehicle ( 
	vehicleid            serial  NOT NULL  ,
	userid               uuid  NOT NULL  ,
	make                 varchar(50)  NOT NULL  ,
	"type"               varchar(50)  NOT NULL  ,
	capacity             integer  NOT NULL  ,
	registrationnumber   varchar(20)  NOT NULL  ,
	dispo                boolean DEFAULT true   ,
	CONSTRAINT vehicle_pkey PRIMARY KEY ( vehicleid ),
	CONSTRAINT vehicle_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".conversation ( 
	idsender             uuid  NOT NULL  ,
	idreceiver           uuid  NOT NULL  ,
	idconversation       bigserial  NOT NULL  ,
	lastupdate           timestamp    ,
	lastmessage          text DEFAULT 'Hi'::text   ,
	lastsender           uuid    ,
	CONSTRAINT pk_conversation PRIMARY KEY ( idconversation ),
	CONSTRAINT fk_conversation_users FOREIGN KEY ( idsender ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_conversation_users_0 FOREIGN KEY ( idreceiver ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".follow ( 
	followid             serial  NOT NULL  ,
	followerid           uuid  NOT NULL  ,
	followeeid           uuid  NOT NULL  ,
	followdate           date DEFAULT CURRENT_DATE   ,
	CONSTRAINT follow_pkey PRIMARY KEY ( followid ),
	CONSTRAINT follow_followerid_fkey FOREIGN KEY ( followerid ) REFERENCES "public".users( userid )   ,
	CONSTRAINT follow_followeeid_fkey FOREIGN KEY ( followeeid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".message ( 
	messageid            serial  NOT NULL  ,
	sentdate             timestamp DEFAULT CURRENT_TIMESTAMP   ,
	viewed               char(1) DEFAULT 'F'::bpchar   ,
	content              text    ,
	idconversation       bigint    ,
	receiverid           uuid    ,
	CONSTRAINT message_pkey PRIMARY KEY ( messageid ),
	CONSTRAINT fk_message_conversation FOREIGN KEY ( idconversation ) REFERENCES "public".conversation( idconversation ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_message_users FOREIGN KEY ( receiverid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".notifications ( 
	notifid              integer DEFAULT nextval('notification_notifid_seq'::regclass) NOT NULL  ,
	content              text  NOT NULL  ,
	notifdate            timestamp DEFAULT CURRENT_TIMESTAMP   ,
	senderid             uuid    ,
	link                 varchar(200)    ,
	CONSTRAINT notification_pkey PRIMARY KEY ( notifid ),
	CONSTRAINT fk_notifications_users FOREIGN KEY ( senderid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".offer ( 
	offerid              serial  NOT NULL  ,
	userid               uuid  NOT NULL  ,
	title                varchar(100)  NOT NULL  ,
	capacity             varchar(10)  NOT NULL  ,
	depart               varchar(100)  NOT NULL  ,
	dest                 varchar(100)  NOT NULL  ,
	scheduleddate        date  NOT NULL  ,
	description          text  NOT NULL  ,
	imgurl               text  NOT NULL  ,
	dispo                boolean DEFAULT true   ,
	publicationdate      timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT offer_pkey PRIMARY KEY ( offerid ),
	CONSTRAINT offer_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".rating ( 
	ratingid             serial  NOT NULL  ,
	raterid              uuid  NOT NULL  ,
	ratedid              uuid  NOT NULL  ,
	ratingdate           timestamp DEFAULT CURRENT_TIMESTAMP   ,
	rating               smallint  NOT NULL  ,
	CONSTRAINT rating_pkey PRIMARY KEY ( ratingid ),
	CONSTRAINT rating_raterid_fkey FOREIGN KEY ( raterid ) REFERENCES "public".users( userid )   ,
	CONSTRAINT rating_ratedid_fkey FOREIGN KEY ( ratedid ) REFERENCES "public".users( userid )   
 );

ALTER TABLE "public".rating ADD CONSTRAINT rating_rating_check CHECK ( ((rating >= 1) AND (rating <= 5)) );

CREATE  TABLE "public".report ( 
	reportid             serial  NOT NULL  ,
	reporterid           uuid  NOT NULL  ,
	reportedid           uuid  NOT NULL  ,
	reportdate           timestamp DEFAULT CURRENT_TIMESTAMP   ,
	message              text  NOT NULL  ,
	reason               text  NOT NULL  ,
	CONSTRAINT report_pkey PRIMARY KEY ( reportid ),
	CONSTRAINT report_reporterid_fkey FOREIGN KEY ( reporterid ) REFERENCES "public".users( userid )   ,
	CONSTRAINT report_reportedid_fkey FOREIGN KEY ( reportedid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".saveoffer ( 
	saveid               serial  NOT NULL  ,
	offerid              integer  NOT NULL  ,
	userid               uuid  NOT NULL  ,
	savedate             timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT saveoffer_pkey PRIMARY KEY ( saveid ),
	CONSTRAINT saveoffer_offerid_fkey FOREIGN KEY ( offerid ) REFERENCES "public".offer( offerid )   ,
	CONSTRAINT saveoffer_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".sendnotification ( 
	sendnotifid          serial  NOT NULL  ,
	userid               uuid    ,
	notifid              integer    ,
	viewed               boolean DEFAULT false   ,
	CONSTRAINT pk_sendnotification PRIMARY KEY ( sendnotifid ),
	CONSTRAINT fk_sendnotification_notifications FOREIGN KEY ( notifid ) REFERENCES "public".notifications( notifid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_sendnotification_users FOREIGN KEY ( userid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE OR REPLACE FUNCTION public.uuid_generate_v1()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$;

CREATE OR REPLACE FUNCTION public.uuid_generate_v1mc()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$;

CREATE OR REPLACE FUNCTION public.uuid_generate_v3(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$;

CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$;

CREATE OR REPLACE FUNCTION public.uuid_generate_v5(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$;

CREATE OR REPLACE FUNCTION public.uuid_nil()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_nil$function$;

CREATE OR REPLACE FUNCTION public.uuid_ns_dns()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$;

CREATE OR REPLACE FUNCTION public.uuid_ns_oid()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$;

CREATE OR REPLACE FUNCTION public.uuid_ns_url()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_url$function$;

CREATE OR REPLACE FUNCTION public.uuid_ns_x500()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$;

INSERT INTO "public".account( accountid, accounttype ) VALUES ( 1, 'Entreprise');
INSERT INTO "public".account( accountid, accounttype ) VALUES ( 2, 'Camionneur');
INSERT INTO "public".account( accountid, accounttype ) VALUES ( 3, 'Client');
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 'ADOLPHE', null, null, '342541432424', '0340854816', 'SOANIERANA FIANARANTSOA', 'allel@gmail.com', 'Nothing', 'profileImage-1720882570236.jpg', '$2a$10$9lA44xVm8SI.1TChgFuAWuytLNCkr1TYNFf2pAUr89u1I.yBePjHS', '2024-07-12', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 'Jean', 'Mark', '321231234456', null, '0324578376', 'SOANIERANA FIANARANTSOA', 'jean@gmail.com', 'Nothing', 'profileImage-1720882627143.jpg', '$2a$10$iW6No4OqIW4Smzi96MZyAOggf9nKlfQVzr.BV0LvxyZzPfLymtCfe', '2024-07-13', 2, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '325ab2a9-a6fd-4a5f-9408-9498bb012afe', 'PROTESTE', null, null, '55255252523', '0341243567', 'ANTSIRANANA', 'prot@gmail.com', 'Entreprise inconnue de tous', 'default.png', '$2a$10$eDayYx51CNE3zAkUzLNCVOEv4CFK5bJSoNwkBFE32RyFdv23KIJyi', '2024-07-14', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '89ed4dfe-33af-438d-911f-285c85619c0a', 'RAHARISOA', 'Haingonirina', '111111111111', null, '0345393880', 'au ciel', 'haingonirina301@gmail.com', 'give me your heart guys', 'default.png', '$2a$10$R2wQQLN1ZdfpFXk.bqbDPeygAAhcHcJhOrVXj.NOZnR0vKzI5VXte', '2024-07-14', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 'Razafitsotra', 'Toslin', '201011032461', null, '0380525383', 'AJhSJHAA', 'razafitosy@gmail.com', 'SASASASASdsd', 'default.png', '$2a$10$WgVxrRjMVKy9MELuGL4rCe9.DeAGGEFhxhWlCOe128ZXWTrOAiiUm', '2024-07-15', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f', 'ADMIN', null, null, '5252525352', '0348967543', 'Admin adresse', 'admin@gmail.com', 'Je suis admin', 'default.png', '$2a$10$OCzYcbj/pLPKHegu5xOHiecuVEJ.DQdU1xDfLrBjv0rx4yt1hxdh.', '2024-07-15', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'fbfe3738-952d-4c2c-94e1-20e816c439de', 'vgjkgjhklb', 'iphuhpwn', '779651234567', null, '0347917218', 'sdsdvsdv', 'ue@gmail.com', 'vsdvsdvs', 'default.png', '$2a$10$TC6hk98Ijd1sfvKn4aF.k.kfMlcqaIZYd5ObPvGO5QXl1aBvWW91.', '2024-07-12', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '933bad13-88f2-4dd9-a220-0f2bb1714af3', 'Alexis', 'Allel', '634451234565', null, '0324565423', 'Soanierana', 'alexis@gmail.com', 'None of your business', 'default.png', '$2a$10$8XU3fWCa8HjDDmU7LLYLy.MrrUwScZclxrcPEhqvcS8oiQ3vunZEO', '2024-07-14', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '5c0b6122-726f-4ddb-9cef-ef2241507e53', 'TOLOJANAHARY', 'Modeste', '212011013026', null, '0332571312', 'Manakara', 'modestep20.aps1a@gmail.com', 'Boum boum', 'default.png', '$2a$10$V5decVpAs3D5lFC6Yztm8.VC/4gM9upm1fh9lenUknNCHjlcrj/t2', '2024-07-16', 2, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '19c31c51-8982-473b-a767-9535850a8934', 'Fandreseko', 'Ismael', '222222222222', null, '0346179950', 'Andrainjato Fianarantsoa', 'fandreseko@gmail.com', 'Bonjour', 'default.png', '$2a$10$oiFCqWfAv6Wkf67FhzfZZ.ZKy.XW2ofwCpG8BjlkAyAYWJqvVwD9e', '2024-07-16', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'dd592338-ca50-491e-afcf-44f563ae0d6e', 'Rael', 'Nathan', '123452123456', null, '0346712308', 'Nathan', 'ralaivoavy.natanael@gmail.com', 'admin\n', 'default.png', '$2a$10$SWue6oPs6Y7uxs4jvTvkSuzoABtZY/fakaH4CXMRK3.yUPwc4ax.S', '2024-07-16', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '761cdd81-0e1d-4271-b1b5-734f1d972762', 'hery', null, null, '212121212121', '0348188887', 'Andrainjato Fianarantsoa', 'hery@gmail.com', 'Ismael', 'X.jpg', '$2a$10$QM0Jo3.kkhKy3LMepPOUy.34Fd9c0fHWvprDTsEadzxbURgp3.6Y2', '2024-07-17', 1, null, null, 2);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( '933bad13-88f2-4dd9-a220-0f2bb1714af3', '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 31, '2024-07-26 09:04:49 AM', 'gggg', null);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 33, '2024-07-28 09:20:15 PM', 'ttt', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 63, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '2024-07-17');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 67, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', '89ed4dfe-33af-438d-911f-285c85619c0a', '2024-07-17');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 188, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', '2024-07-28');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 141, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', '933bad13-88f2-4dd9-a220-0f2bb1714af3', '2024-07-21');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 56, 'dd592338-ca50-491e-afcf-44f563ae0d6e', 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', '2024-07-17');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 72, 'ADOLPHE Vous suit desormais.', '2024-07-26 10:39:01 AM', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 73, 'Alexis Allel A recemment publié une offre !', '2024-07-26 10:39:44 AM', '933bad13-88f2-4dd9-a220-0f2bb1714af3', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 74, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-26 11:16:58 AM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 75, 'Alexis Allel Vous suit desormais.', '2024-07-26 11:17:57 AM', '933bad13-88f2-4dd9-a220-0f2bb1714af3', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 76, 'ADOLPHE A recemment publié une offre !', '2024-07-26 11:19:12 AM', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 77, 'Alexis Allel Vous suit desormais.', '2024-07-26 11:25:19 AM', '933bad13-88f2-4dd9-a220-0f2bb1714af3', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 78, 'ADOLPHE Vous suit desormais.', '2024-07-28 09:19:09 PM', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 79, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:01:45 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 80, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:05:39 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 81, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:06:39 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 82, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:09:11 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 83, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:10:35 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 84, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-07-28 10:25:38 PM', '89ed4dfe-33af-438d-911f-285c85619c0a', null);
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 44, '933bad13-88f2-4dd9-a220-0f2bb1714af3', 'Marchandise à transporter', '1 tonne', 'TANA', 'ANTSIRABE', '2024-07-28', 'Des Armes de guerres', 'imgUrl-1721979584866.jpg', true, '2024-07-26 10:39:44 AM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 45, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 'Marchandise à transporter', '10 kg', 'TANA', 'FIANARA', '2024-07-28', 'PS 5', 'imgUrl-1721981951882.jpg', true, '2024-07-26 11:19:12 AM');
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 44, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 73, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 47, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 76, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 51, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 78, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 57, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 84, false);