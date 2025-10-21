// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress-xpath" />
require('cypress-xpath');

// Cypress.Commands.add('URL', function(){
//     cy.visit('https://your-environment.example.com')
//     }
// )

// Cypress.Commands.add('loginSiswa', function(){
//     // cy.log(`Username: ${Cypress.env('username')}`);
//     // cy.log(`Password: ${Cypress.env('password') ? '****' : 'Not Set'}`);

//     const usernameSiswa = Cypress.env('usernameSiswa');
//     const passwordSiswa = Cypress.env('passwordSiswa');

//         if (!usernameSiswa || !passwordSiswa) {
//             throw new Error("❌ Username atau Password belum diisi di .env file");
//         }
//     cy.get(`[name='identifier']`).type(usernameSiswa);
//     cy.get(`[name='password']`).type(passwordSiswa);
//     cy.get('.gap-4').click()
//     cy.get(".cursor-pointer").click();
//     cy.url().should('not.include', '/login');
   
//     }
// )

// Cypress.Commands.add('loginUstadz', function(){
//     // cy.log(`Username: ${Cypress.env('username')}`);
//     // cy.log(`Password: ${Cypress.env('password') ? '****' : 'Not Set'}`);

//     const usernameUstadz = Cypress.env('usernameUstadz');
//     const passwordUstadz = Cypress.env('passwordUstadz');

//         if (!usernameUstadz || !passwordUstadz) {
//             throw new Error("❌ Username atau Password belum diisi di .env file");
//         }
//     cy.get(`[name='identifier']`).type(usernameUstadz);
//     cy.get(`[name='password']`).type(passwordUstadz);
//     cy.get('.gap-4').click()
//     cy.get(".cursor-pointer").click();
//     cy.url().should('not.include', '/login');

//     }
// )

// Cypress.Commands.add('loginAdmin', function(){
//     // cy.log(`Username: ${Cypress.env('username')}`);
//     // cy.log(`Password: ${Cypress.env('password') ? '****' : 'Not Set'}`);

//     const usernameAdmin = Cypress.env('usernameAdmin');
//     const passwordAdmin = Cypress.env('passwordAdmin');

//         if (!usernameAdmin || !passwordAdmin) {
//             throw new Error("❌ Username atau Password belum diisi di .env file");
//         }
//     cy.get(`[name='identifier']`).type(usernameAdmin);
//     cy.get(`[name='password']`).type(passwordAdmin);
//     cy.get('.gap-4').click();
//     cy.get(".cursor-pointer").click();
//     cy.url().should('not.include', '/login');

//     }
// )


Cypress.Commands.add('waitShort', function(){
    cy.wait(500)
    }
)

Cypress.Commands.add('waitMiddle', function(){
    cy.wait(500)
    }
)

Cypress.Commands.add('waitLong', function(){
    cy.wait(500)
    }
)

Cypress.Commands.add('loginAdmins', function(){
    const URL = Cypress.env('LOGIN_URL');
    const USER_ADMIN = Cypress.env('USERNAME_ADMIN');
    const PASS_ADMIN = Cypress.env('PASSWORD_ADMIN');

    cy.visit(URL)

        if (!USER_ADMIN || !PASS_ADMIN) {
            throw new Error("❌ Username atau Password belum diisi di .env file");
        }

    cy.get(`[name='identifier']`).type(USER_ADMIN,{ log: false });
    cy.get(`[name='password']`).type(PASS_ADMIN,{ log: false });
    cy.get('.gap-4').click()
    cy.get(".cursor-pointer").click();
    cy.url().should('not.include', '/login');

    cy.waitForLoading();
    cy.log("✅ Login sebagai Admin berhasil");


    }
)

Cypress.Commands.add('UncaughtException', function(){
       Cypress.on('Uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
        });
        cy.waitForLoading().get('.text-primary-500').click();

    }
)


Cypress.Commands.add('AdminCreateMusyrif', function(){
    cy.get(`[href='/admin/user-management']`).click();
    cy.get('.text-background').click();
    cy.get(`[name='name']`).type("Musyrif baru");
    cy.get(`[name='email']`).type("gurubaru1@yopmail.com");
    cy.get(`[name='phone']`).type("081200000001");
    cy.get('.css-3zwssd-control').click();
    // cy.get('#react-select-3-option-0').click()
    cy.get(`[name='musyrif']`).click()

    }
)

Cypress.Commands.add('AdminCreateSecurity', function(){
    cy.get(`[href='/admin/user-management']`).click();
    cy.get('.text-background').click();
    cy.get(`[name='name']`).type("Security baru");
    cy.get(`[name='email']`).type("securitybaru1@yopmail.com");
    cy.get(`[name='phone']`).type("081200000002");
    cy.get('.css-3zwssd-control').click();
    cy.get('#react-select-3-option-1').click()
    }
)
Cypress.Commands.add('AdminCreateAdmin', function(){
    cy.get(`[href='/admin/user-management']`).click();
    cy.get('.text-background').click();
    cy.get(`[name='name']`).type("Admin baru");
    cy.get(`[name='email']`).type("adminbaru1@yopmail.com");
    cy.get(`[name='phone']`).type("081200000003");
    cy.get('.css-3zwssd-control').click({force: true});
    //cy.get('#react-select-3-option-2').click()
    }
)

Cypress.Commands.add('logout', function(){
    cy.xpath(`//button[@class='relative cursor-pointer rounded-lg text-sm font-semibold transition-all w-full py-3 text-error-600 bg-transparent']`).click()
    }
)
Cypress.Commands.add('profile', function(){
    cy.get('rect').click();
    }
)



Cypress.Commands.add('confirmLogout', function(){
    cy.get('.text-background').click()
    
    }
)

