BEGIN TRANSACTION;

-- email: test@0721.com, password:123
INSERT INTO users (name, email, entries, joined ) values ('test-docker-0721', 'test@0721.com', 5, '2020-07-21');
INSERT INTO login (hash, email ) values ('$2a$10$KqWcUNkhvZXYQcxcbSxhCeyTFA.s0/fHR2xXhsi58//jmWvPqGA8W', 'test@0721.com');

COMMIT;