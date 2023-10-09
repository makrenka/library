/// <reference types="cypress" />

const USER_AUTH = {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjY2NTQ0MzI5LCJleHAiOjE2NjkxMzYzMjl9.erLicGJGH5wttjAF6xDWMcxDJOIJvEnFLFzuMVzUkSU',
    user: {
        id: 123,
        username: 'MockUser',
        email: 'mock@gmail.com',
        confirmed: true,
        blocked: false,
        createdAt: '2023-01-15T11:14:55.686Z',
        updatedAt: '2023-03-08T08:29:25.197Z',
        firstName: 'Имя',
        lastName: 'Фамилия',
        phone: '+375 (33) 535-35-35',
        role: {
            id: 1,
            name: 'User',
            description: 'Default role given to authenticated user.',
            type: 'authenticated',
        },
        comments: [
            {
                id: 189,
                rating: 3,
                text: 'test text comment',
                bookId: 94,
            },
        ],
        avatar: '/uploads/294928_original_748468a52a.jpg',
        booking: {
            id: 185,
            order: true,
            dateOrder: '2023-03-30T00:00:00.000Z',
            book: {
                id: 25,
                title: 'Жажда',
                issueYear: '2018',
                authors: ['Игорь Рыбаков'],
                image: null,
            },
        },
        delivery: {
            id: 460,
            handed: true,
            dateHandedFrom: '2023-03-06T18:44:05.903Z',
            dateHandedTo: '2023-03-30T18:44:05.903Z',
            book: {
                id: 71,
                title: 'Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал',
                issueYear: '2020',
                authors: ['Сатья Дас'],
                image: null,
            },
        },
        history: {
            id: 81,
            books: [
                {
                    id: 34,
                    title: 'Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо',
                    issueYear: '2020',
                    authors: ['Максим Дорофеев'],
                    image: null,
                },
                {
                    id: 52,
                    title: '15 секретов управления временем. Как успешные люди успевают всё',
                    issueYear: '2019',
                    authors: ['Кевин Круз'],
                    image: null,
                },
                {
                    id: 94,
                    title: 'Так говорили мудрецы. Афоризмы',
                    issueYear: '2016',
                    authors: ['С. Барсов'],
                    image: null,
                },
                {
                    id: 11,
                    title: '101 способ раскрутки личного бренда. Как сделать себе имя',
                    issueYear: '2019',
                    authors: ['Вячеслав Семенчук'],
                    image: null,
                },
            ],
        },
    },
};

