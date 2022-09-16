set client_encoding = 'UTF8';

create table users (
    id uuid primary key,
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
    id uuid primary key,
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

create table bookmarks (
    bookmark_id uuid primary key,
    user_id uuid references users(id),
    property_id uuid references properties(id)
);

create table property_images (
    id uuid not null,
    property_id uuid references properties(id),
    title text,
    image_link text not null
)
