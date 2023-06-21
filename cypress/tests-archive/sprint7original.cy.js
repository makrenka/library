/// <reference types="cypress" />

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
                "id": 34,
                "title": "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
                "issueYear": "2020",
                "authors": [
                    "Максим Дорофеев"
                ],
                "image": null
            },
            {
                "id": 52,
                "title": "15 секретов управления временем. Как успешные люди успевают всё",
                "issueYear": "2019",
                "authors": [
                    "Кевин Круз"
                ],
                "image": null
            },
            {
                "id": 94,
                "title": "Так говорили мудрецы. Афоризмы",
                "issueYear": "2016",
                "authors": [
                    "С. Барсов"
                ],
                "image": null
            },
            {
                "id": 11,
                "title": "101 способ раскрутки личного бренда. Как сделать себе имя",
                "issueYear": "2019",
                "authors": [
                    "Вячеслав Семенчук"
                ],
                "image": null
            },
        ],
    },
};

const BOOK_34 = {
    "id": 34,
    "title": "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
    "rating": null,
    "issueYear": "2020",
    "description": "Практичные, проверенные и обоснованные приемы, которые помогут очистить папку \"Входящие\", сберечь самый важный ресурс - мыслетопливо, сделать список задач реально работающим и гарантированно добиваться результатов.",
    "publish": "Манн, Иванов и Фербер",
    "pages": "368",
    "cover": "Твердый переплет",
    "weight": "520",
    "format": "60х90/16",
    "ISBN": "978-5-00146-752-6",
    "producer": "АО «Первая образцовая типография» ",
    "authors": [
        "Максим Дорофеев"
    ],
    "images": [
        {
            "url": "/uploads/10584051_0_Dzhedayskie_tehniki_Kak_vospitat_svoyu_obezyanu_opustoshit_inboks_i_sberech_misletoplivo_Maksim_Dorofeev_0805fefdb1.jpg"
        }
    ],
    "categories": [
        "Бизнес"
    ],
    "comments": null,
    "booking": null,
    "delivery": null,
    "histories": [
        {
            "id": 81,
            "userId": 22
        }
    ]
}
const BOOK_94 = {
    "id": 94,
    "title": "Так говорили мудрецы. Афоризмы",
    "rating": 1,
    "issueYear": "2016",
    "description": "В книгу включены афоризмы и крылатые выражения выдающихся людей - писателей, политиков, ученых, поэтов с древнейших времен до наших дней. \nДанное издание пригодится в работе журналистам, филологам, философам, студентам-гуманитариям и всем, кто хочет научиться ярко, кратко и убедительно формулировать свои мысли.",
    "publish": "Центрполиграф",
    "pages": "416",
    "cover": "Твердый переплет",
    "weight": "470",
    "format": "80x100/32",
    "ISBN": "5-9524-2139-3",
    "producer": "ЗАО \"Центрполиграф\"",
    "authors": [
        "С. Барсов"
    ],
    "images": [
        {
            "url": "/uploads/Tak_govorili_mudretsy_Aforizmy_061dc9816a.jpeg"
        }
    ],
    "categories": [
        "Нон-фикшн"
    ],
    "comments": [
        {
            "id": 349,
            "rating": 1,
            "text": "profile page test text",
            "createdAt": "2023-03-15T12:07:28.047Z",
            "user": {
                "commentUserId": 123,
                "firstName": "Igor",
                "lastName": "Shidlovsky",
                "avatarUrl": "/uploads/thumbnail_cypress_d83da60230.jpg"
            }
        }
    ],
    "booking": null,
    "delivery": null,
    "histories": [
        {
            "id": 81,
            "userId": 22
        }
    ]
}
const USER_NO_BOOKING = {
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
            id: 23,
            rating: 4,
            text: 'Читабельно',
            bookId: 71,
        },
        {
            id: 24,
            rating: 3,
            text: 'дядя Алех',
            bookId: 38,
        },
        {
            id: 27,
            rating: 3,
            text: 'Отзыв',
            bookId: 94,
        },
    ],
    avatar: '/uploads/cypress_a55ead3e6e.jpg',
    booking: {
        id: null,
        order: null,
        dateOrder: null,
        book: null,
    },
    delivery: {
        id: 460,
        handed: true,
        dateHandedFrom: "2023-03-06T18:44:05.903Z",
        dateHandedTo: "2023-03-20T18:44:05.903Z",
        book: {
            id: 71,
            title: "Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал",
            issueYear: "2020",
            authors: [
                "Сатья Дас"
            ],
            image: null
        }
    },
    history: {
        id: 81,
        books: [
            {
                id: 34,
                title: "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
                issueYear: "2020",
                authors: [
                    "Максим Дорофеев"
                ],
                image: null
            },
            {
                id: 52,
                title: "15 секретов управления временем. Как успешные люди успевают всё",
                issueYear: "2019",
                authors: [
                    "Кевин Круз"
                ],
                image: null
            },
        ],
    },
};
const USER_NO_DELIVERY = {
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
            id: 23,
            rating: 4,
            text: 'Читабельно',
            bookId: 71,
        },
        {
            id: 24,
            rating: 3,
            text: 'дядя Алех',
            bookId: 38,
        },
        {
            id: 27,
            rating: 3,
            text: 'Отзыв',
            bookId: 94,
        },
    ],
    avatar: '/uploads/cypress_a55ead3e6e.jpg',
    booking: {
        id: 185,
        order: true,
        dateOrder: '2023-03-13T00:00:00.000Z',
        book: {
            id: 25,
            title: 'Жажда',
            issueYear: '2018',
            authors: ['Игорь Рыбаков'],
            image: null,
        },
    },
    delivery: {
        id: null,
        order: null,
        dateOrder: null,
        book: null,
    },
    history: {
        id: 81,
        books: [
            {
                id: 34,
                title: "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
                issueYear: "2020",
                authors: [
                    "Максим Дорофеев"
                ],
                image: null
            },
            {
                id: 52,
                title: "15 секретов управления временем. Как успешные люди успевают всё",
                issueYear: "2019",
                authors: [
                    "Кевин Круз"
                ],
                image: null
            },
        ],
    },
};
const USER_NO_HISTORY = {
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
            id: 23,
            rating: 4,
            text: 'Читабельно',
            bookId: 71,
        },
        {
            id: 24,
            rating: 3,
            text: 'дядя Алех',
            bookId: 38,
        },
        {
            id: 27,
            rating: 3,
            text: 'Отзыв',
            bookId: 94,
        },
    ],
    avatar: '/uploads/cypress_a55ead3e6e.jpg',
    booking: {
        id: 185,
        order: true,
        dateOrder: '2023-03-13T00:00:00.000Z',
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
        dateHandedFrom: "2023-03-06T18:44:05.903Z",
        dateHandedTo: "2023-03-20T18:44:05.903Z",
        book: {
            id: 71,
            title: "Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал",
            issueYear: "2020",
            authors: [
                "Сатья Дас"
            ],
            image: null
        }
    },
    history: {
        id: null,
        books: null,
    },
};
const USER_EXPIRED_BOOKING = {
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
            id: 23,
            rating: 4,
            text: 'Читабельно',
            bookId: 71,
        },
        {
            id: 24,
            rating: 3,
            text: 'дядя Алех',
            bookId: 38,
        },
        {
            id: 27,
            rating: 3,
            text: 'Отзыв',
            bookId: 94,
        },
    ],
    avatar: '/uploads/cypress_a55ead3e6e.jpg',
    booking: {
        id: 185,
        order: true,
        dateOrder: '2023-03-13T00:00:00.000Z',
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
        dateHandedTo: '2023-03-20T18:44:05.903Z',
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
        ],
    },
};
const USER_EXPIRED_HANDED = {
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
            id: 23,
            rating: 4,
            text: 'Читабельно',
            bookId: 71,
        },
        {
            id: 24,
            rating: 3,
            text: 'дядя Алех',
            bookId: 38,
        },
        {
            id: 27,
            rating: 3,
            text: 'Отзыв',
            bookId: 94,
        },
    ],
    avatar: '/uploads/cypress_a55ead3e6e.jpg',
    booking: {
        id: 185,
        order: true,
        dateOrder: '2023-12-13T00:00:00.000Z',
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
        dateHandedTo: '2023-03-13T18:44:05.903Z',
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
        ],
    },
};
// 3000 строк доя ускорения тестов =)
const BOOKS =
    [
        {
            "issueYear": "2019",
            "rating": 3.33,
            "title": "Построение бизнес-моделей: Настольная книга стратега и новатора",
            "authors": [
                "Александр Остервальдер"
            ],
            "image": {
                "url": "/uploads/10209755_0_Postroenie_biznes_modeley_Nastolnaya_kniga_stratega_i_novatora_Aleksandr_Ostervalder_Iv_Pine_931aabe20f.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 2,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3.25,
            "title": "Разработка ценностных предложений: Как создавать товары и услуги, которые захотят купить потребители",
            "authors": [
                "Александр Остервальдер"
            ],
            "image": {
                "url": "/uploads/10442229_0_5d1c5827e4.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 3,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 78,
                    "userId": 5
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": 3.25,
            "title": "Хулиномика 3.0: хулиганская экономика. Еще толще. Еще длиннее",
            "authors": [
                "Алексей Марков"
            ],
            "image": {
                "url": "/uploads/10849349_0_89b742cffa.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 4,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 40,
                    "userId": 6
                }
            ]
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Жлобология. Откуда берутся деньги и почему не у меня",
            "authors": [
                "Алексей Марков"
            ],
            "image": {
                "url": "/uploads/10827932_0_b1fc6336fa.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 5,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                }
            ]
        },
        {
            "issueYear": "2018",
            "rating": 1,
            "title": "Разумный инвестор: Полное руководство по стоимостному инвестированию",
            "authors": [
                "Бенджамин Грэм"
            ],
            "image": {
                "url": "/uploads/1027828_0_93fce05fab.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 6,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3,
            "title": "Мастер времени",
            "authors": [
                "Брайан Трейси"
            ],
            "image": {
                "url": "/uploads/10689720_0_Master_vremeni_Brayan_Treysi_e841bace3e.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 7,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Дожим клиента: 28 способов продавать день в день",
            "authors": [
                "Владимир Якуба"
            ],
            "image": {
                "url": "/uploads/e912cd09078d6995ed49cececff66be7_e52b9aa044.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 8,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 4,
            "title": "Продажник на всю голову: Крутые стратегии профессионала",
            "authors": [
                "Владимир Якуба"
            ],
            "image": {
                "url": "/uploads/10782569_0_3cdfa87016.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 9,
            "booking": {
                "id": 298,
                "order": true,
                "dateOrder": "2023-03-14T21:00:00.000Z",
                "customerId": 24,
                "customerFirstName": "test",
                "customerLastName": "user"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 3.4,
            "title": "Продажник идет в сеть. Как продавать через мессенджеры и соцсети",
            "authors": [
                "Владмир Якуба"
            ],
            "image": {
                "url": "/uploads/10903761_0_dd519b2e4c.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 10,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 9,
                    "userId": 2
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": 1.67,
            "title": "101 способ раскрутки личного бренда. Как сделать себе имя",
            "authors": [
                "Вячеслав Семенчук"
            ],
            "image": {
                "url": "/uploads/10859003_0_134ef8a55d.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 11,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 7,
                    "userId": 4
                },
                {
                    "id": 59,
                    "userId": 11
                },
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2020",
            "rating": 2.8,
            "title": "Сам себе бренд: Искусство самопрезентации",
            "authors": [
                "Гарри Беквит"
            ],
            "image": {
                "url": "/uploads/10858981_0_Sam_sebe_brend_Iskusstvo_samoprezentacii_m_Rarri_Bekvit_Kristin_Bekvit_36345dbe51.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 12,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2,
            "title": "Продавая незримое: Руководство по современному маркетингу услуг",
            "authors": [
                "Гарри Беквит"
            ],
            "image": {
                "url": "/uploads/10791050_0_a50d785fac.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 13,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 2.5,
            "title": "Дело не в кофе: Корпоративная культура Sturbucks",
            "authors": [
                "Говард Бехард"
            ],
            "image": {
                "url": "/uploads/1047625_0_bf65328c95.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 14,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Корпоративная культура Toyota: Уроки для других компаний",
            "authors": [
                "Джеффри Лайкер"
            ],
            "image": {
                "url": "/uploads/10152616_0_a027f27f41.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 15,
            "booking": null,
            "delivery": {
                "id": 461,
                "handed": true,
                "dateHandedFrom": "2023-03-12T21:00:00.000Z",
                "dateHandedTo": "2023-03-26T21:00:00.000Z",
                "recipientId": 1,
                "recipientFirstName": "Aliaksei",
                "recipientLastName": "Valadzko"
            },
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "От хорошего к великому. Почему одни компании совершают прорыв, а другие нет...",
            "authors": [
                "Джим Коллинз"
            ],
            "image": {
                "url": "/uploads/10604070_0_fdde108c97.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 16,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Деньги делают деньги: От зарплаты до финансовой свободы",
            "authors": [
                "Дмитрий Лебедев"
            ],
            "image": {
                "url": "/uploads/10926443_0_Dengi_delayut_dengi_Dmitriy_Lebedev_fe1c25beb7.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 17,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                }
            ]
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Как привести дела в порядок. Искусство продуктивности без стресса",
            "authors": [
                "Дэвид Аллен"
            ],
            "image": {
                "url": "/uploads/1030681_0_Kak_privesti_dela_v_poryadok_iskusstvo_produktivnosti_bez_stressa_Devid_Allen_ed426c115e.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 18,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Жесткий менеджмент. Заставьте людей работать на результат",
            "authors": [
                "Дэн Кеннеди"
            ],
            "image": {
                "url": "/uploads/10408083_0_Zhestkiy_menedzhment_Zastavte_lyudey_rabotat_na_rezultat_Den_Kennedi_7020239fe7.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 19,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "ВкусВилл: Как совершить революцию в ритейле, делая все не так",
            "authors": [
                "Евгений Щепин"
            ],
            "image": {
                "url": "/uploads/10777060_0_8debcb706d.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 20,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Энергия клиента: Как окупается клиентский (человеческий) подход в бизнесе",
            "authors": [
                "Евгений Щепин"
            ],
            "image": {
                "url": "/uploads/10965486_0_9ec35a4c2c.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 21,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Big Money: принципы первых. Откровенно о бизнесе и жизни успешных предпринимателей",
            "authors": [
                "Евгений Черняк"
            ],
            "image": {
                "url": "/uploads/10861429_0_b4e5a2c768.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 22,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2.5,
            "title": "Точки контакта. Простые идеи для улучшения вашего маркетинга",
            "authors": [
                "Игорь Манн"
            ],
            "image": {
                "url": "/uploads/10252955_0_Tochki_kontakta_Prostie_idei_dlya_uluchsheniya_vashego_marketinga_Igor_Mann_Dmitriy_Turusin_ac8ddffebc.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 23,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3.4,
            "title": "Номер 1. Как стать лучшим в том, что ты делаешь",
            "authors": [
                "Игорь Манн"
            ],
            "image": {
                "url": "/uploads/10355756_0_1babae347a.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 24,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                }
            ]
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Жажда",
            "authors": [
                "Игорь Рыбаков"
            ],
            "image": {
                "url": "/uploads/Igor_Rybakov_Zhazhda_03e6027493.jpeg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 25,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 3.5,
            "title": "Действуй! 10 заповедей успеха",
            "authors": [
                "Ицхак Пинтосевич"
            ],
            "image": {
                "url": "/uploads/10217872_0_ae066e6b54.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 26,
            "booking": {
                "id": 404,
                "order": true,
                "dateOrder": "2023-03-16T00:00:00.000Z",
                "customerId": 406,
                "customerFirstName": "Andrew",
                "customerLastName": "Kirichenko"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2014",
            "rating": 3,
            "title": "Клиенты на всю жизнь",
            "authors": [
                "Карл Сьюэлл"
            ],
            "image": {
                "url": "/uploads/1017697_0_Klienti_na_vsyu_zhizn_Karl_Syuell_Pol_Braun_b1e187d02c.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 27,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Гиперфокус: Как я научился делать больше, тратя меньше времени",
            "authors": [
                "Крис Бэйли"
            ],
            "image": {
                "url": "/uploads/Kris_Bejli_Giperfokus_Kak_ya_nauchilsya_delat_bolshe_tratya_menshe_vremeni_57ded37b41.jpeg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 28,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Финансы для нефинансистов",
            "authors": [
                "Людмила Ярухина"
            ],
            "image": {
                "url": "/uploads/10613523_0_3d0607073f.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 29,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 3.4,
            "title": "Тонкое искусство пофигизма: Парадоксальный способ жить счастливо",
            "authors": [
                "Марк Мэнсон"
            ],
            "image": {
                "url": "/uploads/10614134_0_1e5d8cd9e0.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 30,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "45 татуировок менеджера. Правила российского руководителя",
            "authors": [
                "Максим Батырев (Комбат)"
            ],
            "image": {
                "url": "/uploads/10327034_0_9ad72be374.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 31,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "45 татуировок личности. Правила моей жизни",
            "authors": [
                "Максим Батырев (Комбат)"
            ],
            "image": {
                "url": "/uploads/10761206_0_9e2b334fb5.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 32,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Путь джедая. Поиск собственной методики продуктивности",
            "authors": [
                "Максим Дорофеев"
            ],
            "image": {
                "url": "/uploads/10902363_0_Put_dzhedaya_Poisk_sobstvennoy_metodiki_produktivnosti_Maksim_Dorofeev_74dfef5bd5.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 33,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 2,
            "title": "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
            "authors": [
                "Максим Дорофеев"
            ],
            "image": {
                "url": "/uploads/10584051_0_Dzhedayskie_tehniki_Kak_vospitat_svoyu_obezyanu_opustoshit_inboks_i_sberech_misletoplivo_Maksim_Dorofeev_0805fefdb1.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 34,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Пиши, сокращай: Как создавать сильный текст",
            "authors": [
                "Максим Ильяхов"
            ],
            "image": {
                "url": "/uploads/10534756_0_e30262d68c.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 35,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Ясно, понятно. Как доносить мысли и убеждать людей с помощью слов",
            "authors": [
                "Максим Ильяхов"
            ],
            "image": {
                "url": "/uploads/10962043_0_f5936c92f7.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 36,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Рискуя собственной шкурой: Скрытая асимметрия повседневной жизни",
            "authors": [
                "Нассим Талеб"
            ],
            "image": {
                "url": "/uploads/10734923_0_3735db09cc.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 37,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2012",
            "rating": 2.75,
            "title": "Как стать бизнесменом",
            "authors": [
                "Олег Тиньков"
            ],
            "image": {
                "url": "/uploads/10204302_0_c3bb9afbeb.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 38,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                },
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Дизайн-мышление. Все инструметы в одной книге",
            "authors": [
                "Оливер Кемпкенс"
            ],
            "image": {
                "url": "/uploads/10885498_0_27f9e6e81b.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 39,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "От нуля к единице. Как создать стартап, который изменит будущее",
            "authors": [
                "Питер Тиль"
            ],
            "image": {
                "url": "/uploads/10394145_0_47ee8ad494.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 40,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                }
            ]
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Спроси маму",
            "authors": [
                "Роб Фитцпатрик"
            ],
            "image": {
                "url": "/uploads/10968986_0_34ca8465ed.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 41,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 3,
                    "userId": 1
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Клуб \"5 часов утра\". Секрет личной эффективности от монаха, который продал свой \"феррари\".",
            "authors": [
                "Робин Шарма"
            ],
            "image": {
                "url": "/uploads/10877173_0_c2e206cb40.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 42,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Семь навыков высокоэффективных людей",
            "authors": [
                "Стивен Р. Кови"
            ],
            "image": {
                "url": "/uploads/1018520_0_101ab285cf.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 43,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Как я создал Walmart",
            "authors": [
                "Сэм Уолтон"
            ],
            "image": {
                "url": "/uploads/10549180_0_7676bfd021.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 44,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Huawei: Лидерство, корпоративная культура, открытость",
            "authors": [
                "Тао Тань"
            ],
            "image": {
                "url": "/uploads/3be5f977_ab60_48ff_9276_1308637d2131_d47b4a05d8.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 45,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Бизнес без MBA: самые важные знания о бизнесе для тех, кто начинает собственное дело",
            "authors": [
                "Тинькофф"
            ],
            "image": {
                "url": "/uploads/10802802_0_83f597a859.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 46,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Интеллект-карты. Полное руководство по мощному инструменту мышления",
            "authors": [
                "Тони Бьюзен"
            ],
            "image": {
                "url": "/uploads/10760776_0_52d5bd6da6.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 47,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Продавец обуви. Как я создал Nike",
            "authors": [
                "Фил Найт"
            ],
            "image": {
                "url": "/uploads/10911315_0_Prodavec_obuvi_Kak_ya_sozdal_Nike_Versiya_dlya_detey_i_podrostkov_Fil_Nayt_f6efe6fb47.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 48,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Додо Книга",
            "authors": [
                "Максим Котин"
            ],
            "image": {
                "url": "/uploads/Dodo_kniga_702e2a4239.jpeg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 49,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Big Money: принципы первых. Откровенно о бизнесе и жизни успешных предпринимательниц. Книга 2",
            "authors": [
                "Евгений Черняк"
            ],
            "image": {
                "url": "/uploads/b364bc3c_04d7_11e7_80c5_000c29ae1566_9b7bd3ec_f676_11ea_813d_000c29ae1566_1382b318df.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 50,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2015",
            "rating": null,
            "title": "Суперпамять",
            "authors": [
                "Тони Бьюзен"
            ],
            "image": {
                "url": "/uploads/1014568_0_4744f1508e.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 51,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "15 секретов управления временем. Как успешные люди успевают всё",
            "authors": [
                "Кевин Круз"
            ],
            "image": {
                "url": "/uploads/1032391714_c835ddfc0c.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 52,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Черный лебедь",
            "authors": [
                "Нассим Николас Талеб"
            ],
            "image": {
                "url": "/uploads/e04f4b0fb7c03ae0401996fc1028c782_25886b37d5.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 53,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Майнд-менеджмент. Решение бизнес-задач с помощью интеллект-карт",
            "authors": [
                "Сергей Бехтерев"
            ],
            "image": {
                "url": "/uploads/10792059_0_44b87ba445.jpg"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 54,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Нейромаркетинг. Как влиять на подсознание потребителя",
            "authors": [
                "Роджер Дули"
            ],
            "image": {
                "url": "/uploads/1021955469_81c91256ea.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 55,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Принципы",
            "authors": [
                "Рэй Далио"
            ],
            "image": {
                "url": "/uploads/6020019394_43b89b7ee9.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 56,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Новые правила деловой переписки",
            "authors": [
                "Максим Ильяхов"
            ],
            "image": {
                "url": "/uploads/1037902535_00bde23ac1.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 57,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Маркетинговые войны",
            "authors": [
                "Джек Траут",
                "Эл Райс"
            ],
            "image": {
                "url": "/uploads/1030904156_711e68d181.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 58,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Сделай это завтра и другие секреты тайм-менеджмента",
            "authors": [
                "Марки Форстер"
            ],
            "image": {
                "url": "/uploads/6066960809_1c3e8bf8f9.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 59,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Новая поведенческая экономика. Почему люди нарушают правила традиционной экономики и как на этом заработать",
            "authors": [
                "Ричард Талер"
            ],
            "image": {
                "url": "/uploads/6065900304_975e5c1634.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 60,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Карьера менеджера",
            "authors": [
                "Ли Якокка"
            ],
            "image": {
                "url": "/uploads/1009079162_8a69bcb3f9.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 61,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Тестирование бизнес-идей",
            "authors": [
                "Дэвид Блэнд",
                "Алекс Остервальдер"
            ],
            "image": {
                "url": "/uploads/6084791398_dba0a3b1fc.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 62,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Непобедимая компания: Как непрерывно обновлять бизнес-модель вашей организации, вдохновляясь опытом лучших",
            "authors": [
                "Алекс Остервальдер",
                "Ив Пинье",
                "Фред Этьембль",
                "Алан Смит"
            ],
            "image": {
                "url": "/uploads/6061593167_01f052bf69.webp"
            },
            "categories": [
                "Бизнес"
            ],
            "id": 63,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Счастливый ребенок. Универсальные правила",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/6060732985_6d5f8bb332.webp"
            },
            "categories": [
                "Психология",
                "Родителям"
            ],
            "id": 64,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2015",
            "rating": 3.86,
            "title": "Практический курс счастья",
            "authors": [
                "Джон Кехо"
            ],
            "image": {
                "url": "/uploads/1012371255_a3c279632b.webp"
            },
            "categories": [
                "Психология"
            ],
            "id": 65,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Подсознание может все!",
            "authors": [
                "Джон Кехо"
            ],
            "image": {
                "url": "/uploads/1027833789_d26d341cc1.webp"
            },
            "categories": [
                "Психология"
            ],
            "id": 66,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Мой продуктивный год: Как я проверил самые известные методики личной эффективности",
            "authors": [
                "Крис Бэйли"
            ],
            "image": {
                "url": "/uploads/10571472_0_b89c0f6a0d.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 67,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Женское достоинство - сила притяжения мужчин",
            "authors": [
                "Мила Левчук"
            ],
            "image": {
                "url": "/uploads/10648955_0_1db6c2472e.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 68,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 3.86,
            "title": "Хочу и буду",
            "authors": [
                "Михаил Лабковский"
            ],
            "image": {
                "url": "/uploads/10582784_0_6ba1f42ade.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 69,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Поток: Психология оптимального переживания",
            "authors": [
                "Михай Чиксентмихайи"
            ],
            "image": {
                "url": "/uploads/10274442_0_2cf1ad9ecf.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 70,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Нескучная детская психология. Как общаться с ребенком, чтобы он вас слушался, и слышал",
            "authors": [
                "Сатья Дас"
            ],
            "image": {
                "url": "/uploads/10949964_0_Neskuchnaya_detskaya_psihologiya_Kak_obschatsya_s_rebenkom_chtobi_on_vas_i_slushalsya_i_slishal_Satya_Das_28c77fde4b.jpg"
            },
            "categories": [
                "Психология",
                "Родителям"
            ],
            "id": 71,
            "booking": null,
            "delivery": {
                "id": 460,
                "handed": true,
                "dateHandedFrom": "2023-03-06T18:44:05.903Z",
                "dateHandedTo": "2023-03-20T18:44:05.903Z",
                "recipientId": 22,
                "recipientFirstName": "Igor",
                "recipientLastName": "Shidlovsky"
            },
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Выгорание. Новый подход к избавлению от стресса",
            "authors": [
                "Эмили Нагоски "
            ],
            "image": {
                "url": "/uploads/10909446_0_88340ab92c.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 72,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Медитация и  осознанность: 10 минут в день, которые приведут ваши мысли в порядок",
            "authors": [
                "Энди Паддикомб"
            ],
            "image": {
                "url": "/uploads/10385271_0_7a930430ca.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 73,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Игры, в корторые играют люди",
            "authors": [
                "Эрик Берн"
            ],
            "image": {
                "url": "/uploads/10565611_0_Igri_v_kotorie_igrayut_lyudi_m_Erik_Bern_001fda3be0.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 74,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Люди, которые играют в игры",
            "authors": [
                "Эрик Берн"
            ],
            "image": {
                "url": "/uploads/ljudi_kotorie_igrajut_v_igri_800x800_d1c05e670f.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 75,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Сила воли. Как развить и укрепить",
            "authors": [
                "Келли Макгонигал"
            ],
            "image": {
                "url": "/uploads/6053518200_478b4a0254.webp"
            },
            "categories": [
                "Психология"
            ],
            "id": 76,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Уверенность. Внятное руководство по избавлению от страхов, комплексов и тревог",
            "authors": [
                "Кэролайн Форен"
            ],
            "image": {
                "url": "/uploads/41821787_kerolayn_foren_uverennost_9014e969b5.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 77,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Красная таблетка (книга №1)",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/10689132_0_cabcde68c0.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 78,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Красная таблетка-2. Вся правда об успехе",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/10909152_0_cc5f53fcd4.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 79,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Чертоги разума",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/10718454_0_eba76b8c65.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 80,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Нанопривычки. Маленькие шаги, которые приведут к большим переменам",
            "authors": [
                "Би Джей Фогг"
            ],
            "image": {
                "url": "/uploads/10952394_0_4090195633.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 81,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Осознанное счастье",
            "authors": [
                "Пакчок Ринпоче",
                "Эррик Соломон"
            ],
            "image": {
                "url": "/uploads/101020558_0_1414393932.jpg"
            },
            "categories": [
                "Психология"
            ],
            "id": 82,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Секреты спокойствия \"ленивой мамы\"",
            "authors": [
                "Анна Быкова"
            ],
            "image": {
                "url": "/uploads/10626944_0_Sekreti_spokoystviya_lenivoy_mami_Anna_Bikova_61672f37fd.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 83,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Самостоятельный ребенок, или Как стать \"ленивой мамой\"",
            "authors": [
                "Анна Быкова"
            ],
            "image": {
                "url": "/uploads/10507071_0_448402ad71.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 84,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Развивающие занятия \"ленивой мамы\"",
            "authors": [
                "Анна Быкова"
            ],
            "image": {
                "url": "/uploads/10538154_0_f08240b913.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 85,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2013",
            "rating": null,
            "title": "Ваш ребенок от 0 до 3. Книга для молодых родителей",
            "authors": [
                "Елена Смирнова"
            ],
            "image": {
                "url": "/uploads/2389005_detail_c289579b34.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 86,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Если с ребенком трудно",
            "authors": [
                "Людмила Петрановская"
            ],
            "image": {
                "url": "/uploads/6953094_1_fb4c5afd73.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 87,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2010",
            "rating": null,
            "title": "Методика раннего развития. От 6месяцев до 6 лет",
            "authors": [
                "Мария Монтессори"
            ],
            "image": {
                "url": "/uploads/1052205_0_Metodika_rannego_razvitiya_Marii_Montessori_Ot_6_mesyacev_do_6_let_Viktoriya_Dmitrieva_c299bc93fd.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 88,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Мани, или Азбука денег",
            "authors": [
                "Бодо Шефер"
            ],
            "image": {
                "url": "/uploads/1000351843_5be4c2c9fb.webp"
            },
            "categories": [
                "Бизнес",
                "Родителям"
            ],
            "id": 89,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Воспитывая счастливых людей… Как не лишить ребенка детства в погоне за званием \"идеальный родитель\"",
            "authors": [
                "Любвь Сурудо"
            ],
            "image": {
                "url": "/uploads/4389878_af7a651f38.jpg"
            },
            "categories": [
                "Родителям"
            ],
            "id": 90,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": null,
            "title": "Зачем мы спим.Новая наука о сне и сноведениях",
            "authors": [
                "Мэттью Уолкер"
            ],
            "image": {
                "url": "/uploads/10747771_0_418ede3589.jpg"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 91,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 5,
            "title": "Homo Deus. Краткая история будущего",
            "authors": [
                "Юваль Ной Харари"
            ],
            "image": {
                "url": "/uploads/10673454_0_Homo_Deus_Kratkaya_istoriya_buduschego_Yuval_Harari_3d5bdcbd1f.jpg"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 92,
            "booking": {
                "id": 425,
                "order": true,
                "dateOrder": "2023-03-16T00:00:00.000Z",
                "customerId": 451,
                "customerFirstName": "adA9",
                "customerLastName": "adA9"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "21 урок для XXI века",
            "authors": [
                "Юваль Ной Харари"
            ],
            "image": {
                "url": "/uploads/10919897_0_2c9b74c1ff.jpg"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 93,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": 1,
            "title": "Так говорили мудрецы. Афоризмы",
            "authors": [
                "С. Барсов"
            ],
            "image": {
                "url": "/uploads/Tak_govorili_mudretsy_Aforizmy_061dc9816a.jpeg"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 94,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 81,
                    "userId": 22
                }
            ]
        },
        {
            "issueYear": "2021",
            "rating": null,
            "title": "Как быть стоиком",
            "authors": [
                "Массимо Пильюччи"
            ],
            "image": {
                "url": "/uploads/6059543389_ea1dbc93a6.webp"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 95,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2021",
            "rating": 4,
            "title": "Говори  красиво и уверенно. Постановка голоса и речи",
            "authors": [
                "Евгения Шестакова"
            ],
            "image": {
                "url": "/uploads/1005691015_7064cebb9c.webp"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 96,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 4,
            "title": "Краткая история почти всего на свете",
            "authors": [
                "Билл Брайсон"
            ],
            "image": {
                "url": "/uploads/kratkaya_istoriya_pochti_vsego_na_svete_5792ee1da1.jpg"
            },
            "categories": [
                "Нон-фикшн"
            ],
            "id": 97,
            "booking": {
                "id": 424,
                "order": true,
                "dateOrder": "2023-03-15T21:00:00.000Z",
                "customerId": 358,
                "customerFirstName": "Dmitry",
                "customerLastName": "Dmitry"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3,
            "title": "Атлант расправил плечи. Часть первая. Непротиворечие",
            "authors": [
                "Айн Рэнд"
            ],
            "image": {
                "url": "/uploads/6049001435_e5b5774cb1.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 98,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3.17,
            "title": "Атлант расправил плечи. Часть вторая. Или-или",
            "authors": [
                "Айн Рэнд"
            ],
            "image": {
                "url": "/uploads/6049001426_da8eb22c3b.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 99,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 3,
            "title": "Атлант расправил плечи. Часть третья. А есть А",
            "authors": [
                "Айн Рэнд"
            ],
            "image": {
                "url": "/uploads/6049001431_06f4e779f2.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 100,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 1,
            "title": "Маленький принц",
            "authors": [
                "Антуан де Сент-Экзюпери"
            ],
            "image": {
                "url": "/uploads/cover_a6724f3043.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 101,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2010",
            "rating": null,
            "title": "Понедельник начинается в субботу",
            "authors": [
                "Аркадий и Борис Стругацкие"
            ],
            "image": {
                "url": "/uploads/31671_eb7f1b6d7d.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 102,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2012",
            "rating": null,
            "title": "Москва-Петушки",
            "authors": [
                "Венедикт Ерофеев"
            ],
            "image": {
                "url": "/uploads/1035586_0_e948159aa3.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 103,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2011",
            "rating": 2.33,
            "title": "Записки о Шерлоке Холмсе",
            "authors": [
                "Артур Конан Дойл"
            ],
            "image": {
                "url": "/uploads/10191824_0_Zapiski_o_Sherloke_Holmse_Ser_Artur_Konan_Doyl_55742abb3f.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 104,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 1,
            "title": "Сто лет одиночества",
            "authors": [
                "Габриэль Гарсия Маркес"
            ],
            "image": {
                "url": "/uploads/10609309_0_6a3fca8133.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 105,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": 1,
            "title": "Полковнику никто не пишет",
            "authors": [
                "Габриэль Гарсия Маркес"
            ],
            "image": {
                "url": "/uploads/10348653_0_369c9c1da5.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 106,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Вызовите акушерку. Тени Ист-Энда",
            "authors": [
                "Дженифер Уорф"
            ],
            "image": {
                "url": "/uploads/10659753_0_de555cef7f.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 107,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Вызовите акушерку. Прощание с Ист-Эндом",
            "authors": [
                "Дженифер Уорф"
            ],
            "image": {
                "url": "/uploads/10680603_0_08dfd7eeb0.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 108,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Сильмариллион",
            "authors": [
                "Джон Р.Р. Толкин"
            ],
            "image": {
                "url": "/uploads/10492145_0_82521e341f.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 109,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Таинственная история Билли Миллигана",
            "authors": [
                "Дэниел Киз"
            ],
            "image": {
                "url": "/uploads/1037906861_b5adeceb25.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 110,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2012",
            "rating": null,
            "title": "Титаник",
            "authors": [
                "Милош Губачек"
            ],
            "image": {
                "url": "/uploads/1015870_0_bcc252d7e3.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 111,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": 1,
            "title": "Кодекс порядочных людей, или о способах не попасться на удочку мошенника",
            "authors": [
                "Оноре де Бальзак"
            ],
            "image": {
                "url": "/uploads/Onore_de_Balzak_Kodeks_poryadochnyh_lyudej_462b084835.jpeg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 112,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Летнее утро, летняя ночь",
            "authors": [
                "Рэй Бредбери"
            ],
            "image": {
                "url": "/uploads/6016428258_19dfc630df.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 113,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Здесь была Бритт-Мари",
            "authors": [
                "Фредерик Бакман"
            ],
            "image": {
                "url": "/uploads/10673471_0_636c0df653.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 114,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 1,
            "title": "Люди, которые всегда со мной",
            "authors": [
                "Наринэ Абгарян"
            ],
            "image": {
                "url": "/uploads/Narine_Abgaryan_Lyudi_kotorye_vsegda_so_mnoj_9aae66ae54.jpeg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 115,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2014",
            "rating": null,
            "title": "От полудня до полуночи",
            "authors": [
                "Эрих Мария Ремарк"
            ],
            "image": {
                "url": "/uploads/Erih_Mariya_Remark_Ot_poludnya_do_polunochi_sbornik_0ac31a5be6.jpeg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 116,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Все мои женщины. Пробуждение",
            "authors": [
                "Януш Леон Вишневский"
            ],
            "image": {
                "url": "/uploads/10650207_0_55eef08c8b.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 117,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 1,
            "title": "Маленькие женщины",
            "authors": [
                "Луиза Мэй Олкотт"
            ],
            "image": {
                "url": "/uploads/B08_JH_5_T9_J6_01_SCLZZZZZZZ_SX_500_a9e8d4d2f9.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 118,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 4,
            "title": "Гарри Поттер и проклятое дитя",
            "authors": [
                "Дж. К. Роулинг "
            ],
            "image": {
                "url": "/uploads/10679903_0_7bbab522e0.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 119,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2017",
            "rating": null,
            "title": "Harry Potter and the Philosopher's Stone",
            "authors": [
                "J. K. Rowling"
            ],
            "image": {
                "url": "/uploads/51_Pc_U_Ahn15_L_2d1e67f1ea.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 120,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": null,
            "title": "Цветы для Элджернона",
            "authors": [
                "Дэниел Киз"
            ],
            "image": {
                "url": "/uploads/6053509628_653f992e84.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 121,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Дом в котором...Том 1. Курильщик",
            "authors": [
                "Мариам Петросян"
            ],
            "image": {
                "url": "/uploads/38078_90f4a2d616.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 122,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Дом в котором...Том 2. Шакалиный восьмидневник",
            "authors": [
                "Мариам Петросян"
            ],
            "image": {
                "url": "/uploads/38082_0e54508629.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 123,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Дом в котором...Том 3. Пустые гнезда",
            "authors": [
                "Мариам Петросян"
            ],
            "image": {
                "url": "/uploads/38088_48b123ff43.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 124,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": null,
            "title": "Дневник домового",
            "authors": [
                "Евгений ЧеширКо"
            ],
            "image": {
                "url": "/uploads/6008888071_1200fc05f9.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 125,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2014",
            "rating": null,
            "title": "The Picture  of Dorian Gray",
            "authors": [
                "Wilde Oscar"
            ],
            "image": {
                "url": "/uploads/81f_RD_4_Ez_Go_L_15c4048a79.jpg"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 126,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2010",
            "rating": 3.29,
            "title": "Чистый код: создание, анализ и рефакторинг. Библиотека прогаммиста",
            "authors": [
                "Роберт Мартин "
            ],
            "image": {
                "url": "/uploads/1001563239_b0cf866a9f.webp"
            },
            "categories": [
                "Программирование"
            ],
            "id": 127,
            "booking": null,
            "delivery": null,
            "histories": [
                {
                    "id": 79,
                    "userId": 14
                }
            ]
        },
        {
            "issueYear": "2014",
            "rating": 2.75,
            "title": "Java. Объектно-ориентированное программирование",
            "authors": [
                "Алексей Николаевич"
            ],
            "image": {
                "url": "/uploads/6012958582_79835de350.webp"
            },
            "categories": [
                "Программирование"
            ],
            "id": 128,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 2,
            "title": "Теоретический минимум по Computer Science. Все, что нужно знать программисту и разработчику",
            "authors": [
                "Владсон Феррейра Фило"
            ],
            "image": {
                "url": "/uploads/1022639997_0f1c06f920.webp"
            },
            "categories": [
                "Программирование"
            ],
            "id": 129,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2.67,
            "title": "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
            "authors": [
                "Адитья Бхаргава"
            ],
            "image": {
                "url": "/uploads/image_book_c27c1aaf74.jpg"
            },
            "categories": [
                "Программирование"
            ],
            "id": 130,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2016",
            "rating": 3.5,
            "title": "Вино. Практический путеводитель",
            "authors": [
                "Мадлен Пакетт"
            ],
            "image": {
                "url": "/uploads/10516002_0_58deebd77f.jpg"
            },
            "categories": [
                "Хобби"
            ],
            "id": 131,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2,
            "title": "Дизайн. Книга для недизайнеров",
            "authors": [
                "Робин Уильямс"
            ],
            "image": {
                "url": "/uploads/1025027525_a2e92c2a7b.webp"
            },
            "categories": [
                "Дизайн"
            ],
            "id": 132,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2,
            "title": "Школа дизайна. Шрифт",
            "authors": [
                "Ричард Пулин"
            ],
            "image": {
                "url": "/uploads/10907435_0_3937c2d1d6.jpg"
            },
            "categories": [
                "Дизайн"
            ],
            "id": 133,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2.33,
            "title": "Школа дизайна. Макет",
            "authors": [
                "Ричард Пулин"
            ],
            "image": {
                "url": "/uploads/10905898_0_e15299a48e.jpg"
            },
            "categories": [
                "Дизайн"
            ],
            "id": 134,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 3,
            "title": "Как быть счастливым?",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": null,
            "categories": [
                "Детские"
            ],
            "id": 135,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2020",
            "rating": 4,
            "title": "Как научиться дружить?",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/ph_001_4a638f1923.webp"
            },
            "categories": [
                "Детские"
            ],
            "id": 136,
            "booking": {
                "id": 319,
                "order": true,
                "dateOrder": "2023-03-15T21:00:00.000Z",
                "customerId": 289,
                "customerFirstName": "Котик",
                "customerLastName": "Бурко"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 3.25,
            "title": "Как устроен мозг?",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/cover1_a4e57025a3.webp"
            },
            "categories": [
                "Детские"
            ],
            "id": 137,
            "booking": null,
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2019",
            "rating": 2,
            "title": "Как исполняются мечты?",
            "authors": [
                "Андрей Курпатов"
            ],
            "image": {
                "url": "/uploads/cover2_aa0efc07fa.webp"
            },
            "categories": [
                "Детские"
            ],
            "id": 138,
            "booking": {
                "id": 308,
                "order": true,
                "dateOrder": "2023-03-14T00:00:00.000Z",
                "customerId": 22,
                "customerFirstName": "Igor",
                "customerLastName": "Shidlovsky"
            },
            "delivery": null,
            "histories": null
        },
        {
            "issueYear": "2018",
            "rating": null,
            "title": "Harry Potter and the Chamber of Secrets",
            "authors": [
                "J. K. Rowling"
            ],
            "image": {
                "url": "/uploads/6016615311_edce0c111d.webp"
            },
            "categories": [
                "Художественная литература"
            ],
            "id": 139,
            "booking": null,
            "delivery": null,
            "histories": null
        }
    ]

const CATEGORIES = [
    {
        "name": "Бизнес",
        "path": "business",
        "id": 1
    },
    {
        "name": "Психология",
        "path": "psychology",
        "id": 2
    },
    {
        "name": "Родителям",
        "path": "parents",
        "id": 3
    },
    {
        "name": "Нон-фикшн",
        "path": "non-fiction",
        "id": 4
    },
    {
        "name": "Художественная литература",
        "path": "fiction",
        "id": 5
    },
    {
        "name": "Программирование",
        "path": "programming",
        "id": 6
    },
    {
        "name": "Хобби",
        "path": "hobby",
        "id": 7
    },
    {
        "name": "Дизайн",
        "path": "design",
        "id": 8
    },
    {
        "name": "Детские",
        "path": "childish",
        "id": 9
    },
    {
        "name": "Другое",
        "path": "other",
        "id": 10
    }
]

const login = 'TestUser1';
const pass = 'Qwerty123';

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
                    "id": 34,
                    "title": "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
                    "issueYear": "2020",
                    "authors": [
                        "Максим Дорофеев"
                    ],
                    "image": null
                },
                {
                    "id": 52,
                    "title": "15 секретов управления временем. Как успешные люди успевают всё",
                    "issueYear": "2019",
                    "authors": [
                        "Кевин Круз"
                    ],
                    "image": null
                },
                {
                    "id": 94,
                    "title": "Так говорили мудрецы. Афоризмы",
                    "issueYear": "2016",
                    "authors": [
                        "С. Барсов"
                    ],
                    "image": null
                },
                {
                    "id": 11,
                    "title": "101 способ раскрутки личного бренда. Как сделать себе имя",
                    "issueYear": "2019",
                    "authors": [
                        "Вячеслав Семенчук"
                    ],
                    "image": null
                },
            ],
        },
    }
};

const UPLOAD = [
    {
        "id": 375,
        "name": "294928_original.jpg",
        "alternativeText": null,
        "caption": null,
        "width": 607,
        "height": 430,
        "formats": {
            "thumbnail": {
                "name": "thumbnail_294928_original.jpg",
                "hash": "thumbnail_294928_original_748468a52a",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "path": null,
                "width": 220,
                "height": 156,
                "size": 9.38,
                "url": "/uploads/thumbnail_294928_original_748468a52a.jpg"
            },
            "small": {
                "name": "small_294928_original.jpg",
                "hash": "small_294928_original_748468a52a",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "path": null,
                "width": 500,
                "height": 354,
                "size": 33.6,
                "url": "/uploads/small_294928_original_748468a52a.jpg"
            }
        },
        "hash": "294928_original_748468a52a",
        "ext": ".jpg",
        "mime": "image/jpeg",
        "size": 33.06,
        "url": "/uploads/294928_original_748468a52a.jpg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2023-03-16T07:45:13.308Z",
        "updatedAt": "2023-03-16T07:45:13.308Z"
    }
]

const USER_AVATAR_CHANGED = {
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
    avatar: "/uploads/cypress_7b02fbc92d.jpg",
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
                "id": 34,
                "title": "Джедайские техники. Как воспитать свою обезьяну, опустошить инбокс и сберечь мыслетопливо",
                "issueYear": "2020",
                "authors": [
                    "Максим Дорофеев"
                ],
                "image": null
            },
            {
                "id": 52,
                "title": "15 секретов управления временем. Как успешные люди успевают всё",
                "issueYear": "2019",
                "authors": [
                    "Кевин Круз"
                ],
                "image": null
            },
            {
                "id": 94,
                "title": "Так говорили мудрецы. Афоризмы",
                "issueYear": "2016",
                "authors": [
                    "С. Барсов"
                ],
                "image": null
            },
            {
                "id": 11,
                "title": "101 способ раскрутки личного бренда. Как сделать себе имя",
                "issueYear": "2019",
                "authors": [
                    "Вячеслав Семенчук"
                ],
                "image": null
            },
        ],
    },
};

const requests = () => {
    cy.intercept('GET', /books/, BOOKS).as('books');
    cy.intercept('GET', /categories/, CATEGORIES).as('categories');
    cy.intercept('GET', /me/, USER_AUTH).as('me');
    cy.visit(`http://localhost:3000/`);
    cy.wait(['@books', '@categories', '@me']);
};
const getFullData = () => {
    cy.intercept('GET', /books/, BOOKS).as('books');
    cy.intercept('GET', /categories/, CATEGORIES).as('categories');
    cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
}
const getContent = () => {
    cy.intercept('GET', /books/, BOOKS).as('books');
    cy.intercept('GET', /categories/, CATEGORIES).as('categories');
}

// Сначала запрос на реальную страницу - чтобы были красивые скриншоты
describe('profile page', () => {
    it('screenshots', () => {
        cy.intercept('POST', /local/).as('authorize');
        cy.intercept('GET', /books/).as('books');
        cy.intercept('GET', /categories/).as('categories');
        cy.intercept('GET', /me/).as('me');
        cy.visit('http://localhost:3000/#/auth');
        cy.get('[data-test-id=auth-form] input[name=identifier]').should('be.visible').type('Wally123');
        cy.get('[data-test-id=auth-form] input[name=password]').should('be.visible').type('GarrusWally123');
        cy.get('[data-test-id=auth-form] [type=submit]').should('be.exist').click();
        cy.wait(['@books', '@me', '@categories', '@authorize']);
        cy.get('[data-test-id=main-page]').should('be.visible');
        cy.get('[data-test-id=profile-button]')
            .should('be.exist')
            .invoke('show')
            .click({ force: true });
        // TODO почему она скрывается - сделал принудительный клик
        cy.viewport(1440, 900);
        cy.get('[data-test-id=app]').screenshot('1-1440-profile-page');

        cy.viewport(768, 576);
        cy.get('[data-test-id=app]').screenshot('2-768-profile-page');

        cy.viewport(320, 240);
        cy.get('[data-test-id=app]').screenshot('3-320-profile-page');
    });
});


describe('Profile functions tests', () => {
    beforeEach(() => {
        cy.session([login, pass], () => {
            cy.intercept('POST', /local/, USER_AUTH).as('authorize');
            cy.visit('http://localhost:3000/#/auth');
            cy.get('[data-test-id=auth-form] input[name=identifier]').should('be.visible').type(login);
            cy.get('[data-test-id=auth-form] input[name=password]').should('be.visible').type(pass);
            cy.get('[type=submit]').should('be.exist').click();
            cy.wait('@authorize');
            cy.get('[data-test-id=main-page]').should('be.visible');
        });
        cy.viewport(1440, 900);
    });

    describe('profile avatar tests', () => {
        it('screenshots', () => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', /categories/, CATEGORIES).as('categories');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@categories', '@me']);

            cy.get('[data-test-id=profile-avatar]').screenshot('4-1440-profile-avatar');
            cy.viewport(768, 576);
            cy.get('[data-test-id=profile-avatar]').screenshot('5-768-profile-avatar');
            cy.viewport(320, 240);
            cy.get('[data-test-id=profile-avatar]').screenshot('6-320-profile-avatar');
        });
    });

    describe('avatar upload tests', () => {
        it('upload success', () => {
            getFullData();
            cy.intercept('POST', /upload/, UPLOAD).as('upload');
            cy.intercept('PUT', /users/, USER_AVATAR_CHANGED).as('user');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=profile-avatar]').screenshot('7.1-profile-avatar-before');
            cy.get('[data-test-id=profile-avatar]')
                .find('input[type=file]')
                .should('be.exist')
                .selectFile('cypress/fixtures/cypress.jpg', { force: true });
            cy.wait(['@user', '@upload']);
            cy.get('[data-test-id=error]').should('be.visible').contains('Фото успешно сохранено!', { matchCase: false });
            cy.wait(4000);
            cy.get('[data-test-id=profile-avatar]').screenshot('7.2-profile-avatar-after');
        });

        it('user fail', () => {
            getFullData();
            cy.intercept('POST', /upload/, UPLOAD).as('upload');
            cy.intercept('PUT', /users/, { statusCode: 400 }).as('user');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[type=file]')
                .should('be.exist')
                .selectFile('cypress/fixtures/cypress.jpg', { force: true });
            cy.wait(['@user', '@upload']);
            cy.get('[data-test-id=error]')
                .should('be.exist')
                .contains('Что-то пошло не так, фото не сохранилось. Попробуйте позже!', { matchCase: false });
        });

        it('upload fail', () => {
            getFullData();
            cy.intercept('POST', /upload/, { statusCode: 400 }).as('upload');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[type=file]')
                .should('be.exist')
                .selectFile('cypress/fixtures/cypress.jpg', { force: true });
            cy.wait('@upload');
            cy.get('[data-test-id=error]')
                .should('be.exist')
                .contains('Что-то пошло не так, фото не сохранилось. Попробуйте позже!', { matchCase: false });
        });
    });

    const formTest = (width, heigth) => {
        // TODO добавить стилевые проверки
        cy.viewport(width, heigth);
        cy.get('[data-test-id=profile-form] input[name=login]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=firstName]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=lastName]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=password]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=phone]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=email]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=save-button]')
            .should('be.visible')
            .should('be.disabled')
            .should('have.css', 'border-radius', '30px')
            .should('have.css', 'background-color', 'rgb(235, 235, 235)')
            .contains('Сохранить изменения', { matchCase: false }).should('have.css', 'text-transform', 'uppercase');

        cy.get('[data-test-id=edit-button]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.css', 'border', '1px solid rgb(191, 196, 201)')
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
            .contains('Редактировать', { matchCase: false }).should('have.css', 'text-transform', 'uppercase')
            .click();

        cy.get('[data-test-id=profile-form] input[name=login]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=profile-form] input[name=firstName]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=profile-form] input[name=lastName]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=profile-form] input[name=password]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=profile-form] input[name=phone]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=profile-form] input[name=email]').should('be.visible').should('be.enabled');
        cy.get('[data-test-id=save-button]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.css', 'border-radius', '30px')
            .contains('Сохранить изменения', { matchCase: false }).should('have.css', 'text-transform', 'uppercase');

        cy.get('[data-test-id=edit-button]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.css', 'border', '1px solid rgb(191, 196, 201)')
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
            .contains('Редактировать').should('have.css', 'text-transform', 'uppercase')
            .click();

        cy.get('[data-test-id=profile-form] input[name=login]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=firstName]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=lastName]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=password]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=phone]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=profile-form] input[name=email]').should('be.visible').should('be.disabled');
        cy.get('[data-test-id=save-button]')
            .should('be.visible')
            .should('be.disabled')
            .should('have.css', 'border-radius', '30px')
            .should('have.css', 'background-color', 'rgb(235, 235, 235)')
            .contains('Сохранить изменения', { matchCase: false }).should('have.css', 'text-transform', 'uppercase');

        cy.get('[data-test-id=edit-button]')
            .should('be.visible')
            .should('be.enabled')
            .should('have.css', 'border-radius', '30px')
            .should('have.css', 'border', '1px solid rgb(191, 196, 201)')
            .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
            .contains('Редактировать').should('have.css', 'text-transform', 'uppercase', { matchCase: false })
            .click();

        cy.get('[data-test-id=profile-form] input[name=login]').clear().blur();
        cy.get('[data-test-id=hint]')
            .eq(0)
            .should('be.visible')
            .contains('Поле не может быть пустым', { matchCase: false })
            .should('have.css', 'color', 'rgb(244, 44, 79)')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px');
        cy.get('[data-test-id=profile-form] input[name=firstName]').clear().blur();
        cy.get('[data-test-id=profile-form] input[name=lastName]').clear().blur();
        cy.get('[data-test-id=profile-form] input[name=password]').clear().blur();
        cy.get('[data-test-id=hint]')
            .should('be.visible')
            .eq(1)
            .should('be.visible')
            .contains('Поле не может быть пустым', { matchCase: false })
            .should('have.css', 'color', 'rgb(244, 44, 79)')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px');
        cy.get('[data-test-id=profile-form] input[name=phone]').clear().blur();
        cy.get('[data-test-id=profile-form] input[name=email]').clear().blur();
        cy.get('[data-test-id=hint]')
            .should('be.visible')
            .eq(5)
            .should('be.visible')
            .contains('Поле не может быть пустым', { matchCase: false })
            .should('have.css', 'color', 'rgb(244, 44, 79)')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px');
        cy.get('[data-test-id=profile-form] input[name=login]').clear().type('Кириллица').blur();
        cy.get('[data-test-id=hint]')
            .should('be.visible')
            .eq(0)
            .should('be.visible')
            .contains('Используйте для логина латинский алфавит и цифры', { matchCase: false })
            .should('have.css', 'color', 'rgb(244, 44, 79)')
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px');
        cy.get('[data-test-id=profile-form] input[name=password]').clear().type('не правильный пароль', { matchCase: false }).blur();
        cy.get('[data-test-id=hint]')
            .should('be.visible')
            .eq(1)
            .should('be.visible')
            .contains('Пароль не менее 8 символов, с заглавной буквой и цифрой', { matchCase: false })
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px')
            .should('have.css', 'color', 'rgb(244, 44, 79)');
        cy.get('[data-test-id=profile-form] input[name=email]').clear().type('incorrectmail.ru').blur();
        cy.get('[data-test-id=hint]')
            .should('be.visible')
            .eq(5)
            .should('be.visible')
            .contains('Введите корректный e-mail', { matchCase: false })
            .should('have.css', 'font-weight', '500')
            .should('have.css', 'font-size', '12px')
            .should('have.css', 'letter-spacing', '0.2px')
            .should('have.css', 'color', 'rgb(244, 44, 79)');

        cy.get('[data-test-id=profile-form] input[name=login]').clear().type('ValidateName123').blur();
        cy.get('[data-test-id=profile-form] input[name=firstName]').clear().type('Igor').blur();
        cy.get('[data-test-id=profile-form] input[name=lastName]').clear().type('Shidlovsky').blur();
        cy.get('[data-test-id=profile-form] input[name=password]').clear().type('ValidatePassword123').blur();
        cy.get('[data-test-id=profile-form] input[name=phone]').clear().type('+375335353535').blur();
        cy.get('[data-test-id=profile-form] input[name=email]').clear().type('validate@mail.ru').blur();

        cy.get('[data-test-id=profile-form]').screenshot(`8-${width}-profile-form`);
    };

    const formTestWorker = () => {
        cy.get('[data-test-id=edit-button]').should('be.visible').should('be.enabled').click();

        cy.get('[data-test-id=profile-form] input[name=login]').clear().type(login).blur();
        cy.get('[data-test-id=profile-form] input[name=firstName]').clear().type('Sprint7TestUserName').blur();
        cy.get('[data-test-id=profile-form] input[name=lastName]').clear().type('Sprint7TestUserLastName').blur();
        cy.get('[data-test-id=profile-form] input[name=password]').clear().type(pass).blur();
        cy.get('[data-test-id=profile-form] input[name=phone]').clear().type('+375331234567').blur();
        cy.get('[data-test-id=profile-form] input[name=email]')
            .clear()
            .type('correct@gmail.com')
            .blur();

        cy.get('[data-test-id=save-button]').should('be.visible').should('be.enabled').click();
    };

    const formSendData = (isSuccess) => {
        if (isSuccess) {
            cy.intercept(/users/, { statusCode: 200 }).as('user');
            getFullData();
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);

            formTestWorker();

            cy.wait('@user');
            cy.get('[data-test-id=error]')
                .should('be.visible')
                .contains('Изменения успешно сохранены!', { matchCase: false });
        } else {
            cy.intercept('PUT', /users/, { statusCode: 400 }).as('userFail');
            getFullData();
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);

            formTestWorker();

            cy.wait('@userFail');
            cy.get('[data-test-id=error]')
                .should('be.visible')
                .contains('Изменения не были сохранены. Попробуйте позже!');
        }
    };

    describe('profile form tests', () => {
        beforeEach(() => {
            getFullData();
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
        });
        it('1440, 900', () => formTest(1440, 900));
        it('768, 576', () => formTest(768, 576));
        it('320, 240', () => formTest(320, 240));
    });

    describe('profile form send tests', () => {
        it('send test success', () => formSendData(true));
        it('send test fail', () => formSendData(false));
    });

    describe('empty-cards', () => {
        it('empty-booking', () => {
            getContent();
            cy.intercept('GET', /me/, USER_NO_BOOKING).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=empty-blue-card]')
                .should('be.visible')
                .screenshot('9.1-1440-profile-empty-card')
                .contains('Забронируйте книгу и она отобразится', { matchCase: false });
            cy.get('[data-test-id=empty-blue-card]')
                .should('have.css', 'background-color')
                .and('eq', 'rgb(110, 118, 241)');
        });
        it('empty-handed', () => {
            getContent();
            cy.intercept('GET', /me/, USER_NO_DELIVERY).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=empty-blue-card]')
                .should('be.visible')
                .screenshot('9.2-1440-profile-empty-card')
                .contains('Прочитав книгу, она отобразится в истории', { matchCase: false });
            cy.get('[data-test-id=empty-blue-card]')
                .should('have.css', 'background-color')
                .and('eq', 'rgb(110, 118, 241)');
        });
        it('empty-history', () => {
            getContent();
            cy.intercept('GET', /me/, USER_NO_HISTORY).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=empty-blue-card]')
                .should('be.visible')
                .screenshot('9.3-1440-profile-empty-card')
                .contains('Вы не читали книг из нашей библиотеки', { matchCase: false });
            cy.get('[data-test-id=empty-blue-card]')
                .should('have.css', 'background-color')
                .and('eq', 'rgb(110, 118, 241)');
        });
    });

    describe('expired', () => {
        it('expired-booking', () => {
            getContent();
            cy.intercept('GET', /me/, USER_EXPIRED_BOOKING).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=expired]')
                .should('be.visible')
                .screenshot('10.1-1440-profile-expider-card')
                .contains('Дата бронирования книги истекла', { matchCase: false });
            cy.get('[data-test-id=expired]')
                .should('be.visible')
                .contains('Через 24 часа книга будет доступна всем', { matchCase: false });
            cy.get('[data-test-id=expired]')
                .should('have.css', 'background-color')
                .and('eq', 'rgba(255, 82, 83, 0.7)');
        });
        it('expired-handed', () => {
            getContent();
            cy.intercept('GET', /me/, USER_EXPIRED_HANDED).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me', '@categories']);
            cy.get('[data-test-id=expired]')
                .should('be.visible')
                .screenshot('10.2-1440-profile-empty-card')
                .contains('Вышел срок пользования книги', { matchCase: false });
            cy.get('[data-test-id=expired]')
                .should('be.visible')
                .contains('Верните книгу, пожалуйста', { matchCase: false });
            cy.get('[data-test-id=expired]')
                .should('have.css', 'background-color')
                .and('eq', 'rgba(255, 82, 83, 0.7)');
        });
    });

    describe('cancel-booking', () => {
        it('success', () => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.intercept('DELETE', /bookings/, { statusCode: 200 }).as('bookings');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me']);
            cy.get('[data-test-id=card]').eq(0).should('be.visible');
            cy.get('[data-test-id=cancel-booking-button]').should('be.visible').click();
            cy.wait('@bookings');
            cy.get('[data-test-id=error]')
                .should('be.visible')
                .contains('Бронирование книги успешно отменено!', { matchCase: false });
        });
        it('fail', () => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.intercept('DELETE', /bookings/, { statusCode: 400 }).as('bookings');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me']);
            cy.get('[data-test-id=card]').eq(0).should('be.visible');
            cy.get('[data-test-id=cancel-booking-button]').should('be.visible').click();
            cy.wait('@bookings');
            cy.get('[data-test-id=error]')
                .should('be.visible')
                .contains('Не удалось снять бронирование книги. Попробуйте позже!');
        });
    });

    describe('delivery-book-test', () => {
        it('has-back-date', () => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me']);
            cy.get('[data-test-id=card]')
                .eq(1)
                .should('be.visible')
                .contains('Возврат 30.03', { matchCase: false })
                .should('have.css', 'color', 'rgb(255, 82, 83)');
        });
    });

    describe('history-tests', () => {
        describe('exist-and-visible', () => {
            it('test', () => {
                cy.intercept('GET', /books/, BOOKS).as('books');
                cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
                cy.visit('http://localhost:3000/#/profile');
                cy.wait(['@books', '@me']);
                cy.get('[data-test-id=history]')
                    .should('be.visible')
                    .contains('История')
                    .should('have.css', 'font-weight', '700')
                    .should('have.css', 'font-size', '24px')
                    .should('have.css', 'color', 'rgb(54, 54, 54)');
                cy.get('[data-test-id=history]')
                    .contains('Список прочитанных книг', { matchCase: false })
                    .should('have.css', 'font-weight', '400')
                    .should('have.css', 'font-size', '16px')
                    .should('have.css', 'color', 'rgb(167, 167, 167)');
                cy.get('[data-test-id=card]').should('be.visible');
                cy.get('[data-test-id=history]').screenshot('11-1440-history');
            });

        })
        const addReview = (isSuccess) => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', 'https://strapi.cleverland.by/api/books/**', BOOK_34).as('book');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.intercept('POST', /comments/, { statusCode: isSuccess ? 200 : 400 }).as('comment');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me']);
            cy.get('[data-test-id=history-slide]').eq(0).find('[data-test-id=history-review-button]').contains('Оставить отзыв', { matchCase: false }).click();
            cy.wait('@book');
            cy.get('[data-test-id=modal-rate-book]')
                .should('be.visible')
                .find('[data-test-id=rating]')
                .should('be.visible')
                .find('[data-test-id=star]')
                .eq(1)
                .should('be.visible')
                .click();
            cy.get('[data-test-id=modal-rate-book]')
                .find('[data-test-id=comment]')
                .should('be.visible')
                .type('profile page test text');
            cy.get('[data-test-id=modal-rate-book]')
                .find('[data-test-id=button-comment]')
                .should('be.visible')
                .should('be.enabled')
                .click();
            cy.wait('@comment');
            if (isSuccess) {
                cy.get('[data-test-id=error]')
                    .should('be.visible')
                    .contains('Спасибо, что нашли время оценить книгу!', { matchCase: false });
            } else {
                cy.get('[data-test-id=error]')
                    .should('be.visible')
                    .contains('Оценка не была отправлена. Попробуйте позже!', { matchCase: false });
            }
        }

        describe('add-review', () => {
            it('success', () => addReview(true));
            it('fail', () => addReview(false));
        });

        const updateReview = (isSuccess) => {
            cy.intercept('GET', /books/, BOOKS).as('books');
            cy.intercept('GET', 'https://strapi.cleverland.by/api/books/**', { statusCode: 200, body: BOOK_94 },).as('book');
            cy.intercept('GET', /me/, USER_FULL_DATA).as('me');
            cy.intercept('PUT', /comments/, { statusCode: isSuccess ? 200 : 400 }).as('comment');
            cy.visit('http://localhost:3000/#/profile');
            cy.wait(['@books', '@me']);
            cy.get('[data-test-id=history-slide]').eq(2).find('[data-test-id=history-review-button]').contains('Изменить оценку', { matchCase: false }).click();
            cy.wait('@book');
            cy.get('[data-test-id=modal-rate-book]')
                .should('be.visible')
                .find('[data-test-id=rating]')
                .should('be.visible')
                .find('[data-test-id=star]')
                .eq(0)
                .should('be.visible')
                .click();
            cy.get('[data-test-id=modal-rate-book]')
                .find('[data-test-id=comment]')
                .should('be.visible')
                .type('profile page test text');
            cy.get('[data-test-id=modal-rate-book]')
                .find('[data-test-id=button-comment]')
                .should('be.visible')
                .should('be.enabled')
                .click();
            cy.wait('@comment');
            if (isSuccess) {
                cy.get('[data-test-id=error]')
                    .should('be.visible')
                    .contains('Спасибо, что нашли время изменить оценку!', { matchCase: false });
            } else {
                cy.get('[data-test-id=error]')
                    .should('be.visible')
                    .contains('Изменения не были сохранены. Попробуйте позже!', { matchCase: false });
            }
        }

        describe('update-review', () => {
            it('success', () => updateReview(true));
            it('fail', () => updateReview(false));
        });

    });


    const updateReviewOnBookPage = (number, book) => {
        getFullData();
        cy.intercept('GET', 'https://strapi.cleverland.by/api/books/**', book).as('book');
        cy.visit('http://localhost:3000/#/profile');
        cy.wait(['@books', '@me', '@categories']);
        cy.get('[data-test-id=history-slide]').eq(number).click();
        cy.wait('@book');
        cy.url().should('contain', `${book.id}`);
        if (book.id === 94) {
            cy.get('[data-test-id=button-rate-book]')
                .should('be.visible')
                .should('be.enabled')
                .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                .should('have.css', 'border', '1px solid rgb(191, 196, 201)')
                .should('have.css', 'border-radius', '30px')
                .contains('изменить оценку', { matchCase: false })
                .should('have.css', 'color', 'rgb(54, 54, 54)')
                .should('have.css', 'font-weight', '600')
                .should('have.css', 'font-size', '16px')
                .should('have.css', 'letter-spacing', '0.2px')
                .should('have.css', 'text-transform', 'uppercase')
        }
        if (book.id === 34) {
            cy.get('[data-test-id=button-rate-book]')
                .should('be.visible')
                .should('be.enabled')
                .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                .should('have.css', 'border-radius', '30px')
                .contains('оценить книгу', { matchCase: false })
                .should('have.css', 'color', 'rgb(255, 255, 255)')
                .should('have.css', 'font-weight', '600')
                .should('have.css', 'font-size', '16px')
                .should('have.css', 'letter-spacing', '0.2px')
                .should('have.css', 'text-transform', 'uppercase')
        }
    }

    describe('update-review-book-page', () => {
        it('update-button-name', () => updateReviewOnBookPage(2, BOOK_94));
        it('crate-button-name', () => updateReviewOnBookPage(0, BOOK_34));
    });
});
