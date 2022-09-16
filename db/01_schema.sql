set client_encoding = 'UTF8';

create table users (
    id uuid not null,
    name text not null,
    email text not null
);

create table advices (
    id uuid not null,
    user_id uuid not null,
    content text not null,
    created_at timestamp not null,
    icon_src text not null
);

create table properties (
    id uuid not null,
    monthly_rent_price int not null,
    monthly_maintenance_fee int not null,
    initial_cost int not null,
    location text not null,
    distance_station_raw text not null,
    house_layout text not null,
    exclusive_area real not null,
    age_of_building int,
    floor_num int,
    direction text,
    additional_info jsonb,
    fetched_at timestamp not null
);