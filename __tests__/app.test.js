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
            const test_id = 2;
            return request(app)
                .get("/api/articles/" + test_id)
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
        test("400: When given a bad input (i.e. not a number for article_id)", () => {
            return request(app)
                .get("/api/articles/mitchArticle")
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe(`invalid request`);
                });
        });
        test("404: When given a good input but no matching article found", () => {
            return request(app)
                .get("/api/articles/999")
                .expect(404)
                .then(({ body }) => {
                    //console.log(body);
                });
        });
    });
    describe("GET /api/articles/:article_id/comments", () => {
        test("200: Responds with an object with key comments containing array of all comments for given article (when article contains comments)", () => {
            const test_id = 1;
            return request(app)
                .get(`/api/articles/${test_id}/comments`)
                .expect(200)
                .then(({ body: { comments } }) => {
                    expect(comments.length).not.toBe(0);
                    comments.forEach(
                        ({
                            article_id,
                            comment_id,
                            author,
                            body,
                            votes,
                            created_at,
                        }) => {
                            expect(typeof article_id).toBe("number");
                            expect(typeof comment_id).toBe("number");
                            expect(typeof author).toBe("string");
                            expect(typeof body).toBe("string");
                            expect(typeof votes).toBe("number");
                            expect(typeof created_at).toBe("string");
                        }
                    );
                });
        });
        test("200: For valid article with no comments, responds with empty comments array", () => {
            const test_id = 2;
            return request(app)
                .get(`/api/articles/${test_id}/comments`)
                .expect(200)
                .then(({ body: { comments } }) => {
                    expect(comments.length).toBe(0);
                });
        });
        test("400: When given a bad input for article_id (e.g. non-number type) ", () => {
            const test_id = "article";
            return request(app)
                .get(`/api/articles/${test_id}/comments`)
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe(`invalid request`);
                });
        });
        test("404: When given a good input for article_id, but article matching article_id doesn't exist", () => {
            const test_id = 200;
            return request(app)
                .get(`/api/articles/${test_id}/comments`)
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe(
                        `no articles found matching article_id: 200`
                    );
                });
        });
    });
    describe("POST: /api/articles/:article_id/comments", () => {
        test("201: valid user adds comment with body to existing article", () => {
            const test_id = 2;
            return request(app)
                .post(`/api/articles/${test_id}/comments`)
                .send({ username: "butter_bridge", body: "First!" })
                .expect(201)
                .then((body) => {});
        });
    });
});
