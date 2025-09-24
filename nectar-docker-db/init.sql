CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS media_type (
    id BIGSERIAL PRIMARY KEY,
    type_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS tag (
    id BIGSERIAL PRIMARY KEY,
    tag_name VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
    id VARCHAR PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    role_id INTEGER NOT NULL REFERENCES role(id),
    media_type_id INTEGER NOT NULL REFERENCES media_type(id),
    body VARCHAR,
    user_id VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS post_tag (
    tag_id INTEGER REFERENCES tag(id),
    post_id VARCHAR REFERENCES post(id)
);

CREATE TABLE IF NOT EXISTS post_image (
    image_id VARCHAR,
    post_id VARCHAR REFERENCES post(id),
    CONSTRAINT post_image_pkey PRIMARY KEY(image_id, post_id)
);

INSERT INTO role (role_name) VALUES ('canvas'), ('artist'), ('shop');

INSERT INTO media_type (type_name) VALUES ('image'), ('gif'), ('video'), ('slideshow')