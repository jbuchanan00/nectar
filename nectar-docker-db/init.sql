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

CREATE TABLE IF NOT EXISTS instagram_post (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  user_id VARCHAR NOT NULL,
  media_type TEXT NOT NULL,
  permalink TEXT NOT NULL,
  caption TEXT,
  view_count INTEGER
)

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

INSERT INTO media_type (type_name) VALUES ('image'), ('gif'), ('video'), ('slideshow');

-- Tags
INSERT INTO tag (tag_name, created_at) VALUES
  ('blackwork', NOW()),
  ('traditional', NOW()),
  ('geometric', NOW()),
  ('portrait', NOW()),
  ('minimalist', NOW());

-- Posts (all using image or gif media types)
INSERT INTO post (id, created_at, updated_at, role_id, media_type_id, body, user_id) VALUES
  ('11111111-1111-1111-1111-111111111111', NOW(), NOW(), 2, 1, 'Bold blackwork sleeve design', 'user-1'),
  ('22222222-2222-2222-2222-222222222222', NOW(), NOW(), 2, 2, 'Animated gif preview of geometric pattern', 'user-2'),
  ('33333333-3333-3333-3333-333333333333', NOW(), NOW(), 3, 1, 'Shop promotion with a portrait piece', 'user-3'),
  ('44444444-4444-4444-4444-444444444444', NOW(), NOW(), 1, 1, 'Minimalist linework example', 'user-4');

-- Post to Tags
INSERT INTO post_tag (tag_id, post_id) VALUES
  (1, '11111111-1111-1111-1111-111111111111'),
  (3, '22222222-2222-2222-2222-222222222222'),
  (4, '33333333-3333-3333-3333-333333333333'),
  (5, '44444444-4444-4444-4444-444444444444');

-- Post images (image_id = post_id for now)
INSERT INTO post_image (image_id, post_id) VALUES
  ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
  ('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222'),
  ('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333'),
  ('44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444');
