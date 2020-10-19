var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

var connect = 'postgres://postgres:nadhilah01@localhost/dbberita';

const { Client } = require('pg');
const connectionString = 'postgres://postgres:nadhilah01@localhost/dbberita';
const client = new Client({
    connectionString: connectionString
});
client.connect()
    .then(res => console.log("Connected successfully..."))
    .catch(err => console.log("Connection failed..."));

var i;

client.query("SELECT * FROM berita", function(err, result) {
    i = result.rows.length+1;
});

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
    // pg.connect(connect, function(err,client,done){
    //     if(err){
    //         return console.error('error fetching client from pool', err);
    //     }
        client.query('SELECT * FROM berita', function(err, result){
            if(err){
                return console.error('error running query', err);
            }
            res.render('index', {berita: result.rows});
            // done();
        });
    // });
});

app.post('/add', function(req,res){
    client.query("INSERT INTO berita(id, judul_berita, konten, kategori) VALUES($1, $2, $3, $4)",
    [i, req.body.judul_berita, req.body.konten, req.body.kategori]);
    i = i + 1;
    res.redirect('/');
});

app.delete('/delete/:id', function(req,res){
    client.query("DELETE FROM berita WHERE id=$1", [req.params.id]);

    res.send(200);
});

app.post('/edit', function(req,res){
    client.query("UPDATE berita SET judul_berita=$1, konten=$2, kategori=$3 WHERE id=$4", [req.body.judul_berita, req.body.konten, req.body.kategori, req.body.id]);

    res.redirect('/');
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});