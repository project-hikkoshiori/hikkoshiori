set client_encoding = 'UTF8';

create table users (
    id uuid primary key,
    name text not null,
    gender text not null,
    user_type text not null,
    work_pattern text not null,
    created_at timestamp not null
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
    fetched_at timestamp not null,
    image_src text
);

create table bookmarks (
    bookmark_id uuid primary key,
    user_id uuid references users(id),
    property_id uuid references properties(id)
);

create table housekeeps (
    id uuid  primary key,
    user_id uuid references users(id)
);

create table housekeep_tables (
    id uuid  primary key,
    housekeep_id uuid references housekeeps(id) on delete cascade,
    name text not null
);

create table housekeep_columns (
    id uuid  primary key,
    table_id uuid references housekeep_tables(id) on delete cascade,
    name text not null,
    value int not null,
    is_prepared bool not null
);

create table property_images (
    id uuid not null,
    property_id uuid references properties(id),
    title text,
    image_link text not null
);
