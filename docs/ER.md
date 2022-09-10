```mermaid
erDiagram

    users ||--|{ knowledge_lists: ""
    users ||--|{ housekeeps: ""
    users ||--o{ user_property: ""
    housekeeps ||--o{ housekeep_tables: ""
    housekeep_tables ||--o{ housekeep_columns: ""
    property_tables ||--o{ user_property: ""

    users {
        uuid id PK
        text name
        text email
        bool is_male
        bool is_student
        bool is_new_employee
        bool is_remote_work
    }

    knowledge_lists {
        uuid id PK
        uuid user_id FK
        text name
        timestamp created_at
        text content
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


    user_property{
        uuid id PK
        uuid user_id FK
        uuid property_id FK
    }

    property_tables{
        uuid id PK
        int8 monthly_rent_price
        int8 monthly_maintenance_fee
        int8 initial_cost
        text location
        text distance_station_raw
        text house_layout
        float8 exclusive_area
        int8 age of building
        int8 n_floor
        text direction
        json info
    }

```