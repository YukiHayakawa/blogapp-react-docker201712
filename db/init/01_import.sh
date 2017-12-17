cd /docker-entrypoint-initdb.d/
echo "import example..."
gzip -dc ./example.dump.gz | mysql -h localhost -u root -ppass -P 3306 example

echo "done."
