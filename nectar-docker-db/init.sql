CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS media_type (
    id BIGSERIAL PRIMARY KEY,
    type_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
    id VARCHAR PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    role_id INTEGER NOT NULL REFERENCES role(id),
    media_type_id INTEGER NOT NULL REFERENCES media_type(id),
    media_url VARCHAR NOT NULL,
    like_count INTEGER
);

CREATE TABLE IF NOT EXISTS post_image (
    image_id VARCHAR,
    post_id VARCHAR REFERENCES post(id),
    CONSTRAINT post_image_pkey PRIMARY KEY(image_id, post_id)
);

CREATE TABLE IF NOT EXISTS account (
    id VARCHAR PRIMARY KEY,
    username VARCHAR NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS user_post (
    post_id VARCHAR,
    user_Id VARCHAR
);

CREATE TABLE IF NOT EXISTS post_like (
    post_id VARCHAR,
    user_Id VARCHAR
);

ALTER TABLE user_post ADD CONSTRAINT "user_post_pkey" PRIMARY KEY (post_id, user_id);
ALTER TABLE post_like ADD CONSTRAINT "post_like_pkey" PRIMARY KEY (post_id, user_id);

INSERT INTO role (role_name) VALUES ('canvas'), ('artist'), ('shop');

INSERT INTO media_type (type_name) VALUES ('image'), ('gif'), ('video'), ('slideshow')