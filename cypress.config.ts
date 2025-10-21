const { defineConfig } = require("cypress");
const dotenvPlugin = require("cypress-dotenv");
require('dotenv').config(); // ← ini yang baca .env


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
      // config.env.usernameSiswa = process.env.usernameSiswa;
      // config.env.passwordSiswa = process.env.passwordSiswa;
     
      // config.env.usernameUstadz = process.env.usernameUstadz;
      // config.env.passwordUstadz = process.env.passwordUstadz;

      // config.env.usernameAdmin = process.env.usernameAdmin;
      // config.env.passwordAdmin = process.env.passwordAdmin;
      // ======================================================


      // config url muhi
      config.env.LOGIN_URL = process.env.URL;

      // config list credentials user > config.env.value harus sama dg value const di commands.ts
      config.env.USERNAME_SISWA= process.env.CYPRESS_USER_SISWA;
      config.env.PASSWORD_SISWA = process.env.CYPRESS_PASS_SISWA;

      config.env.USERNAME_MUSYRIF = process.env.CYPRESS_USER_MUSYRIF;
      config.env.PASSWORD_MUSYRIF = process.env.CYPRESS_PASS_MUSYRIF;

      config.env.USERNAME_ADMIN = process.env.CYPRESS_USER_ADMIN;
      config.env.PASSWORD_ADMIN = process.env.CYPRESS_PASS_ADMIN;

      config.env.LOADING_SELECTOR = process.env.LOADING_SELECTOR;
      config.env.LOADING_TIMEOUT = process.env.LOADING_TIMEOUT;
      return (config);
    },
  },
  viewportWidth: 390,
  viewportHeight: 844,
  //set timeout
  "defaultCommandTimeout": 60000,
  "pageLoadTimeout": 60000,
  "requestTimeout": 45000,
  "redactLogData": true,
  
  
});
