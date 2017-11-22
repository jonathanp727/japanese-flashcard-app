/* eslint-disable */
const parser = require('xml2json');
const fs = require('fs');
const JSON = require('jsonify');
const mysql = require('mysql');
const path = require('path');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpass',
  database: 'flashcards'
});

con.connect((err) => {
  if (err) throw err;

  const startingTime = (new Date()).getTime();
  fs.readFile(path.join(__dirname, 'JMdict_edited.xml'), (err2, data) => {
    if (err2) throw err2;
    const dictJson = parser.toJson(data);
    const dictObj = JSON.parse(dictJson);

    // db array of entries = dictObj.JMdict.entry

    // Setup entries
    let str = 'INSERT INTO entries VALUES ';
    for (let i = 0; i < dictObj.JMdict.entry.length; i++) {
      str += '(), ';
    }
    str = str.slice(0, -2); // Slice off extra ', ' and add ';'
    str += ';';
    con.query(str, (err3, result) => {
      if (err3) throw err3;
      console.log(result);
    });

    str = 'INSERT INTO kanji_elements VALUES ';
    for (let i = 0; i < dictObj.JMdict.entry.length; i++) {
      if (dictObj.JMdict.entry[i].k_ele instanceof Array) {
        for (let j = 0; j < dictObj.JMdict.entry[i].k_ele.length; j++) {
          str += `(${i+1}, "${dictObj.JMdict.entry[i].k_ele[j].keb}"), `;
        }
      } else {
        if (dictObj.JMdict.entry[i].k_ele) {
          str += `(${i + 1}, "${dictObj.JMdict.entry[i].k_ele.keb}"), `;
        }
      }
    }
    str = str.slice(0, -2); // Slice off extra ', ' and add ';'
    str += ';';
    con.query(str, (err4, result) => {
      if (err4) throw err;
      console.log(result);
    });

    str = 'INSERT INTO reading_elements VALUES ';
    for (let i = 0; i < dictObj.JMdict.entry.length; i++) {
      if (dictObj.JMdict.entry[i].r_ele instanceof Array) {
        for (let j = 0; j < dictObj.JMdict.entry[i].r_ele.length; j++) {
          str += `(${i + 1}, "${dictObj.JMdict.entry[i].r_ele[j].reb}"), `;
        }
      } else {
        if (dictObj.JMdict.entry[i].r_ele) {
          str += `(${i + 1}, "${dictObj.JMdict.entry[i].r_ele.reb}"), `;
        }
      }
    }
    str = str.slice(0, -2); // Slice off extra ', ' and add ';'
    str += ';';
    con.query(str, (err5, result) => {
      if (err5) throw err;
      console.log(result);
    });

    let senseQueryString = 'INSERT INTO senses (entry_id, pos) VALUES ';
    let senseCounter = 1;
    let glossQueryString = 'INSERT INTO glosses VALUES ';
    for (let i = 0; i < dictObj.JMdict.entry.length; i++) {
      if (dictObj.JMdict.entry[i].sense instanceof Array) {   
        for (let j = 0; j < dictObj.JMdict.entry[i].sense.length; j++) {
          senseQueryString += `(${i+1}, "${dictObj.JMdict.entry[i].sense[j].pos}"), `;
          if (dictObj.JMdict.entry[i].sense[j].gloss instanceof Array) {
            for (let k = 0; k < dictObj.JMdict.entry[i].sense[j].gloss.length; k++) {
              dictObj.JMdict.entry[i].sense[j].gloss[k].$t = dictObj.JMdict.entry[i].sense[j].gloss[k].$t.replace(/"/g, '\\"');
              glossQueryString += `(${senseCounter}, "${dictObj.JMdict.entry[i].sense[j].gloss[k].$t}"), `;
            }        
          } else {
            dictObj.JMdict.entry[i].sense[j].gloss.$t = dictObj.JMdict.entry[i].sense[j].gloss.$t.replace(/"/g, '\\"');
            glossQueryString += `(${senseCounter}, "${dictObj.JMdict.entry[i].sense[j].gloss.$t}"), `;
          }
          senseCounter++;
        }
      } else {
        senseQueryString += `(${i+1}, "${dictObj.JMdict.entry[i].sense.pos}"), `;
        if (dictObj.JMdict.entry[i].sense.gloss instanceof Array) {
          for (let k = 0; k < dictObj.JMdict.entry[i].sense.gloss.length; k++) {
            dictObj.JMdict.entry[i].sense.gloss[k].$t = dictObj.JMdict.entry[i].sense.gloss[k].$t.replace(/"/g, '\\"');
            glossQueryString += `(${senseCounter}, "${dictObj.JMdict.entry[i].sense.gloss[k].$t}"), `;
          }
        } else {
          dictObj.JMdict.entry[i].sense.gloss.$t = dictObj.JMdict.entry[i].sense.gloss.$t.replace(/"/g, '\\"');
          glossQueryString += `(${senseCounter}, "${dictObj.JMdict.entry[i].sense.gloss.$t}"), `;
        }
        senseCounter++;
      }
    }
    senseQueryString = senseQueryString.slice(0, -2); // Slice off extra ', ' and add ';'
    senseQueryString += ';';
    glossQueryString = glossQueryString.slice(0, -2);
    glossQueryString += ';';
    con.query(senseQueryString, (err6, result) => {
      if (err6) throw err6;
      console.log(result);
    });
    con.query(glossQueryString, (err7, result) => {
      if (err7) throw err7;
      console.log(result);
      const totalTime = ((new Date()).getTime() - startingTime) / 1000;
      console.log("Finished in " + totalTime + " seconds");
      con.end();
    });
  });
});