const BOOKS = [
    {
        issueYear: '2020',
        rating: 4,
        title: 'Продажник на всю голову: Крутые стратегии профессионала',
        authors: ['Владимир Якуба'],
        image: {
            url: '/uploads/10782569_0_3cdfa87016.jpg',
        },
        categories: ['Бизнес'],
        id: 9,
        booking: {
            id: 298,
            order: true,
            dateOrder: '2023-03-14T21:00:00.000Z',
            customerId: 24,
            customerFirstName: 'test',
            customerLastName: 'user',
        },
        delivery: null,
        histories: null,
    },
    {
        issueYear: '2020',
        rating: null,
        title: 'Корпоративная культура Toyota: Уроки для других компаний',
        authors: ['Джеффри Лайкер'],
        image: {
            url: '/uploads/10152616_0_a027f27f41.jpg',
        },
        categories: ['Бизнес'],
        id: 15,
        booking: null,
        delivery: {
            id: 461,
            handed: true,
            dateHandedFrom: '2023-03-12T21:00:00.000Z',
            dateHandedTo: '2023-03-26T21:00:00.000Z',
            recipientId: 1,
            recipientFirstName: 'Aliaksei',
            recipientLastName: 'Valadzko',
        },
        histories: null,
    },
    {
        issueYear: '2019',
        rating: 3.5,
        title: 'Действуй! 10 заповедей успеха',
        authors: ['Ицхак Пинтосевич'],
        image: {
            url: '/uploads/10217872_0_ae066e6b54.jpg',
        },
        categories: ['Бизнес'],
        id: 26,
        booking: {
            id: 404,
            order: true,
            dateOrder: '2023-03-16T00:00:00.000Z',
            customerId: 406,
            customerFirstName: 'Andrew',
            customerLastName: 'Kirichenko',
        },
        delivery: null,
        histories: null,
    },
    {
        issueYear: '2020',
        rating: null,
        title: 'Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал',
        authors: ['Сатья Дас'],
        image: {
            url: '/uploads/10949964_0_Neskuchnaya_detskaya_psihologiya_Kak_obschatsya_s_rebenkom_chtobi_on_vas_i_slushalsya_i_slishal_Satya_Das_28c77fde4b.jpg',
        },
        categories: ['Психология', 'Родителям'],
        id: 71,
        booking: null,
        delivery: {
            id: 460,
            handed: true,
            dateHandedFrom: '2023-03-06T18:44:05.903Z',
            dateHandedTo: '2023-03-20T18:44:05.903Z',
            recipientId: 22,
            recipientFirstName: 'Igor',
            recipientLastName: 'Shidlovsky',
        },
        histories: null,
    },
    {
        issueYear: '2018',
        rating: 5,
        title: 'Homo Deus. Краткая история будущего',
        authors: ['Юваль Ной Харари'],
        image: {
            url: '/uploads/10673454_0_Homo_Deus_Kratkaya_istoriya_buduschego_Yuval_Harari_3d5bdcbd1f.jpg',
        },
        categories: ['Нон-фикшн'],
        id: 92,
        booking: {
            id: 425,
            order: true,
            dateOrder: '2023-03-16T00:00:00.000Z',
            customerId: 451,
            customerFirstName: 'adA9',
            customerLastName: 'adA9',
        },
        delivery: null,
        histories: null,
    },
    {
        issueYear: '2018',
        rating: 4,
        title: 'Краткая история почти всего на свете',
        authors: ['Билл Брайсон'],
        image: {
            url: '/uploads/kratkaya_istoriya_pochti_vsego_na_svete_5792ee1da1.jpg',
        },
        categories: ['Нон-фикшн'],
        id: 97,
        booking: {
            id: 424,
            order: true,
            dateOrder: '2023-03-15T21:00:00.000Z',
            customerId: 358,
            customerFirstName: 'Dmitry',
            customerLastName: 'Dmitry',
        },
        delivery: null,
        histories: null,
    },
    {
        issueYear: '2020',
        rating: 4,
        title: 'Как научиться дружить?',
        authors: ['Андрей Курпатов'],
        image: {
            url: '/uploads/ph_001_4a638f1923.webp',
        },
        categories: ['Детские'],
        id: 136,
        booking: {
            id: 319,
            order: true,
            dateOrder: '2023-03-15T21:00:00.000Z',
            customerId: 289,
            customerFirstName: 'Котик',
            customerLastName: 'Бурко',
        },
        delivery: null,
        histories: null,
    },
    {
        issueYear: '2019',
        rating: 2,
        title: 'Как исполняются мечты?',
        authors: ['Андрей Курпатов'],
        image: {
            url: '/uploads/cover2_aa0efc07fa.webp',
        },
        categories: ['Детские'],
        id: 138,
        booking: {
            id: 308,
            order: true,
            dateOrder: '2023-03-14T00:00:00.000Z',
            customerId: 22,
            customerFirstName: 'Igor',
            customerLastName: 'Shidlovsky',
        },
        delivery: null,
        histories: null,
    },
];

const CATEGORIES = [
    {
        name: 'Бизнес',
        path: 'business',
        id: 1,
    },
    {
        name: 'Психология',
        path: 'psychology',
        id: 2,
    },
    {
        name: 'Родителям',
        path: 'parents',
        id: 3,
    },
    {
        name: 'Нон-фикшн',
        path: 'non-fiction',
        id: 4,
    },
    {
        name: 'Художественная литература',
        path: 'fiction',
        id: 5,
    },
    {
        name: 'Программирование',
        path: 'programming',
        id: 6,
    },
    {
        name: 'Хобби',
        path: 'hobby',
        id: 7,
    },
    {
        name: 'Дизайн',
        path: 'design',
        id: 8,
    },
    {
        name: 'Детские',
        path: 'childish',
        id: 9,
    },
    {
        name: 'Другое',
        path: 'other',
        id: 10,
    },
];

const USER_FULL_DATA = {
    id: 123,
    username: 'MockUser',
    email: 'mock@gmail.com',
    confirmed: true,
    blocked: false,
    createdAt: '2023-01-15T11:14:55.686Z',
    updatedAt: '2023-03-08T08:29:25.197Z',
    firstName: 'Имя',
    lastName: 'Фамилия',
    phone: '+375 (33) 535-35-35',
    role: {
        id: 1,
        name: 'Admin',
        description: 'administration application',
        type: 'admin',
    },
    comments: [
        {
            id: 189,
            rating: 3,
            text: 'test text comment',
            bookId: 94,
        },
    ],
    avatar: '/uploads/294928_original_748468a52a.jpg',
    booking: {
        id: 185,
        order: true,
        dateOrder: '2023-03-30T00:00:00.000Z',
        book: {
            id: 25,
            title: 'Жажда',
            issueYear: '2018',
            authors: ['Игорь Рыбаков'],
            image: null,
        },
    },
    delivery: {
        id: 460,
        handed: true,
        dateHandedFrom: '2023-03-06T18:44:05.903Z',
        dateHandedTo: '2023-03-30T18:44:05.903Z',
        book: {
            id: 71,
            title: 'Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал',
            issueYear: '2020',
            authors: ['Сатья Дас'],
            image: null,
        },
    },
    history: {
        id: 81,
        books: [
            {
                id: 34,
                title: 'Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо',
                issueYear: '2020',
                authors: ['Максим Дорофеев'],
                image: null,
            },
            {
                id: 52,
                title: '15 секретов управления временем. Как успешные люди успевают всё',
                issueYear: '2019',
                authors: ['Кевин Круз'],
                image: null,
            },
            {
                id: 94,
                title: 'Так говорили мудрецы. Афоризмы',
                issueYear: '2016',
                authors: ['С. Барсов'],
                image: null,
            },
            {
                id: 11,
                title: '101 способ раскрутки личного бренда. Как сделать себе имя',
                issueYear: '2019',
                authors: ['Вячеслав Семенчук'],
                image: null,
            },
        ],
    },
};

