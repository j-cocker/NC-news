const request = require("supertest");
const endpointsJson = require("../endpoints.json");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

/* Set up your test imports here */

beforeEach(() => {
    return seed(data);
});
afterAll(() => {
    return db.end();
});

describe("CORE: endpoints", () => {
    describe("GET /api", () => {
        test("200: Responds with an object detailing the documentation for each endpoint", () => {
            return request(app)
                .get("/api")
                .expect(200)
                .then(({ body: { endpoints } }) => {
                    expect(endpoints).toEqual(endpointsJson);
                });
        });
    });
    describe("GET /api/topics", () => {
        test("200: Responds with an object with key value 'topics' containing array of all topics", () => {
            return request(app)
                .get("/api/topics")
                .expect(200)
                .then(({ body: { topics } }) => {
                    expect(topics.length).not.toBe(0);
                    topics.forEach(({ slug, description }) => {
                        expect(typeof slug).toBe("string");
                        expect(typeof description).toBe("string");
                    });
                });
        });
    });
    describe("GET /api/articles", () => {
        test("200: Responds with an object with key value 'articles' containing array of all articles", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then(({ body: { articles } }) => {
                    expect(articles.length).not.toBe(0);
                    articles.forEach(
                        ({
                            article_id,
                            title,
                            author,
                            topic,
                            created_at,
                            votes,
                            article_img_url,
                            comment_count,
                        }) => {
                            expect(typeof article_id).toBe("number");
                            expect(typeof title).toBe("string");
                            expect(typeof author).toBe("string");
                            expect(typeof topic).toBe("string");
                            expect(typeof created_at).toBe("string");
                            expect(typeof votes).toBe("number");
                            expect(typeof article_img_url).toBe("string");
                            expect(typeof comment_count).toBe("number");
                        }
                    );
                });
        });
    });
    describe("GET /api/users", () => {
        test("200: Responds with an object with key value 'users' containing array of all users", () => {
            return request(app)
                .get("/api/users")
                .expect(200)
                .then(({ body: { users } }) => {
                    expect(users.length).not.toBe(0);
                    users.forEach(({ username, name, avatar_url }) => {
                        expect(typeof username).toBe("string");
                        expect(typeof name).toBe("string");
                        expect(typeof avatar_url).toBe("string");
                    });
                });
        });
    });
});
describe("CORE: request parameters", () => {
    describe("GET /api/articles/:article_id", () => {
        test("200: Responds with an object containing information matching the specified article_id", () => {
            test_id = 2;
            return request(app)
                .get("/api/articles/2") //+ test_id)
                .expect(200)
                .then(({ body: { article } }) => {
                    const {
                        article_id,
                        title,
                        author,
                        body,
                        topic,
                        created_at,
                        votes,
                        article_img_url,
                    } = article;
                    expect(article_id).toBe(test_id);
                    expect(typeof title).toBe("string");
                    expect(typeof author).toBe("string");
                    expect(typeof body).toBe("string");
                    expect(typeof topic).toBe("string");
                    expect(typeof created_at).toBe("string");
                    expect(typeof votes).toBe("number");
                    expect(typeof article_img_url).toBe("string");
                });
        });
    });
});
