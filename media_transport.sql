CREATE SCHEMA IF NOT EXISTS "public";

CREATE EXTENSION "uuid-ossp";

-- Create the Account table
-- Create ENUM type for accountType

CREATE SEQUENCE "public".account_accountid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".conversation_idconversation_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".follow_followid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".message_messageid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".notification_notifid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".offer_offerid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".rating_ratingid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".report_reportid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".saveoffer_saveid_seq AS integer START WITH 1 INCREMENT BY 1;

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

CREATE  TABLE "public".notification ( 
	notifid              serial  NOT NULL  ,
	userid               uuid  NOT NULL  ,
	content              text  NOT NULL  ,
	notifdate            timestamp DEFAULT CURRENT_TIMESTAMP   ,
	viewed               boolean    ,
	link VARCHAR,
	CONSTRAINT notification_pkey PRIMARY KEY ( notifid ),
	CONSTRAINT notification_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid )   
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
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '325ab2a9-a6fd-4a5f-9408-9498bb012afe', 'PROTESTE', null, null, '55255252523', '0341243567', 'ANTSIRANANA', 'prot@gmail.com', 'Entreprise inconnue de tous', 'X.jpg', '$2a$10$eDayYx51CNE3zAkUzLNCVOEv4CFK5bJSoNwkBFE32RyFdv23KIJyi', '2024-07-14', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '89ed4dfe-33af-438d-911f-285c85619c0a', 'RAHARISOA', 'Haingonirina', '111111111111', null, '0345393880', 'au ciel', 'haingonirina301@gmail.com', 'give me your heart guys', 'X.jpg', '$2a$10$R2wQQLN1ZdfpFXk.bqbDPeygAAhcHcJhOrVXj.NOZnR0vKzI5VXte', '2024-07-14', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 'Razafitsotra', 'Toslin', '201011032461', null, '0380525383', 'AJhSJHAA', 'razafitosy@gmail.com', 'SASASASASdsd', 'X.jpg', '$2a$10$WgVxrRjMVKy9MELuGL4rCe9.DeAGGEFhxhWlCOe128ZXWTrOAiiUm', '2024-07-15', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f', 'ADMIN', null, null, '5252525352', '0348967543', 'Admin adresse', 'admin@gmail.com', 'Je suis admin', 'X.jpg', '$2a$10$OCzYcbj/pLPKHegu5xOHiecuVEJ.DQdU1xDfLrBjv0rx4yt1hxdh.', '2024-07-15', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'fbfe3738-952d-4c2c-94e1-20e816c439de', 'vgjkgjhklb', 'iphuhpwn', '779651234567', null, '0347917218', 'sdsdvsdv', 'ue@gmail.com', 'vsdvsdvs', 'X.jpg', '$2a$10$TC6hk98Ijd1sfvKn4aF.k.kfMlcqaIZYd5ObPvGO5QXl1aBvWW91.', '2024-07-12', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 'ADOLPHE', null, null, '342541432424', '0340854816', 'SOANIERANA FIANARANTSOA', 'allel@gmail.com', 'Nothing', 'profileImage-1720882570236.jpg', '$2a$10$9lA44xVm8SI.1TChgFuAWuytLNCkr1TYNFf2pAUr89u1I.yBePjHS', '2024-07-12', 1, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 'Jean', 'Mark', '321231234456', null, '0324578376', 'SOANIERANA FIANARANTSOA', 'jean@gmail.com', 'Nothing', 'profileImage-1720882627143.jpg', '$2a$10$iW6No4OqIW4Smzi96MZyAOggf9nKlfQVzr.BV0LvxyZzPfLymtCfe', '2024-07-13', 2, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '933bad13-88f2-4dd9-a220-0f2bb1714af3', 'Alexis', 'Allel', '634451234565', null, '0324565423', 'Soanierana', 'alexis@gmail.com', 'None of your business', 'X.jpg', '$2a$10$8XU3fWCa8HjDDmU7LLYLy.MrrUwScZclxrcPEhqvcS8oiQ3vunZEO', '2024-07-14', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '5c0b6122-726f-4ddb-9cef-ef2241507e53', 'TOLOJANAHARY', 'Modeste', '212011013026', null, '0332571312', 'Manakara', 'modestep20.aps1a@gmail.com', 'Boum boum', 'X.jpg', '$2a$10$V5decVpAs3D5lFC6Yztm8.VC/4gM9upm1fh9lenUknNCHjlcrj/t2', '2024-07-16', 2, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( '19c31c51-8982-473b-a767-9535850a8934', 'Fandreseko', 'Ismael', '222222222222', null, '0346179950', 'Andrainjato Fianarantsoa', 'fandreseko@gmail.com', 'Bonjour', 'X.jpg', '$2a$10$oiFCqWfAv6Wkf67FhzfZZ.ZKy.XW2ofwCpG8BjlkAyAYWJqvVwD9e', '2024-07-16', 3, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday ) VALUES ( 'dd592338-ca50-491e-afcf-44f563ae0d6e', 'Rael', 'Nathan', '123452123456', null, '0346712308', 'Nathan', 'ralaivoavy.natanael@gmail.com', 'admin\n', 'X.jpg', '$2a$10$SWue6oPs6Y7uxs4jvTvkSuzoABtZY/fakaH4CXMRK3.yUPwc4ax.S', '2024-07-16', 3, null, null, 2);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '5c0b6122-726f-4ddb-9cef-ef2241507e53', 16, '2024-07-16 11:53:56 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 12, '2024-07-16 11:54:11 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '19c31c51-8982-473b-a767-9535850a8934', 20, null);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 'fbfe3738-952d-4c2c-94e1-20e816c439de', 4, '2024-07-13 10:44:14 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 5, '2024-07-14 01:09:44 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 'fbfe3738-952d-4c2c-94e1-20e816c439de', 7, '2024-07-14 03:50:26 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( '933bad13-88f2-4dd9-a220-0f2bb1714af3', '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939', 8, '2024-07-14 04:14:29 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '325ab2a9-a6fd-4a5f-9408-9498bb012afe', 9, '2024-07-14 04:40:55 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '89ed4dfe-33af-438d-911f-285c85619c0a', 10, '2024-07-16 09:27:22 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', '933bad13-88f2-4dd9-a220-0f2bb1714af3', 11, '2024-07-15 09:16:16 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', '933bad13-88f2-4dd9-a220-0f2bb1714af3', 13, '2024-07-15 09:32:18 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', '89ed4dfe-33af-438d-911f-285c85619c0a', 14, '2024-07-16 09:28:08 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44', 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f', 15, '2024-07-15 10:28:37 PM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( '5c0b6122-726f-4ddb-9cef-ef2241507e53', 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 17, '2024-07-16 10:03:47 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( '19c31c51-8982-473b-a767-9535850a8934', 'f38ac467-4030-466e-b7bf-45ed41ed7ef6', 18, '2024-07-16 09:29:51 AM');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate ) VALUES ( 'dd592338-ca50-491e-afcf-44f563ae0d6e', '19c31c51-8982-473b-a767-9535850a8934', 19, '2024-07-16 09:29:26 AM');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 1, '2024-07-13 03:12:54 PM', 'F', 'Bonjour i''m a test api message', 4, 'fbfe3738-952d-4c2c-94e1-20e816c439de');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 2, '2024-07-13 03:14:22 PM', 'F', 'Bonjour i''m a test api message 2', 4, 'fbfe3738-952d-4c2c-94e1-20e816c439de');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 11, '2024-07-13 10:44:14 PM', 'F', 'Ahoana less ?', 4, 'fbfe3738-952d-4c2c-94e1-20e816c439de');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 12, '2024-07-14 01:06:13 PM', 'T', 'AHOANA Ao', 5, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 14, '2024-07-14 01:09:08 PM', 'T', 'Fa vita zany zavatra tokony ataony lahy io', 5, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 16, '2024-07-14 03:50:26 PM', 'F', 'Est ce que ca fonctionne?', 7, 'fbfe3738-952d-4c2c-94e1-20e816c439de');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 17, '2024-07-14 04:14:29 PM', 'F', 'Bonjour', 8, '08f42c03-88c7-4bcb-9b1b-fdf7b32a8939');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 18, '2024-07-14 04:40:55 PM', 'F', 'Bonjour Toi,\nEst-ce que tout roule ?', 9, '325ab2a9-a6fd-4a5f-9408-9498bb012afe');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 127, '2024-07-16 11:51:03 AM', 'T', '😍💕❤️😘o', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 97, '2024-07-16 09:22:52 AM', 'T', 'i', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 19, '2024-07-14 04:41:20 PM', 'T', 'Salut', 10, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 20, '2024-07-14 04:47:01 PM', 'T', 'Ca vas ?', 10, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 21, '2024-07-14 04:47:54 PM', 'T', 'pas du tout', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 94, '2024-07-16 09:22:33 AM', 'T', 'j', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 104, '2024-07-16 09:28:08 AM', 'T', 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 14, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 27, '2024-07-15 09:32:28 AM', 'T', 'hjhjhj', 14, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 90, '2024-07-16 09:21:32 AM', 'T', 'toslinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', 14, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 74, '2024-07-15 10:28:37 PM', 'T', 'tyug', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 71, '2024-07-15 10:22:52 PM', 'T', 'sss', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 59, '2024-07-15 10:03:59 PM', 'T', 'Blame', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 54, '2024-07-15 09:31:20 PM', 'T', 'Ah bon', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 49, '2024-07-15 09:19:17 PM', 'T', 'Tsy azoko mihintsy', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 3, '2024-07-13 04:40:18 PM', 'T', 'Bonjour i''m a test api message From john', 5, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 13, '2024-07-14 01:07:00 PM', 'T', 'Non ka tsisy olana\n', 5, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 15, '2024-07-14 01:09:44 PM', 'T', 'Kely sisa ka, tena efa kely sisa.', 5, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 29, '2024-07-15 06:16:40 PM', 'T', 'Salut', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 69, '2024-07-15 10:19:09 PM', 'T', 'ert', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 72, '2024-07-15 10:24:16 PM', 'T', 'gewge', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 57, '2024-07-15 09:53:31 PM', 'T', 'kkk', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 33, '2024-07-15 07:05:56 PM', 'T', 'fa nahoana', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 31, '2024-07-15 07:05:22 PM', 'T', 'Inona vaovao', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 28, '2024-07-15 09:59:10 AM', 'T', 'hey\n', 14, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 30, '2024-07-15 07:04:46 PM', 'T', 'Ahoana', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 63, '2024-07-15 10:08:54 PM', 'T', 'Test ihany', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 64, '2024-07-15 10:11:48 PM', 'T', 'track', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 65, '2024-07-15 10:13:02 PM', 'T', 'mety ve', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 23, '2024-07-15 09:16:03 AM', 'F', 'Oui oui', 11, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 66, '2024-07-15 10:15:05 PM', 'T', 'tak', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 24, '2024-07-15 09:16:16 AM', 'F', 'Tout vas viens', 11, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 22, '2024-07-14 05:21:27 PM', 'T', 'Cv', 11, '933bad13-88f2-4dd9-a220-0f2bb1714af3');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 26, '2024-07-15 09:32:18 AM', 'F', 'yty', 13, '933bad13-88f2-4dd9-a220-0f2bb1714af3');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 73, '2024-07-15 10:25:16 PM', 'T', 'svsvasv', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 107, '2024-07-16 09:29:26 AM', 'F', 'fuck you too', 19, 'dd592338-ca50-491e-afcf-44f563ae0d6e');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 102, '2024-07-16 09:27:56 AM', 'T', 'sjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', 14, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 99, '2024-07-16 09:27:22 AM', 'F', 'ggggggggggggggggggggggggggggggggggggggggggggggggggg', 10, '89ed4dfe-33af-438d-911f-285c85619c0a');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 110, '2024-07-16 10:15:55 AM', 'T', 'de aona lek', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 142, '2024-07-16 11:55:38 AM', 'F', 'Grand', 20, '19c31c51-8982-473b-a767-9535850a8934');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 25, '2024-07-15 09:30:31 AM', 'T', 'hano tay\n', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 103, '2024-07-16 09:27:59 AM', 'T', 'fvk ismael', 19, '19c31c51-8982-473b-a767-9535850a8934');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 84, '2024-07-16 09:16:17 AM', 'T', 'Hano tay lek', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 111, '2024-07-16 10:16:10 AM', 'T', 'vaovao nla lek', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 115, '2024-07-16 10:16:48 AM', 'T', 'ina koa ty', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 140, '2024-07-16 11:54:30 AM', 'T', 'des', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 118, '2024-07-16 11:41:57 AM', 'T', 'Mlam tsara', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 125, '2024-07-16 11:50:03 AM', 'T', 'mama', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 89, '2024-07-16 09:17:10 AM', 'T', 'hano tay', 17, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 80, '2024-07-16 09:14:00 AM', 'T', 'Vovo', 17, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 109, '2024-07-16 10:03:47 AM', 'T', 'bandy maboto ann', 17, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 100, '2024-07-16 09:27:32 AM', 'T', 'hao pory lele', 18, '19c31c51-8982-473b-a767-9535850a8934');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 86, '2024-07-16 09:16:37 AM', 'T', 'Lele', 17, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 134, '2024-07-16 11:53:05 AM', 'T', '😒😒', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 135, '2024-07-16 11:53:25 AM', 'T', '(●''◡''●)(❁´◡`❁)(❁´◡`❁)', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 141, '2024-07-16 11:54:53 AM', 'T', 'hano tay', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 116, '2024-07-16 10:17:16 AM', 'T', 'eka', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 105, '2024-07-16 09:28:28 AM', 'T', 'ismael fckb', 19, '19c31c51-8982-473b-a767-9535850a8934');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 119, '2024-07-16 11:46:17 AM', 'T', 'jjj', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 122, '2024-07-16 11:47:57 AM', 'T', 'o', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 123, '2024-07-16 11:48:25 AM', 'T', 'ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 112, '2024-07-16 10:16:25 AM', 'T', 'aiza', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 70, '2024-07-15 10:20:22 PM', 'T', 'ert', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 32, '2024-07-15 07:05:45 PM', 'T', 'Tsy azoko', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 35, '2024-07-15 07:07:28 PM', 'T', 'milay', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 39, '2024-07-15 07:37:59 PM', 'T', 'Bien', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 40, '2024-07-15 07:38:09 PM', 'T', 'Bien', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 41, '2024-07-15 07:49:30 PM', 'T', 'ret', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 68, '2024-07-15 10:16:01 PM', 'T', 'fr', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 67, '2024-07-15 10:15:15 PM', 'T', 'ss', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 61, '2024-07-15 10:05:43 PM', 'T', 'Yu', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 52, '2024-07-15 09:29:17 PM', 'T', 'cv bro', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 50, '2024-07-15 09:20:26 PM', 'T', 'Test', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 38, '2024-07-15 07:34:16 PM', 'T', 'De tena hoe zany ve', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 37, '2024-07-15 07:34:10 PM', 'T', 'De tena hoe zany ve', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 58, '2024-07-15 09:54:01 PM', 'T', 'blasfeme', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 47, '2024-07-15 09:15:47 PM', 'T', 'Mety ve', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 108, '2024-07-16 09:29:51 AM', 'T', 'hoano  fona e', 18, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 98, '2024-07-16 09:26:20 AM', 'T', 'hoano ny tay Toslin annnn', 18, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 130, '2024-07-16 11:52:25 AM', 'T', 'iiennc', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 114, '2024-07-16 10:16:41 AM', 'T', 'Httt', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 85, '2024-07-16 09:16:26 AM', 'T', 'hano ', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 83, '2024-07-16 09:16:03 AM', 'T', 'Hano tay', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 131, '2024-07-16 11:52:38 AM', 'T', 'gfhbk l', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 139, '2024-07-16 11:54:11 AM', 'T', 'ui', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 91, '2024-07-16 09:22:09 AM', 'T', 'l', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 82, '2024-07-16 09:15:56 AM', 'T', 'Hano tay lek', 17, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 120, '2024-07-16 11:46:39 AM', 'T', 'Merci tii', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 76, '2024-07-16 09:08:29 AM', 'T', 'Adolphe', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 138, '2024-07-16 11:53:56 AM', 'T', 'kndncdvm nval''vma''', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 75, '2024-07-16 09:08:15 AM', 'T', 'Tolojanahary', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 81, '2024-07-16 09:15:33 AM', 'T', 'Milamina anareo', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 136, '2024-07-16 11:53:34 AM', 'T', 'ueisoc cimcs', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 77, '2024-07-16 09:08:34 AM', 'T', 'Htree', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 129, '2024-07-16 11:52:04 AM', 'T', 'ou non', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 133, '2024-07-16 11:53:03 AM', 'T', 'hueioe jhsi', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 79, '2024-07-16 09:08:49 AM', 'T', 'bandy mileka', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 128, '2024-07-16 11:51:50 AM', 'T', 'retenu', 16, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 137, '2024-07-16 11:53:46 AM', 'T', 'nmlmcdp', 12, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 92, '2024-07-16 09:22:15 AM', 'T', 'i', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 93, '2024-07-16 09:22:27 AM', 'T', 'h', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 95, '2024-07-16 09:22:39 AM', 'T', 'j', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 96, '2024-07-16 09:22:43 AM', 'T', 'k', 10, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 55, '2024-07-15 09:41:23 PM', 'T', 'ffgdgs', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 44, '2024-07-15 08:55:58 PM', 'T', 'mande ve', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 53, '2024-07-15 09:29:34 PM', 'T', 'Ah bon', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 45, '2024-07-15 09:03:44 PM', 'T', 'Ah la la', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 48, '2024-07-15 09:18:29 PM', 'T', 'Ah lala', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 60, '2024-07-15 10:04:09 PM', 'T', 'blame', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 43, '2024-07-15 08:54:19 PM', 'T', 'Bonjour', 15, 'b6569ebc-bc8d-4afb-a0e2-f5a53ea6f04f');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 101, '2024-07-16 09:27:37 AM', 'T', 'Hano leka', 17, 'f38ac467-4030-466e-b7bf-45ed41ed7ef6');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 36, '2024-07-15 07:32:18 PM', 'T', 'mety eee', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 56, '2024-07-15 09:42:47 PM', 'T', 'tre', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 34, '2024-07-15 07:06:21 PM', 'T', 'De zay zany', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 51, '2024-07-15 09:21:35 PM', 'T', 'Krkr', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 42, '2024-07-15 07:49:41 PM', 'T', 'Ah', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 46, '2024-07-15 09:03:51 PM', 'T', 'cool', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 62, '2024-07-15 10:05:59 PM', 'T', 'yeah', 15, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 106, '2024-07-16 09:28:29 AM', 'T', 'ts mifanaraka @page lek io', 17, '5c0b6122-726f-4ddb-9cef-ef2241507e53');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 121, '2024-07-16 11:46:51 AM', 'T', 'Merci', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 78, '2024-07-16 09:08:40 AM', 'T', 'Leka', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 124, '2024-07-16 11:49:03 AM', 'T', 'ex', 16, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 117, '2024-07-16 10:17:34 AM', 'T', 'valio eee', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 126, '2024-07-16 11:50:08 AM', 'T', '😊', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 87, '2024-07-16 09:16:57 AM', 'T', 'aize ', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 88, '2024-07-16 09:16:58 AM', 'T', 'aize ', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 113, '2024-07-16 10:16:32 AM', 'T', 'ina vaovao any', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid ) VALUES ( 132, '2024-07-16 11:52:58 AM', 'T', '💕💕❤️😘😍', 12, 'f4c9d52f-79c1-4f24-ba2c-ace8d4090b44');
