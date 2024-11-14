CREATE SCHEMA IF NOT EXISTS "public";

CREATE SEQUENCE "public".account_accountid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".account_accountid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".conversation_idconversation_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".conversation_idconversation_seq1 START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".follow_followid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".follow_followid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".message_messageid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".message_messageid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".notification_notifid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".offer_offerid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".offer_offerid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".rating_ratingid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".report_reportid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".saveoffer_saveid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".saveoffer_saveid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".sendnotification_sendnotifid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".sendnotification_sendnotifid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".subscription_subid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".subscription_subid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".vehicle_vehicleid_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".vehicle_vehicleid_seq1 AS integer START WITH 1 INCREMENT BY 1;

CREATE TYPE accounttype AS ENUM ('Entreprise','Client','Camionneur');

CREATE  TABLE "public".account ( 
	accountid            integer DEFAULT nextval('account_accountid_seq1'::regclass) NOT NULL  ,
	accounttype          varchar(50)  NOT NULL  ,
	CONSTRAINT account_pkey PRIMARY KEY ( accountid )
 );

CREATE  TABLE "public".subscription ( 
	subid                integer DEFAULT nextval('subscription_subid_seq1'::regclass) NOT NULL  ,
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
	CONSTRAINT unique_users UNIQUE ( usercin, companynumber, email, phone ) ,
	CONSTRAINT users_accountid_fkey FOREIGN KEY ( accountid ) REFERENCES "public".account( accountid )   ,
	CONSTRAINT users_subid_fkey FOREIGN KEY ( subid ) REFERENCES "public".subscription( subid )   
 );

CREATE  TABLE "public".vehicle ( 
	vehicleid            integer DEFAULT nextval('vehicle_vehicleid_seq1'::regclass) NOT NULL  ,
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
	idconversation       bigint DEFAULT nextval('conversation_idconversation_seq1'::regclass) NOT NULL  ,
	lastupdate           timestamp    ,
	lastmessage          text DEFAULT 'Hi'::text   ,
	lastsender           uuid    ,
	CONSTRAINT pk_conversation PRIMARY KEY ( idconversation ),
	CONSTRAINT fk_conversation_users FOREIGN KEY ( idsender ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_conversation_users_0 FOREIGN KEY ( idreceiver ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".follow ( 
	followid             integer DEFAULT nextval('follow_followid_seq1'::regclass) NOT NULL  ,
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
	offerid              integer DEFAULT nextval('offer_offerid_seq1'::regclass) NOT NULL  ,
	userid               uuid  NOT NULL  ,
	title                varchar(100)  NOT NULL  ,
	capacity             varchar(20)  NOT NULL  ,
	depart               varchar(100)  NOT NULL  ,
	dest                 varchar(100)  NOT NULL  ,
	scheduleddate        date  NOT NULL  ,
	description          text  NOT NULL  ,
	imgurl               text    ,
	dispo                boolean DEFAULT true   ,
	publicationdate      timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT offer_pkey PRIMARY KEY ( offerid ),
	CONSTRAINT offer_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".saveoffer ( 
	saveid               integer DEFAULT nextval('saveoffer_saveid_seq1'::regclass) NOT NULL  ,
	offerid              integer  NOT NULL  ,
	userid               uuid  NOT NULL  ,
	savedate             timestamp DEFAULT CURRENT_TIMESTAMP   ,
	CONSTRAINT saveoffer_pkey PRIMARY KEY ( saveid ),
	CONSTRAINT saveoffer_offerid_fkey FOREIGN KEY ( offerid ) REFERENCES "public".offer( offerid )   ,
	CONSTRAINT saveoffer_userid_fkey FOREIGN KEY ( userid ) REFERENCES "public".users( userid )   
 );

CREATE  TABLE "public".sendnotification ( 
	sendnotifid          integer DEFAULT nextval('sendnotification_sendnotifid_seq1'::regclass) NOT NULL  ,
	userid               uuid    ,
	notifid              integer    ,
	viewed               boolean DEFAULT false   ,
	CONSTRAINT pk_sendnotification PRIMARY KEY ( sendnotifid ),
	CONSTRAINT fk_sendnotification_notifications FOREIGN KEY ( notifid ) REFERENCES "public".notifications( notifid ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_sendnotification_users FOREIGN KEY ( userid ) REFERENCES "public".users( userid ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".message ( 
	messageid            integer DEFAULT nextval('message_messageid_seq1'::regclass) NOT NULL  ,
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
	bysender             integer DEFAULT 0   ,
	byreceiver           integer DEFAULT 0   ,
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

