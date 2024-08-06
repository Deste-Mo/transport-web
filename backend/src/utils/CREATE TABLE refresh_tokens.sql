-- CREATE TABLE refresh_tokens (
--     token uuid NOT NULL DEFAULT uuid_generate_v4(),
--     userid uuid NOT NULL,
--     expires_at DATE NOT NULL DEFAULT CURRENT_DATE,

--     CONSTRAINT refresh_users_fkey FOREIGN KEY (userid)
--         REFERENCES public.users (userid) MATCH SIMPLE
--         ON UPDATE NO ACTION
--         ON DELETE CASCADE
-- )

-- SELECT * FROM refresh_tokens;

-- DELETE from users;

SELECT * FROM users;