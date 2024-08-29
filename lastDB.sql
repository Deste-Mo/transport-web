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
	enrdate              date DEFAULT CURRENT_DATE   ,
	accessday            integer DEFAULT 2   ,
	reset_token          varchar(255)    ,
	reset_token_expiry   timestamp    ,
	remday               integer DEFAULT 2   ,
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

CREATE  TABLE "public".message ( 
	messageid            serial  NOT NULL  ,
	sentdate             timestamp DEFAULT CURRENT_TIMESTAMP   ,
	viewed               char(1) DEFAULT 'F'::bpchar   ,
	content              text    ,
	idconversation       bigint    ,
	receiverid           uuid    ,
	refmessage           text    ,
	filecontent          text    ,
	isoffer              boolean DEFAULT false   ,
	offerid              integer    ,
	delmessage           varchar(100)    ,
	byme                 boolean DEFAULT false   ,
	CONSTRAINT message_pkey PRIMARY KEY ( messageid ),
	CONSTRAINT fk_message_conversation FOREIGN KEY ( idconversation ) REFERENCES "public".conversation( idconversation ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_message_users FOREIGN KEY ( receiverid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_message_offer FOREIGN KEY ( offerid ) REFERENCES "public".offer( offerid ) ON DELETE CASCADE ON UPDATE CASCADE 
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
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 1, 'LIGHT', 30, 5000);
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 2, 'MEDIUM', 90, 20000);
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 3, 'MEDIUM +', 180, 40000);
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 4, 'PREMIUM', 360, 50000);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry, remday ) VALUES ( 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 'RAHARISOA', 'Haingonirina', '147852369547', null, '0345393880', 'Fianarantsoa', 'haingonirina301@gmail.com', 'chargueur', 'default.png', '$2a$10$3OHy8fYwh2VLf89ojnPLKuwNlWYbZsk6C4gLcsdHxt9FlTh8z5Mhu', '2024-08-16', 2, null, '2024-08-16', 0, null, null, 0);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry, remday ) VALUES ( 'c8033881-cc56-4ba4-be81-0322594d33ac', 'Nathan', 'Blast', '123452145678', null, '0388732917', 'Admindd', 'ralaivoavy.natanael@gmail.com', '', 'default.png', '$2a$10$gIct6fEJAn7D8hym4Upgq.MIrM0qEx0B8HqRZ72HK7kTbVatqyYpy', '2024-08-16', 3, null, '2024-08-16', 2, null, null, 2);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry, remday ) VALUES ( '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'ADOLPHE', 'Alexis', '794831738373', 'null', '0340854816', 'SOANIERANA', 'adalelalexis@gmail.com', 'Je suis Magic', 'profileimage-1724744503486.jpg', '$2a$10$MjG84DPjfIXWkFQwD6oHMesaUgLrdnDY7c4me2WkuNrcFmW5i/Z7q', '2024-08-15', 2, 1, '2024-08-15', 60, 'a8c22b3b1276aa1e9ee5864cff655b5fb079f8cf34584a7ab51622a698cf7b39', '2024-08-16 09:32:47 AM', 47);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry, remday ) VALUES ( 'f6b50ef4-283b-4703-8944-1a4416aab901', 'Miarantsoa', 'Tollard', '201011032121', null, '0322223232', 'Ankofafalahy', 'miarantsoa@gmail.com', 'Livreur', 'default.png', '$2a$10$u65JHP5ugqsFVGe61222qeYvfLz.EOgQQDf2z7gveiRMS4uaudNyO', '2024-08-16', 2, null, '2024-08-16', 2, null, null, 2);
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 'c8033881-cc56-4ba4-be81-0322594d33ac', 45, '2024-08-16 09:35:54 AM', 'test', 'bf4d168d-9572-4708-9b73-62cfd5999f0f');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'f6b50ef4-283b-4703-8944-1a4416aab901', 'c8033881-cc56-4ba4-be81-0322594d33ac', 46, '2024-08-16 09:36:11 AM', 'Ndjdj', 'f6b50ef4-283b-4703-8944-1a4416aab901');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'c8033881-cc56-4ba4-be81-0322594d33ac', '25acb7e4-49de-4c46-8bac-08f3099f36f9', 43, '2024-08-27 12:34:28 PM', '<script>alert("Bonjour")</script>', '25acb7e4-49de-4c46-8bac-08f3099f36f9');
INSERT INTO "public".conversation( idsender, idreceiver, idconversation, lastupdate, lastmessage, lastsender ) VALUES ( 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '25acb7e4-49de-4c46-8bac-08f3099f36f9', 44, '2024-08-28 12:00:55 PM', 'Message supprimé', 'bf4d168d-9572-4708-9b73-62cfd5999f0f');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 337, 'c8033881-cc56-4ba4-be81-0322594d33ac', '25acb7e4-49de-4c46-8bac-08f3099f36f9', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 338, 'c8033881-cc56-4ba4-be81-0322594d33ac', 'f6b50ef4-283b-4703-8944-1a4416aab901', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 339, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '25acb7e4-49de-4c46-8bac-08f3099f36f9', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 341, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 'c8033881-cc56-4ba4-be81-0322594d33ac', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 342, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 'c8033881-cc56-4ba4-be81-0322594d33ac', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 343, 'f6b50ef4-283b-4703-8944-1a4416aab901', 'c8033881-cc56-4ba4-be81-0322594d33ac', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 344, 'c8033881-cc56-4ba4-be81-0322594d33ac', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 345, 'f6b50ef4-283b-4703-8944-1a4416aab901', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 346, 'f6b50ef4-283b-4703-8944-1a4416aab901', '25acb7e4-49de-4c46-8bac-08f3099f36f9', '2024-08-16');
INSERT INTO "public".follow( followid, followerid, followeeid, followdate ) VALUES ( 349, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'c8033881-cc56-4ba4-be81-0322594d33ac', '2024-08-27');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 272, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-15 08:33:44 PM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 273, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-16 09:30:42 AM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 274, 'Nathan Blast Vous suit desormais.', '2024-08-16 09:30:55 AM', 'c8033881-cc56-4ba4-be81-0322594d33ac', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 275, 'Nathan Blast Vous suit desormais.', '2024-08-16 09:30:57 AM', 'c8033881-cc56-4ba4-be81-0322594d33ac', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 276, ' Miarantsoa Tollard vient de publier une Offre', '2024-08-16 09:31:43 AM', 'f6b50ef4-283b-4703-8944-1a4416aab901', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 277, ' RAHARISOA Haingonirina vient de publier une Offre', '2024-08-16 09:33:47 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 278, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-08-16 09:34:19 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 279, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-08-16 09:34:24 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 280, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-08-16 09:34:26 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 281, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-08-16 09:34:29 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 282, 'Miarantsoa Tollard Vous suit desormais.', '2024-08-16 09:35:53 AM', 'f6b50ef4-283b-4703-8944-1a4416aab901', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 283, 'Nathan Blast Vous suit desormais.', '2024-08-16 09:39:39 AM', 'c8033881-cc56-4ba4-be81-0322594d33ac', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 284, 'Miarantsoa Tollard Vous suit desormais.', '2024-08-16 09:40:20 AM', 'f6b50ef4-283b-4703-8944-1a4416aab901', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 285, 'Miarantsoa Tollard Vous suit desormais.', '2024-08-16 09:40:27 AM', 'f6b50ef4-283b-4703-8944-1a4416aab901', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 286, ' Nathan Blast vient de publier une Offre', '2024-08-16 09:40:29 AM', 'c8033881-cc56-4ba4-be81-0322594d33ac', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 287, ' RAHARISOA Haingonirina vient de publier une Offre', '2024-08-16 10:18:47 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 288, ' RAHARISOA Haingonirina vient de publier une Offre', '2024-08-16 10:20:18 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 289, 'RAHARISOA Haingonirina Vous suit desormais.', '2024-08-16 10:33:47 AM', 'bf4d168d-9572-4708-9b73-62cfd5999f0f', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 290, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-18 06:42:31 PM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 291, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-25 04:38:20 PM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 292, ' ADOLPHE Alexis a modifié sa publication d''offre', '2024-08-27 10:42:52 AM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', '79');
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 293, 'ADOLPHE Alexis Vous suit desormais.', '2024-08-27 12:28:21 PM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 80, 'f6b50ef4-283b-4703-8944-1a4416aab901', 'Transport de marchandise', '50', 'dwdwdw', 'dwdwdw', '2024-08-21', 'wwdwdw', 'imgUrl-1723789902760.jpg', true, '2024-08-16 09:31:43 AM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 82, 'c8033881-cc56-4ba4-be81-0322594d33ac', 'Transport de marchandise', '12', 'Tana', 'Fianar', '2024-08-16', 'Test', 'imgUrl-1723790427450.jpeg', true, '2024-08-16 09:40:28 AM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 79, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'Transport de marchandise', '90', 'TANA', 'FIANARA', '2024-08-29', 'fafasf avsafas avagasas', 'imgUrl-1723743224420.jpg', true, '2024-08-15 08:33:44 PM');
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 85, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'Transport de marchandise', '87', 'gjv ', 'kfhkgkg', '2024-08-23', 'hfhkfk', 'imgUrl-1724593100335.png', true, '2024-08-25 04:38:20 PM');
INSERT INTO "public".saveoffer( saveid, offerid, userid, savedate ) VALUES ( 48, 79, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '2024-08-16 09:34:47 AM');
INSERT INTO "public".saveoffer( saveid, offerid, userid, savedate ) VALUES ( 50, 82, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '2024-08-16 10:22:06 AM');
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 298, 'f6b50ef4-283b-4703-8944-1a4416aab901', 275, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 302, 'f6b50ef4-283b-4703-8944-1a4416aab901', 279, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 311, 'f6b50ef4-283b-4703-8944-1a4416aab901', 286, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 305, 'c8033881-cc56-4ba4-be81-0322594d33ac', 282, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 304, 'c8033881-cc56-4ba4-be81-0322594d33ac', 281, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 300, 'c8033881-cc56-4ba4-be81-0322594d33ac', 276, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 303, 'c8033881-cc56-4ba4-be81-0322594d33ac', 280, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 308, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 285, true);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 312, 'c8033881-cc56-4ba4-be81-0322594d33ac', 287, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 313, 'f6b50ef4-283b-4703-8944-1a4416aab901', 287, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 314, 'c8033881-cc56-4ba4-be81-0322594d33ac', 288, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 315, 'f6b50ef4-283b-4703-8944-1a4416aab901', 288, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 316, 'f6b50ef4-283b-4703-8944-1a4416aab901', 289, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 317, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 290, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 318, 'c8033881-cc56-4ba4-be81-0322594d33ac', 291, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 319, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 291, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 320, 'f6b50ef4-283b-4703-8944-1a4416aab901', 291, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 321, 'c8033881-cc56-4ba4-be81-0322594d33ac', 292, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 322, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', 292, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 323, 'f6b50ef4-283b-4703-8944-1a4416aab901', 292, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 324, 'c8033881-cc56-4ba4-be81-0322594d33ac', 293, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 296, 'f6b50ef4-283b-4703-8944-1a4416aab901', 273, false);
INSERT INTO "public".sendnotification( sendnotifid, userid, notifid, viewed ) VALUES ( 297, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 274, true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 588, '2024-08-16 09:35:54 AM', 'T', 'test', 45, 'c8033881-cc56-4ba4-be81-0322594d33ac', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 596, '2024-08-28 11:28:55 AM', 'T', 'bdbfb', 44, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '', null, false, null, 'Message supprimé', false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 589, '2024-08-16 09:36:11 AM', 'T', 'Ndjdj', 46, 'c8033881-cc56-4ba4-be81-0322594d33ac', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 597, '2024-08-28 11:32:19 AM', 'T', 'bdfbdb', 44, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 598, '2024-08-28 11:32:21 AM', 'T', 'bdfbd', 44, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '', null, false, null, 'Message supprimé', true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 606, '2024-08-28 12:00:50 PM', 'T', 'Bonjour', 44, 'bf4d168d-9572-4708-9b73-62cfd5999f0f', '', null, false, null, 'Message supprimé', false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 591, '2024-08-19 03:12:42 AM', 'F', 'Eoah', 43, 'c8033881-cc56-4ba4-be81-0322594d33ac', 'Mandeh ?', 'fileContent-1724026362440.jpg', false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 593, '2024-08-25 04:38:49 PM', 'F', '', 43, 'c8033881-cc56-4ba4-be81-0322594d33ac', '', 'fileContent-1724593129913.png', false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 594, '2024-08-27 12:34:03 PM', 'F', 'n;n;nv;dsvn ndovd', 43, 'c8033881-cc56-4ba4-be81-0322594d33ac', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 595, '2024-08-27 12:34:28 PM', 'F', '<script>alert("Bonjour")</script>', 43, 'c8033881-cc56-4ba4-be81-0322594d33ac', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 605, '2024-08-28 11:51:11 AM', 'T', 'hhehe', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, 'Message supprimé', true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 587, '2024-08-16 09:35:44 AM', 'T', 'test', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, 'Message supprimé', true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 599, '2024-08-28 11:32:26 AM', 'T', 'bdfbdfb', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 601, '2024-08-28 11:33:29 AM', 'T', '', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', 'fileContent-1724834009047.png', false, null, 'Message supprimé', true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 585, '2024-08-16 09:31:05 AM', 'T', 'Mandeh ?', 43, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, 'Message supprimé', true);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 600, '2024-08-28 11:32:28 AM', 'T', 'bdfb', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, 'Message supprimé', false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 602, '2024-08-28 11:50:31 AM', 'T', 'sdbsbsb', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 603, '2024-08-28 11:50:46 AM', 'T', 'vsdvsdv', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 604, '2024-08-28 11:50:57 AM', 'T', 'vsdvsd', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, null, false);
INSERT INTO "public".message( messageid, sentdate, viewed, content, idconversation, receiverid, refmessage, filecontent, isoffer, offerid, delmessage, byme ) VALUES ( 607, '2024-08-28 12:00:55 PM', 'T', 'Au revoir', 44, '25acb7e4-49de-4c46-8bac-08f3099f36f9', '', null, false, null, 'Message supprimé', true);
