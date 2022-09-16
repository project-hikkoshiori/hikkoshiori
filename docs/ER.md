```mermaid
erDiagram

    users ||--|| auths: ""
    users ||--|{ advices: ""
    users ||--|{ housekeeps: ""
    users ||--o{ bookmarks: ""
    housekeeps ||--o{ housekeep_tables: ""
    housekeep_tables ||--o{ housekeep_columns: ""
    properties ||--o{ bookmarks: ""
    properties ||--o{ property_images: ""

    auths {
        text name PK
        text password
    }

    users {
        uuid id PK
        text name
        text email
    }

    advices {
        uuid id PK
        uuid user_id FK
        text content
        timestamp created_at
        text icon_src
    }

    housekeeps {
        uuid id PK
        uuid user_id FK
    }

    housekeep_tables {
        uuid id PK
        uuid housekeep_id FK
        text name
    }

    housekeep_columns {
        uuid id PK
        uuid table_id FK
        text name
        int value
        bool is_prepared
    }


    bookmarks{
        uuid bookmark_id PK
        uuid user_id FK
        uuid property_id FK
    }

    properties{
        uuid id PK
        int8 monthly_rent_price
        int8 monthly_maintenance_fee
        int8 initial_cost
        text location
        text distance_station_raw
        text house_layout
        float8 exclusive_area
        int8 age_of_building
        int8 floor_num
        text direction
        json additional_info
        datetime fetched_at
    }
    
    property_images{
        uuid id PK
        uuid property_id FK
        title text
        text image_link
    }
```