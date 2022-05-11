//const pool = require('../utils/pool');
const fetchFromYoutube = require('../../utils/fetchFromYoutube');
const pool = require('../../utils/pool');
//const setupScript = require('../../data/setup.sql')

module.exports = class UnprocessedVideos {
    videoId;
    publishedAt;
    title;
    description;
    thumbnailsUrl;
    channelTitle;

    constructor(row) {
        this.videoId = row.videoId;
        this.publishedAt = row.publishedAt;
        this.title = row.title;
        this.description = row.description;
        this.thumbnailUrl = row.thumbnailUrl;
        this.channelTitle = row.channelTitle;
    }

    static async setupTables() {
        try {
            pool.query(`DROP TABLE IF EXISTS unprocessedVideos;

            CREAT TABLE unprocessed_videos(
                id BIGINT GENERATED ALWAYS AS IDENTITY,
                video_id TEXT NOT NULL,
                published_at TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                thumbnail_url TEXT NOT NULL,
                processed BOOLEAN NOT NULL,
                channel_title TEXT NOT NULL
            )`)
        }
        catch (e) {
            console.log(e);
        }
    }

    static async fetchAllFromAPI() {
        let nextPageToken = null;
        let results = null;
        let videoArray = [];
        let counter = 0;

        do {
            results = await fetchFromYoutube(nextPageToken);
            videoArray = [...videoArray, ...results.items];
            nextPageToken = results.nextPageToken;
            console.log("nextPageToken: ", nextPageToken);
            counter++;
        } while (nextPageToken && counter < 2)

        console.log("videoArray.length", videoArray.length)
        videoArray.forEach(({ snippet }) => {
            const { publishedAt, title, description, thumbnails, channelTitle, resourceId } = snippet;

            // pool.query(`
            // INSERT INTO unprocessed_videos
            // (
            //     video_id, 
            //     title, 
            //     published_at,
            //     title,
            //     description, 
            //     thumbnail_url, 
            //     processed,
            //     channel_title
            //     )
            //     VALUES
            //     ($1, $2, $3, $4, $5, $6, $7, $8)
            //     WHERE NOT EXISTS (SELECT video_id FROM unprocessed_videos WHERE video_id = $1)`,
            //     [
            //         resourceId.videoId,
            //         publishedAt,
            //         title,
            //         description,
            //         thumbnails.standard.url,
            //         false,
            //         channelTitle
            //     ]
            // )
        })

    }

}