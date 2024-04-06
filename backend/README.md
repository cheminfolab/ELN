## Setting up the PostgreSQL Database

### Native

In the terminal (backend/), initialize a postgres database by:
````bash
initdb -D database
````

start the server modus/instance of postgres

````bash
pg_ctl -D database -l logfile start

#waiting for server to start.... done
#server started
````

create a non-superuser:

````bash
createuser --encrypted --pwprompt admin
# asks for name and password
````

using this superuser, create inner database inside the base database

````bash
createdb --owner=admin flask_database
````

### Populating the Database

Migrations to the database need to be applied by:
```python
python3 manage.py makemigrations
python3 manage.py migrate
```
If you want to add entries to the database yourself, you need to create a superuser first:
```python
python3 manage.py createsuperuser
```
Otherwise, you can populate the database with example data (including superuser (email:'admin@admin.com', password:'admin'))
```python
python3 manage.py loaddata init.json
```

### Backing up the Database

#### Via Django

````bash
python3 manage.py dumpdata --indent=2 > init.json
````

#### Using pg_dump

See: [pg_dump manual](https://www.postgresql.org/docs/12/app-pgdump.html)

````bash
pg_dump -h [host] -U [option] -W -F [file_type] [database_name] > [backup_name]
````

for example:

````bash
pg_dump -h localhost -U admin -W -F t userinterface_db > ./init.tar
````


### Stop running the Postgres Instance

monitor whether a postgres instance/server is running or not
````bash
ps aux | grep postgres
````
if no instance is running, you will see only one line as the answer to your query - which is from your grep search,
ending with: grep --color=auto postgres
(ignore this line)

e.g. the output of `ps aux | grep postgres` was:
````bash
# username  2673  0.0  0.0  14760   512 pts/11   S+   07:34   0:00 grep --color=auto postgres
# username 30550  0.0  0.0 179144 18996 ?        S    Jun13   0:01 /home/username/miniconda3/envs/django/bin/postgres -D mylocal_db
# username 30552  0.0  0.0 179276  4756 ?        Ss   Jun13   0:00 postgres: checkpointer process   
# username 30553  0.0  0.0 179144  5216 ?        Ss   Jun13   0:01 postgres: writer process   
# username 30554  0.0  0.0 179144  8464 ?        Ss   Jun13   0:01 postgres: wal writer process   
# username 30555  0.0  0.0 179700  5792 ?        Ss   Jun13   0:01 postgres: autovacuum launcher process   
# username 30556  0.0  0.0  34228  3416 ?        Ss   Jun13   0:03 postgres: stats collector process  
````

if an instance of postgresql server is running, then several processes are running
you can kill the server by the first number of the leading line!

````bash
kill <number>
````
