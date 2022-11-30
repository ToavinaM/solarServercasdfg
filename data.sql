insert into
    roles ("name")
values
    ('user');

insert into
    roles ("name")
values
    ('admin');

insert into
    users ("name", "idRoles")
values
    ('Toavina', 1),
    ('John', 1),
    ('Lise', 2);

insert into
    tickets ("code", "idUsers", "title", "description")
values
    (
        'XS123h',
        1,
        'Refactoring',
        'need to do the best'
    );

-- //with mother
insert into
    tickets (
        "code",
        "idUsers",
        "idMother",
        "title",
        "description"
    )
values
    (
        'XS12asd3hasd',
        2,
        1,
        'checkReply',
        'this is a simple test'
    ),
    (
        'XS12asd3hasd',
        1,
        1,
        'checkReply2',
        'this is a simple test2'
    );