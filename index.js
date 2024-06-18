const superagent = require('superagent');
const dotenv = require('dotenv')
// var mysql = require('mysql2');


dotenv.config();

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'Music'
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// promise with async/await
(async () => {
    // Data to be sent
    const data = {
        "contents": [{
            "parts": [{
                "text": `Can you analyze the following SQL schema and provide me SQL query for inserting 20 demo data for the Artist table alone with respect to a Music Streaming Platform.\n
                The response should contain a single 'INSERT' query with all the data inside of it.\n
                Make sure to provide no extra information with the data, Not even Heading.\n
                SQL Schema:\n
                'CREATE TABLE Artist (
   Artist_ID VARCHAR(50) NOT NULL PRIMARY KEY,
   Name VARCHAR(50) NOT NULL,
   Category VARCHAR(50),
   Likes INT NOT NULL,
   Play_ctr INT NOT NULL,
   Picture VARCHAR(150)
);\n

CREATE TABLE Album (
   Album_ID VARCHAR(50) NOT NULL PRIMARY KEY,
   Name VARCHAR(50) NOT NULL,
   Artist_ID VARCHAR(50) NOT NULL,
   Play_ctr INT NOT NULL,
   Picture VARCHAR(150),
   FOREIGN KEY (Artist_ID) REFERENCES Artist(Artist_ID)
);`
            }]
        }]
    }
    try {
        // Make request
        const { body } =
            await superagent.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.API_KEY}`)
                .send(data)
        // Show response data
        sql_query = body.candidates[0].content.parts[0].text
        sql_query.replace('\n', '')
        sql_query.replace('```sql', '')
        sql_query.replace('```', '')
        console.log(sql_query)
        

        // con.query(sql_query, (err, rows) => {
        //     if (err) throw err;

        //     console.log('Data entered into Db !');
            
        // });
        // con.end();

    } catch (err) {
        console.error(err)
    }
})();

