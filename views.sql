create view users_roles as (
    select
        u."id" as "idUsers",
        u."name" as "usersName",
        u."idRoles",
        r."name" as "rolesName"
    from
        users u
        join roles r on r."id" = u."idRoles"
);

create view tickets_users_roles as (
    select
        u.*,
        t."id" as "idTickets",
        t."idMother",
        t."code",
        t."status",
        t."createdAt",
        t."title",
        t."description"
    from
        tickets t
        join users_roles u on u."idUsers" = t."idUsers"
);

create view tickets_users_roles_files as (
    select
        t.*,
        f."filesPath",
        f."name",
        f."extension",
        f."mimetype",
        f."id" as "idFiles"
    from
        tickets_users_roles t
        left join files f on f."idTickets" = t."idTickets"
);