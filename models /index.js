const db = require('../db');

module.exports = {
    getid: (todoId, callback) => {
        const query = `SELECT * FROM Todoobject WHERE id = ${todoId}`;
        
        db.query(query, (err, result) => {
            if(err){
                callback(err)
            }
            else{
                callback(null, result);
            }
        })
    },

    putid: (todoId, name, completed, callback) => {
        const query = `UPDATE Todoobject SET name = '${name}', completed = ${completed} WHERE id = ${todoId}`;
        const params = [todoId];
        db.query(query, params, (err, result) => {
            if(err){
                callback(err)
            } else {
                const query = `SELECT * FROM Todoobject WHERE id = ${todoId}`;
                db.query(query, params, (err, result) => {
                    if(err){
                        callback(err)
                    }
                    else{
                        callback(null, result);
                    }
                })
            }
        })
    },
    deletedid: (todoId, callback) => {
        const query = `DELETE FROM Todoobject WHERE id = ${todoId}`;
        db.query(query, (err, result) => {
            if(err){
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    postid: (name, completed, callback) => {
        const query = `INSERT INTO Todoobject(name, completed) VALUES (?, ?)`;
        const params = [name, completed];
        db.query(query, params, (err, result) => {
            if(err){
                callback(err);
            } else {
                const query = `SELECT * FROM ( SELECT MAX(id) as id FROM Todoobject)t1
                INNER JOIN Todoobject ON t1.id = todoobject.id`;
                db.query(query,(err, result) => {
                    if(err){
                        callback(err)
                    }
                    else{
                        callback(null, result);
                    }
                })
            }
        });
        
    },
    listtodo: (callback) => {
        const query = `SELECT * FROM Todoobject`;
        db.query(query, (err, result) => {
            if(err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
    },
    logintodo: (todoId, name, completed, callback) => {
        const query = `SELECT * FROM Todoobject WHERE id = ${todoId} AND name = '${name}' AND completed = ${completed}`;
        db.query(query, (err, result) => {
            if(err){
                return callback(err);
            } else {
                callback(null, result);
            }
        })
    },
    getimg: (todoId, path, callback) => {
        const query = `UPDATE Todoobject SET img_path = '${path}' WHERE id = ${todoId}`;
        
        db.query(query, (err, result) => {
            if(err){
                callback(err)
            }
            else{
                console.log(path)
                callback(null, result);
            }
        })
    }
}