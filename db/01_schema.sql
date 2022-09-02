set client_encoding = 'UTF8';

create table users (
    id uuid not null,
    name text not null
);

create table advices (
    id uuid not null,
    user_id uuid not null,
    content text not null,
    created_at timestamp not null,
    icon_src text not null
);