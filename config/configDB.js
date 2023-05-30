module.exports = {
  development: {
    database: {
      host: 'localhost',
      user: 'root',
      password: '', // inserire la propria password
      database: 'db_acl' // inserire il nome del database
    },
    server: {
      port: 3000 // scegliere la porta da utilizzare
    }
  },
  test: {
    database: {
      host: 'localhost',
      user: 'root',
      password: '', // inserire la propria password
      database: 'test_db_acl' // nome del database di test
    },
    server: {
      port: 4000 // scegliere la porta da utilizzare per il server di test
    }
  },
  production: {
    database: {
      host: 'production-db.example.com',
      user: 'username',
      password: 'password',
      database: 'db_acl'
    },
    server: {
      port: process.env.PORT || 3000
    }
  }
};
