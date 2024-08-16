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
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 3, 'PREMIUM', 365, 50000);
INSERT INTO "public".subscription( subid, label, duration, price ) VALUES ( 4, 'MEDIUM + ', 180, 40000);
INSERT INTO "public".users( userid, firstname, lastname, usercin, companynumber, phone, address, email, bio, profileimage, "password", registerdate, accountid, subid, enrdate, accessday, reset_token, reset_token_expiry, remday ) VALUES ( '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'ADOLPHE', 'Alexis', '794831738373', null, '0340854816', 'SOANIERANA', 'adalelalexis@gmail.com', 'Je suis Magic', 'default.png', '$2a$10$MjG84DPjfIXWkFQwD6oHMesaUgLrdnDY7c4me2WkuNrcFmW5i/Z7q', '2024-08-15', 2, 1, '2024-08-15', 60, null, null, 59);
INSERT INTO "public".notifications( notifid, content, notifdate, senderid, link ) VALUES ( 272, ' ADOLPHE Alexis vient de publier une Offre', '2024-08-15 08:33:44 PM', '25acb7e4-49de-4c46-8bac-08f3099f36f9', null);
INSERT INTO "public".offer( offerid, userid, title, capacity, depart, dest, scheduleddate, description, imgurl, dispo, publicationdate ) VALUES ( 79, '25acb7e4-49de-4c46-8bac-08f3099f36f9', 'Transport de marchandise', '90', 'TANA', 'FIANARA', '2024-08-17', 'fafasf avsafas avagasas', 'imgUrl-1723743224420.jpg', true, '2024-08-15 08:33:44 PM');
