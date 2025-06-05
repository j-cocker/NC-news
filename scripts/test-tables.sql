\c nc_news_test
\o ./misc/output-tables.txt 
-- SELECT * FROM users; 
SELECT * FROM topics; 
-- SELECT * FROM articles; 
--SELECT * FROM comments;
--SELECT articles.article_id, title, articles.author, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count FROM articles JOIN comments USING (article_id) GROUP BY articles.article_id
--SELECT COUNT(article_id) AS comment_count FROM comments GROUP BY article_title
--SELECT articles.article_id, title, articles.author, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments USING (article_id) GROUP BY articles.article_id ORDER BY articles.created_at DESC;
\o