Cypress.Commands.add('searchUser', function(){
    cy.get(`[href='/admin/user-management']`).click();
    cy.waitForLoading().get(`[name='search']`).click().type("test cari user").wait(1000).clear();
    //filter semua
    cy.waitForLoading().get('.text-foreground').click()
    cy.get(`[role='radiogroup'] > div:nth-of-type(1)`).click()
    cy.waitForLoading().get('.text-background.w-full').click()
    //filter musyrif
    cy.waitForLoading().get('.text-foreground').click()
    cy.get(`[role='radiogroup'] > div:nth-of-type(2)`).click()
    cy.waitForLoading().get('.text-background.w-full').click()
    //filter security
    cy.waitForLoading().get('.text-foreground').click()
    cy.get(`[role='radiogroup'] > div:nth-of-type(3)`).click()
    cy.waitForLoading().get('.text-background.w-full').click()
    //filter admin
    cy.waitForLoading().get('.text-foreground').click()
    cy.get(`[role='radiogroup'] > div:nth-of-type(4)`).click()
    cy.waitForLoading().get('.text-background.w-full').click()
    cy.get('.size-6').click({ multiple: true })
    }
)

Cypress.Commands.add('settingKelas', function(){

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `kelas ${id}`
    //cy.get('input').type(testname);

    cy.get(`[href='/admin/setting-kelas']`).click();
    cy.get('.py-3').click()
    cy.get(`[name='name']`).type(testname)
    cy.get('.css-3zwssd-control').click().type('baru{enter}')
    }
)

// Cypress.Commands.add('settingKelas', function(){
//     cy.get(`[href='/admin/setting-kelas']`).click();
//     cy.get('.py-3').click()
//     cy.get(`[name='name']`).type("ini kelas baru")
//     cy.get('.css-3zwssd-control').click().type('baru{enter}')
//     }
// )

Cypress.Commands.add('waitForLoading', () => {
    const selector = Cypress.env('LOADING_SELECTOR') || '.loading-spinner';
    const timeout = Number(Cypress.env('LOADING_TIMEOUT')) || 10000;
  
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout }).should('not.exist');
      }
    });
  });


Cypress.Commands.add('loginENV', function(){

    const URL = Cypress.env('LOGIN_URL');
    const USER_SISWA = Cypress.env('USERNAME_SISWA');
    const PASS_SISWA = Cypress.env('PASSWORD_SISWA');

    cy.visit(URL)

        if (!USER_SISWA || !PASS_SISWA) {
            throw new Error("❌ Username atau Password belum diisi di .env file");
        }

    cy.get(`[name='identifier']`).type(USER_SISWA,{ log: false });
    cy.get(`[name='password']`).type(PASS_SISWA,{ log: false });
    cy.get('.gap-4').click()
    cy.get(".cursor-pointer").click();
    cy.url().should('not.include', '/login');

    cy.waitForLoading();
    cy.log("✅ Login sebagai Siswa berhasil");

    }
)

Cypress.Commands.add('login_UST_ENV', function(){
    
    const URL = Cypress.env('LOGIN_URL');
    const USER_MUSYRIF = Cypress.env('USERNAME_MUSYRIF');
    const PASS_MUSYRIF = Cypress.env('PASSWORD_MUSYRIF');

    cy.visit(URL)

        if (!USER_MUSYRIF || !PASS_MUSYRIF) {
            throw new Error("❌ Username atau Password belum diisi di .env file");
        }

    cy.get(`[name='identifier']`).type(USER_MUSYRIF,{ log: false });
    cy.get(`[name='password']`).type(PASS_MUSYRIF,{ log: false });
    cy.get('.gap-4').click()
    cy.get(".cursor-pointer").click();
    cy.url().should('not.include', '/login');

    cy.waitForLoading();
    cy.log("✅ Login sebagai Ustadz berhasil");

    }
)

Cypress.Commands.add('login_ADMIN_ENV', function(){
    
    const URL = Cypress.env('LOGIN_URL');
    const USER_ADMIN = Cypress.env('USERNAME_ADMIN');
    const PASS_ADMIN = Cypress.env('PASSWORD_ADMIN');

    cy.visit(URL)

        if (!USER_ADMIN || !PASS_ADMIN) {
            throw new Error("❌ Username atau Password belum diisi di .env file");
        }

    cy.get(`[name='identifier']`).type(USER_ADMIN,{ log: false });
    cy.get(`[name='password']`).type(PASS_ADMIN,{ log: false });
    cy.get('.gap-4').click()
    cy.get(".cursor-pointer").click();
    cy.url().should('not.include', '/login');

    cy.waitForLoading();
    cy.log("✅ Login sebagai Admin berhasil");

    }
)

Cypress.Commands.add('AdminLaporan', function(){
    cy.get(`[href='/admin/laporan']`).click();
    cy.get('.mb-auto > div:nth-of-type(1) .css-3zwssd-control').click().type('empat{enter}')
    cy.get(`[name='startAt']`).click()
    cy.waitShort().xpath(`//button[.='1']`).click()
    cy.waitShort().get(`.relative[type='button']`).click()
    cy.waitShort().get(`[name='endAt']`).click()
    cy.waitShort().xpath(`//button[.='30']`).click({ multiple: true })
    cy.waitShort().get(`.relative[type='button']`).click()
    cy.waitShort().get(`div:nth-of-type(4) .css-3zwssd-control`).click().type('jam{enter}')
    cy.waitShort().get(`.flex-1`).click()
    cy.waitShort().get(`div:nth-of-type(4) .css-3zwssd-control`).click().type('sekolah{enter}')

    }
)

