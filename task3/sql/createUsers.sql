CREATE TABLE "Users" (
    "id" UUID PRIMARY KEY,
    "login" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "age" smallint,
    "isDeleted" boolean NOT NULL DEFAULT FALSE
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
        'nude_sophia',
        22
    );