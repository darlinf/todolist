import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db', '1.0', '', 1);

const createTask = item => {
  db.transaction(function (txn) {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS Tasks(task_id INTEGER PRIMARY KEY NOT NULL, task VARCHAR(300), taskState VARCHAR(30),timeStart VARCHAR(30),timeEnd VARCHAR(30),alartRepeat VARCHAR(30),typeTask VARCHAR(30),date VARCHAR(100))',
      [],
    );
    txn.executeSql(
      `INSERT INTO Tasks (alartRepeat, date, task, taskState, timeEnd, timeStart, typeTask) 
      VALUES (:alartRepeat, :date, :task, :taskState, :timeEnd, :timeStart, :typeTask)`,
      [
        item.alartRepeat,
        item.date,
        item.task,
        item.taskState,
        item.timeEnd,
        item.timeStart,
        item.typeTask,
      ],
    );
  });
};

const getTasks = async tasksSend => {
  db.transaction(function (txn) {
    txn.executeSql('SELECT * FROM `Tasks`', [], function (tx, res) {
      let elems = [];
      for (let i = 0; i < res.rows.length; ++i) {
        elems.push(res.rows.item(i));
      }
      tasksSend(elems);
    });
  });
};

const getTaskById = S_Id => {
  db.transaction(function (txn) {
    txn.executeSql(
      'SELECT * FROM `users` where user_id=?',
      [S_Id],
      function (tx, res) {
        console.log('ddddddddddddddddddd');
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      },
    );
  });
};

const deleteTask = S_Id => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM users where user_id=?',
      [S_Id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('deleted');
        }
      },
    );
  });
};

const editTask = (resurt, task) => {
  console.log('dddddddddddddddddddddddddd');
  console.log(task);
  db.transaction(txn => {
    txn.executeSql(
      `UPDATE Tasks set alartRepeat=?, date=?, task=?, taskState=?, timeEnd=?, timeStart=?, typeTask=? where task_id=?`,
      [
        task.alartRepeat,
        task.date,
        task.task,
        task.taskState,
        task.timeEnd,
        task.timeStart,
        task.typeTask,
        task.task_id,
      ],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          resurt('edited');
          console.log('edited');
        }
      },
    );

    /*
    tx.executeSql(
      'UPDATE users set name=? where user_id=?',
      ['hola', id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          resurt('edited');

        }
      },
    );*/
  });
};

export default {createTask, getTasks, getTaskById, deleteTask, editTask};

const db2 = () => {
  db.transaction(function (txn) {
    // txn.executeSql('DROP TABLE IF EXISTS Users', []);
    /* txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
        [],
      );*/
    //txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);

    //txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);

    //txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya']);

    /* txn.executeSql(
      'CREATE TABLE IF NOT EXISTS Tasks(task_id INTEGER PRIMARY KEY NOT NULL, task VARCHAR(300), taskState VARCHAR(30),timeStart VARCHAR(30),timeEnd VARCHAR(30),alartRepeat VARCHAR(30),typeTask VARCHAR(30),date VARCHAR(100))',
      [],
    );*/

    txn.executeSql('SELECT * FROM `users`', [], function (tx, res) {
      console.log('ddddddddddddddddddd');
      for (let i = 0; i < res.rows.length; ++i) {
        console.log('item:', res.rows.item(i));
      }
    });
  });
};
