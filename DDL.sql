-- 1. Roles table
create table roles(
  role_id serial primary key,
  role_name varchar(50) not null unique,
  can_edit boolean default false,
  can_delete boolean default false,
  can_view_budget boolean default false
);

-- 2. Users table
create table users(
  user_id serial primary key,
  role_id int not null,
  username varchar(100) not null unique,
  email varchar(150) not null unique,
  password_hash varchar(255) not null,
  created_at timestamp default now(),
  is_active boolean default true,
  foreign key (role_id) references Roles (role_id)
        on delete cascade
        on update cascade
);
-- 3. Films table
create table films (
    film_id serial primary key,
    title varchar(200) not null,
    genre varchar(100),
    status varchar(50)
        check (status in ('Pre Production','In Production','Post Production','Released')) default 'In Production',
    release_date date,
    description  text
);

-- 4. Cast_Crew table
create table cast_crew (
    person_id serial primary key,
    full_name varchar(150) not null,
    role_type varchar(100),
    nationality varchar(100),
    birth_date date,
    contact_email varchar(150)
);

-- 5. Film_Cast_Crew (bridge table)
create table film_cast_crew (
    id serial primary key,
    film_id int not null,
    person_id int not null,
    character_name varchar(150),
    salary numeric(12,2),
    foreign key (film_id) references Films(film_id)
        on delete cascade
        on update cascade,
    foreign key (person_id) references Cast_Crew(person_id)
        on delete cascade
        on update cascade
);

-- 6. Production table
create table production (
    production_id serial primary key,
    film_id int not null,
    company_name varchar(200),
    studio varchar(200),
    distributor varchar(200),
    shoot_start date,
    shoot_end date,
    status varchar(50) 
        check (status in ('Pre Production', 'Scheduled', 'Active', 'Completed', 'Post Production', 'Cancelled'))
        default 'Scheduled',
    foreign key (film_id) references Films(film_id)
        on delete cascade
        on update cascade
);

-- 7. Budget table
create table budget (
    budget_id serial primary key,
    film_id int not null unique,
    total_budget numeric(15,2),
    amount_spent numeric(15,2) default 0,
    revenue numeric(15,2) default 0,
    currency varchar(10) default 'USD',
    last_updated date,
    foreign key (film_id) references Films(film_id)
        on delete cascade
        on update cascade
);

-- 8. Locations table
create table locations (
    location_id serial primary key,
    film_id int not null,
    location_name varchar(100),
    city varchar(100),
    country varchar(100),
    type varchar(100),
    rent_cost_per_day numeric(10,2),
    available_from date,
    available_to date,
    foreign key (film_id) references Films(film_id)
        on delete cascade
        on update cascade
);

-- 9. Equipment table
create table equipment (
    equipment_id serial primary key,
    production_id int not null,
    name varchar(150) not null,
    type varchar(100),
    quantity int default 1,
    condition_status varchar(50)
        check (condition_status in ('Excellent','Good','Fair','Damaged'))
        default 'Good',
    rental_cost numeric(10,2),
    foreign key (production_id) references Production(production_id)
        on delete cascade
        on update cascade
);
