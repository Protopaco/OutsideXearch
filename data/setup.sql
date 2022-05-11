DROP TABLE IF EXISTS unprocessedVideos;

CREAT TABLE unprocessed_videos (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    video_id TEXT NOT NULL,
    published_at TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    processed BOOLEAN NOT NULL,
    channel_title TEXT NOT NULL
)