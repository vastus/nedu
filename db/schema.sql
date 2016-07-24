CREATE SCHEMA IF NOT EXISTS shard_1;
DROP SEQUENCE shard_1.global_id_sequence;
CREATE SEQUENCE shard_1.global_id_sequence;

CREATE OR REPLACE FUNCTION shard_1.id_generator(OUT result bigint) AS $$
DECLARE
    our_epoch BIGINT := 1314220021721;
    seq_id BIGINT;
    now_millis BIGINT;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id INT := 1;
BEGIN
    SELECT nextval('shard_1.global_id_sequence') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;

CREATE TABLE IF NOT EXISTS shard_1.articles (
  id BIGINT PRIMARY KEY DEFAULT shard_1.id_generator(),
  title VARCHAR(127) NOT NULL DEFAULT 'Untitled',
  content TEXT NOT NULL,
  published_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,

  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
