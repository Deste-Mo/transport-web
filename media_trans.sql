CREATE SCHEMA IF NOT EXISTS "public";

CREATE EXTENSION "uuid-ossp";

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

CREATE TYPE accounttype AS ENUM ('Entreprise','Client','Camionneur');

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
	reset_token          varchar(255)    ,
	reset_token_expiry  timestamp    ,
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
	CONSTRAINT follow_followeeid_fkey FOREIGN KEY ( followeeid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT follow_followerid_fkey FOREIGN KEY ( followerid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".message ( 
	messageid            serial  NOT NULL  ,
	sentdate             timestamp DEFAULT CURRENT_TIMESTAMP   ,
	viewed               char(1) DEFAULT 'F'::bpchar   ,
	content              text    ,
	idconversation       bigint    ,
	receiverid           uuid    ,
	refmessage           text    ,
	filecontent          text    ,
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
	CONSTRAINT offer_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
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
	CONSTRAINT report_reportedid_fkey FOREIGN KEY ( reportedid ) REFERENCES "public".users( userid )   ,
	CONSTRAINT report_reporterid_fkey FOREIGN KEY ( reporterid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
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
AS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v1mc()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v3(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v5(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$
;

CREATE OR REPLACE FUNCTION public.uuid_nil()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_nil$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_dns()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_oid()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_url()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_url$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_x500()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$
;

INSERT INTO "public".account( accountid, accounttype ) VALUES ( 1, 'Entreprise');
INSERT INTO "public".account( accountid, accounttype ) VALUES ( 2, 'Camionneur');
INSERT INTO "public".account( accountid, accounttype ) VALUES ( 3, 'Client');
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry ) VALUES ( '7a0a7942-7921-4399-ac4c-8d3377556b96', 'ADOLPHE', 'Alexis', '783921343234', null, '0340854816', 'SOANIERANA', 'alexis@gmail.com', 'Magic JOHNSON', 'default.png', '$2a$10$38iBXDktXIWVtMU6aGwCD.aDXfiITY678PtBhQz8pOb02HVFKJZFO', '2024-08-08', 3, null, null, 2, null, null);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry ) VALUES ( '03a2bf26-9b69-494f-b238-44844dc9643d', 'Rrrrrrr', 'Rrrrrrr', '243421216526', null, '0345555555', 'Tetete', 'rr@gmail.com', 'Hdhdhdhd', 'default.png', '$2a$10$Owa4eiv4GTXeNb0lkV3eIO1CcgcQYhRgoEYYQMsIgF6lpI06ZckUS', '2024-08-08', 2, null, null, 2, null, null);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry ) VALUES ( 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 'Razafitsotra', 'Toslin', '201011032461', null, '0380525383', 'Ampitakely', 'razafitosy@gmail.com', 'No coding No life', 'default.png', '$2a$10$9ykKSXuIXyqFBTi04pz4POuhQsPkL31FaBW7E68tbuuNI2MzvDTJO', '2024-08-08', 3, null, null, 2, null, null);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry ) VALUES ( 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 'SCORE', '', 'null', '773432334', '0347828618', 'ANTSIRANANA Namakia', 'score@gmail.com', 'SUPERMARCHE RENOMMEE', 'profileimage-1723236027346.jpg', '$2a$10$0uNknh2mBFgEisM74RofVeG2mJAzC3.LTYIIXjD4FMUopEsIXik3K', '2024-08-09', 1, null, null, 2, null, null);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( '03a2bf26-9b69-494f-b238-44844dc9643d', '7a0a7942-7921-4399-ac4c-8d3377556b96', 36, '2024-08-09 07:28:02 PM', 'Ah bon', '7a0a7942-7921-4399-ac4c-8d3377556b96');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '7a0a7942-7921-4399-ac4c-8d3377556b96', 38, '2024-08-12 03:23:27 PM', 'Ok', '7a0a7942-7921-4399-ac4c-8d3377556b96');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 315, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', '2024-08-09');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 316, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '7a0a7942-7921-4399-ac4c-8d3377556b96', '2024-08-10');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 317, '7a0a7942-7921-4399-ac4c-8d3377556b96', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '2024-08-12');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 289, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', '7a0a7942-7921-4399-ac4c-8d3377556b96', '2024-08-08');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 305, '7a0a7942-7921-4399-ac4c-8d3377556b96', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', '2024-08-09');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 306, '7a0a7942-7921-4399-ac4c-8d3377556b96', '03a2bf26-9b69-494f-b238-44844dc9643d', '2024-08-09');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 444, '2024-08-09 07:28:02 PM', 'F', 'Ah bon', 36, '03a2bf26-9b69-494f-b238-44844dc9643d', '', null);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 441, '2024-08-08 09:46:44 PM', 'T', 'ssjsj', 36, '7a0a7942-7921-4399-ac4c-8d3377556b96', '', null);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 446, '2024-08-09 10:44:50 PM', 'T', 'Ah bon', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 'Interessant', null);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 448, '2024-08-09 11:27:37 PM', 'T', '', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 'Interessant', 'fileContent-1723235257160.jpg');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 450, '2024-08-12 03:16:30 PM', 'T', 'Bonjour', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '', null);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 445, '2024-08-09 10:18:21 PM', 'T', 'Interessant', 38, '7a0a7942-7921-4399-ac4c-8d3377556b96', '', 'fileContent-1723231101553.png');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 447, '2024-08-09 11:26:46 PM', 'T', '', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '', 'fileContent-1723235206134.jpg');
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 449, '2024-08-10 12:07:11 AM', 'T', 'okay', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', '', null);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent ) VALUES ( 451, '2024-08-12 03:23:27 PM', 'T', 'Ok', 38, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 'Interessant', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 146, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 07:56:04 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 148, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:04:14 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 149, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:04:23 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 150, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:07:30 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 151, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:07:44 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 152, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:08:11 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 153, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:08:23 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 154, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:10:49 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 155, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:11:05 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 156, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:13:13 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 157, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 08:14:08 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 160, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-08 08:15:39 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 161, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:19:16 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 162, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:20:20 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 163, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:20:24 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 164, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:21:25 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 165, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:22:00 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 167, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:27:15 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 168, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:27:29 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 171, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:27:53 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 172, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 08:28:21 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 176, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-08 08:30:39 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 202, 'Rrrrrrr Rrrrrrr Vous suit desormais.', '2024-08-08 09:22:39 PM', '03a2bf26-9b69-494f-b238-44844dc9643d', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 207, 'Rrrrrrr Rrrrrrr Vous suit desormais.', '2024-08-08 09:24:51 PM', '03a2bf26-9b69-494f-b238-44844dc9643d', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 208, 'Rrrrrrr Rrrrrrr Vous suit desormais.', '2024-08-08 09:25:26 PM', '03a2bf26-9b69-494f-b238-44844dc9643d', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 215, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 10:10:30 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 216, 'Razafitsotra Toslin Vous suit desormais.', '2024-08-08 10:10:31 PM', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 217, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-08 10:10:58 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 218, ' Razafitsotra Toslin vient de publier une Offre', '2024-08-08 10:11:42 PM', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 219, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-08 10:12:36 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 220, ' Razafitsotra Toslin a modifié sa publication d''offre', '2024-08-08 10:49:50 PM', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', '75');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 221, ' Razafitsotra Toslin vient de publier une Offre', '2024-08-08 10:51:43 PM', 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 222, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-09 07:28:32 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 223, 'SCORE Vous suit desormais.', '2024-08-09 08:48:32 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 224, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-09 08:49:39 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', '62');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 225, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-09 08:50:22 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', '63');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 226, 'SCORE Vous suit desormais.', '2024-08-09 09:35:13 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 227, 'SCORE Vous suit desormais.', '2024-08-09 10:17:28 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 228, 'SCORE Vous suit desormais.', '2024-08-09 10:18:33 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 229, 'SCORE Vous suit desormais.', '2024-08-09 10:18:49 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 230, 'SCORE Vous suit desormais.', '2024-08-09 10:18:58 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 231, 'SCORE Vous suit desormais.', '2024-08-09 10:19:03 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 232, 'SCORE Vous suit desormais.', '2024-08-09 10:22:01 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 233, 'SCORE Vous suit desormais.', '2024-08-09 10:25:46 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 234, 'SCORE Vous suit desormais.', '2024-08-09 10:42:39 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 235, 'SCORE Vous suit desormais.', '2024-08-09 10:42:54 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 236, 'SCORE Vous suit desormais.', '2024-08-09 10:43:27 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 237, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-09 10:44:03 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 238, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-09 10:44:05 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 239, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-09 10:44:05 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 240, 'SCORE Vous suit desormais.', '2024-08-09 11:28:21 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 241, 'SCORE Vous suit desormais.', '2024-08-09 11:28:40 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 242, 'SCORE Vous suit desormais.', '2024-08-09 11:29:57 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 243, 'SCORE Vous suit desormais.', '2024-08-09 11:35:57 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 244, 'SCORE Vous suit desormais.', '2024-08-09 11:35:59 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 245, 'SCORE Vous suit desormais.', '2024-08-09 11:39:45 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 246, 'SCORE Vous suit desormais.', '2024-08-09 11:39:57 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 247, 'SCORE Vous suit desormais.', '2024-08-09 11:40:05 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 248, 'SCORE null Vous suit desormais.', '2024-08-09 11:49:03 PM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 249, 'SCORE Vous suit desormais.', '2024-08-10 12:26:49 AM', 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 250, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-12 03:25:15 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 251, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-12 03:29:56 PM', '7a0a7942-7921-4399-ac4c-8d3377556b96', null);
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 75, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 'Transport de marchandise', '50kg', 'sssssss', 'sss', '2024-08-17', 'vvvvv', 'imgUrl-1723144300689.png', true, '2024-08-08 10:11:42 PM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 76, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 'Transport de marchandise', '50kg', 'vbv', 'bvbv', '2024-08-22', 'nnbnbnb', 'imgUrl-1723146702434.png', true, '2024-08-08 10:51:43 PM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 62, '7a0a7942-7921-4399-ac4c-8d3377556b96', 'Marchandise à transporter', '56 kg', 'Tana', 'Fianara', '2024-08-18', 'csdcdca', 'imgUrl-1723137339500.jpg', true, '2024-08-08 08:15:39 PM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 77, '7a0a7942-7921-4399-ac4c-8d3377556b96', 'Transport de marchandise', '45 kg', 'Tana', 'DS', '2024-08-15', 'dghapdh ophjccs', 'imgUrl-1723465796114.jpg', true, '2024-08-12 03:29:56 PM');
INSERT INTO "public".saveoffer( saveid, offerid, userid, savedate ) VALUES ( 36, 75, '7a0a7942-7921-4399-ac4c-8d3377556b96', '2024-08-09 10:45:08 PM');
INSERT INTO "public".saveoffer( saveid, offerid, userid, savedate ) VALUES ( 37, 76, '7a0a7942-7921-4399-ac4c-8d3377556b96', '2024-08-12 03:18:06 PM');
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 247, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 225, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 245, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 224, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 254, '7a0a7942-7921-4399-ac4c-8d3377556b96', 232, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 244, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 224, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 246, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 225, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 260, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 238, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 261, '03a2bf26-9b69-494f-b238-44844dc9643d', 239, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 239, '03a2bf26-9b69-494f-b238-44844dc9643d', 219, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 259, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 237, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 262, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 240, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 263, '03a2bf26-9b69-494f-b238-44844dc9643d', 241, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 264, '03a2bf26-9b69-494f-b238-44844dc9643d', 242, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 265, '03a2bf26-9b69-494f-b238-44844dc9643d', 243, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 266, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 244, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 267, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 245, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 268, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 246, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 237, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 217, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 270, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 248, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 271, '7a0a7942-7921-4399-ac4c-8d3377556b96', 249, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 274, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 251, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 273, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 251, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 272, 'f914cab3-d2f0-4de9-a0b3-b1e3970d2073', 250, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 242, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 222, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 248, 'aa50cdf5-1016-461f-a276-1c3fee6b0c48', 226, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 249, '03a2bf26-9b69-494f-b238-44844dc9643d', 227, false);