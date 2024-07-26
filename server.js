import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `select id, name, year, quality from movies;`
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `insert into review (userID, reviewTitle, reviewContent, reviewScore, movieID) values (?, ?, ?, ?, ?)`
	let data = [req.body.userID, req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore, req.body.movieID];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
	});
	connection.end();
});

app.post('/api/searchMovieDirAvg', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `select title, director, avg(R.reviewScore) as average
	from (
		select M.name as title, M.id, concat(D.first_name, ' ', D.last_name) as director, concat(A.first_name, ' ', A.last_name) as actor
		from movies M, movies_directors MD, directors D, actors A, roles R
		where M.id=MD.movie_id
		and MD.director_id=D.id
		and M.id=R.movie_id
		and R.actor_id=A.id`

	let data = [];
	
	if (req.body.title) {
		sql = sql + ` and M.name = ?`;
		data.push(req.body.title)
	}

	if (req.body.director) {
		sql = sql + ` and concat(D.first_name, ' ', D.last_name) = ?`;
		data.push(req.body.director)
	}

	if (req.body.actor) {
		sql = sql + ` and concat(A.first_name, ' ', A.last_name) = ?`;
		data.push(req.body.actor)
	}
	
	sql = sql + `) as M left join review R on M.id=R.movieID
	group by title, director;`;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/searchMovieReview', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = `select M.title, R.reviewContent as reviews, R.reviewID
	from (
		select M.name as title, M.id, concat(D.first_name, ' ', D.last_name) as director, concat(A.first_name, ' ', A.last_name) as actor
		from movies M, movies_directors MD, directors D, actors A, roles R
		where M.id=MD.movie_id
		and MD.director_id=D.id
		and M.id=R.movie_id
		and R.actor_id=A.id`

	let data = [];
	
	if (req.body.title) {
		sql = sql + ` and M.name = ?`;
		data.push(req.body.title)
	}

	if (req.body.director) {
		sql = sql + ` and concat(D.first_name, ' ', D.last_name) = ?`;
		data.push(req.body.director)
	}

	if (req.body.actor) {
		sql = sql + ` and concat(A.first_name, ' ', A.last_name) = ?`;
		data.push(req.body.actor)
	}
	
	sql = sql + `) as M left join review R on M.id=R.movieID
	group by title, reviews, R.reviewID;`;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getPopularMovies', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `select M.id, M.name, M.year, M.trailer, M.description, M.article, M.image, avg(R.reviewScore) as average
	from movies M, review R
	where M.id=R.movieID
	group by M.id, M.article, M.name, M.year, M.trailer, M.image
    having average >=4
	order by average desc;`
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/updateTrailer', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `update movies set trailer = ? where id = ?;`
	let data = [req.body.newTrailer, req.body.id];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server