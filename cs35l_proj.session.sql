SHOW DATABASES;

SELECT 
	CASE FULLTEXTSERVICEPROPERTY('IsFullTextInstalled')
		WHEN 1 THEN 'Full-Text installed.' 
		ELSE 'Full-Text is NOT installed.' 
	END

SELECT is_fulltext_enabled
FROM sys.databases
WHERE database_id = DB_ID()