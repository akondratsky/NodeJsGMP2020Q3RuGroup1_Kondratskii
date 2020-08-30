do $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'permission') THEN
    CREATE TYPE permission AS ENUM (
        'READ',
        'WRITE',
        'DELETE',
        'SHARE',
        'UPLOAD_FILES'
    );
    RAISE INFO 'New type "permission" was created';
ELSE
    RAISE INFO 'Type "permission" already exists';
END IF;
END;
$$;

CREATE TABLE "Groups" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" varchar(255) NOT NULL,
    "permissions" permission ARRAY DEFAULT '{}',
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


INSERT INTO "Groups" (
    "id", "name", "permissions"
) VALUES
    (
        '00011958-6022-4366-8f4e-55eb0645434d',
        'admin',
        '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}'
    ),
    (
        '00011958-6022-4366-8f4e-55eb06454111',
        'user',
        '{"READ", "SHARE"}'
    );