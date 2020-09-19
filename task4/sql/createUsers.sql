DROP TABLE IF EXISTS "Users" CASCADE;

CREATE TABLE "Users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "login" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    "deletedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    "age" smallint
);

INSERT INTO "Users" (
    "id", "login", "password", "age"
) VALUES
    (
        '00011958-6022-4366-8f4e-f4eb0645434d',
        'admin',
        'qwerty',
        15
    ),
    (
        '1d411958-6022-4366-8f4e-f4eb0645434d',
        'nocturnal_depression',
        'and_fall_the_february_snow',
        42
    ),
    (
        'a8ce1c3c-18c3-4d1a-9e92-d34731bae044',
        'dimmu_borgir',
        'morning_palace',
        13
    ),
    (
        'd2ffd640-5aee-4944-8440-696c829d9cf6',
        'lamia',
        'aaa111222333',
        22
    ),
    (
        'eeeeeeee-5aee-4944-8440-696c829d9cf6',
        'johny',
        'JJJJJJJJJ',
        22
    ),
    (
        '7949c23b-2d27-4681-8753-5929a617332b',
        'john smith',
        '980h3qihw3pwhewsa',
        33
    );