const USERS = [
    {
        id: 31,
        username: 'testLogin15',
        email: 'testemail15@mail.ru',
        confirmed: true,
        blocked: false,
        createdAt: '2023-05-18T16:17:09.781Z',
        updatedAt: '2023-09-07T09:41:35.464Z',
        firstName: '1',
        lastName: '2',
        phone: '+375 (12) 121-21-21',
        role: {
            id: 1,
            name: 'User',
            description: 'Default role given to authenticated user.',
            type: 'authenticated',
        },
        avatar: null,
        delivery: {
            id: null,
            handed: null,
            dateHandedFrom: null,
            dateHandedTo: null,
        },
        historyCount: 0,
    },
    {
        id: 17,
        username: "Test1",
        email: "test@gmail.com",
        confirmed: true,
        blocked: true,
        createdAt: "2023-05-09T15:35:00.632Z",
        updatedAt: "2023-09-07T09:41:56.980Z",
        firstName: "firstName",
        lastName: "lastName",
        phone: "+375 (44) 123-45-67",
        role: {
            id: 1,
            name: 'User',
            description: 'Default role given to authenticated user.',
            type: 'authenticated',
        },
        avatar: null,
        delivery: {
            id: null,
            handed: null,
            dateHandedFrom: null,
            dateHandedTo: null,
        },
        historyCount: 0,
    },
    {
        id: 3,
        username: "Pred1993",
        email: "facount779@gmail.com",
        confirmed: true,
        blocked: false,
        createdAt: "2023-05-05T13:55:44.765Z",
        updatedAt: "2023-09-07T09:41:35.685Z",
        firstName: "Артём",
        lastName: "Ивченко",
        phone: "+375 (33) 333-33-33",
        role: {
            id: 1,
            name: 'User',
            description: 'Default role given to authenticated user.',
            type: 'authenticated',
        },
        avatar: null,
        delivery: {
            id: 1,
            handed: true,
            dateHandedFrom: "2022-11-08T13:59:46.130Z",
            dateHandedTo: "2022-11-10T13:59:46.130Z",
        },
        historyCount: 0,
    },
];

const getData = () => {
    cy.intercept('GET', /books/, BOOKS).as('books');
    cy.intercept('GET', /categories/, CATEGORIES).as('categories');
    cy.intercept('GET', /users\/me/, USER_FULL_DATA).as('me');
};

describe('Sprint 8', () => {
    const login = 'Wally13';
    const pass = 'GarrusWally13';

    beforeEach(() => {
        cy.session([login, pass], () => {
            cy.intercept('POST', /local/, USER_AUTH).as('authorize');
            cy.visit('http://localhost:3000/#/auth');
            cy.get('[data-test-id=auth-form] input[name=identifier]')
                .should('be.visible')
                .type(login);
            cy.get('[data-test-id=auth-form] input[name=password]')
                .should('be.visible')
                .type(pass);
            cy.get('[type=submit]').should('be.exist').click();
            cy.wait('@authorize');
            cy.get('[data-test-id=main-page]').should('be.visible');
        });
        getData();
        cy.viewport(1440, 900);
    });

    describe('get books and users', () => {
        it('get books and users', () => {
            cy.visit('http://localhost:3000/#/admin');
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.wait(['@books', '@categories', '@me']);
            cy.get('[data-test-id=card-admin]').eq(0).should('be.exist');
            cy.intercept('GET', /users/, USERS).as('users');
            cy.visit('http://localhost:3000/#/admin/users');
            cy.wait(['@users', '@me']);
            cy.get('[data-test-id=user-card]').eq(0).should('be.exist');
        });

    });

    describe('get book', () => {
        it('get book', () => {
            cy.intercept('GET', /books/, BOOKS[0]).as('get-books-success-id');
            cy.visit(`http://localhost:3000/#/books/all/9`);
            cy.get('[data-test-id=loader]').should('be.exist');
            cy.get('[data-test-id=app]').wait(0).screenshot('bookId-loading');
            cy.wait('@get-books-success-id');
            cy.get('[data-test-id=app]').screenshot('bookId-sucess');
        });
    });
});
