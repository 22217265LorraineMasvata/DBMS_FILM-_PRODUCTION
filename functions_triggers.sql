
--1 Function: get total salary of the cast crew grouped by the role type

create or replace function Get_total_salary_by_role()
returns table (
    role_type varchar, total_people bigint, total_salary numeric
)
language plpgsql
as $$
begin
    return query
    select
        cc.role_type, count(cc.person_id), sum(fcc.salary)
    from cast_crew cc
    join film_cast_crew fcc on cc.person_id = fcc.person_id
    group by cc.role_type
    order by sum(fcc.salary) desc;
end;
$$;

select * from Get_total_salary_by_role();


--2 Function: that gets the film budget of the films produced in same studio

create or replace function get_budget_by_studio()
returns table (
    studio varchar, total_films bigint, total_budget numeric
)
language plpgsql
as $$
begin
    return query
    select
        p.studio, count(f.film_id), sum(b.total_budget)
    from production p
    join films f on p.film_id = f.film_id
    join budget b on f.film_id = b.film_id
    group by p.studio
    order by sum(b.total_budget) desc;
end;
$$; 


select * from get_budget_by_studio();

--3 FunctionTrigger that automatically insert the new film int production table

create or replace function auto_create_production()
returns trigger
language plpgsql
as $$
begin
    insert into production (
        film_id, company_name, studio, distributor, shoot_start, shoot_end, status
    )
    VALUES (
        NEW.film_id, 'Default Productions', 'Studio F', 'Pending Distributor', CURRENT_DATE, NULL, 'Pre Production'
    );

    return new;
end;
$$;

create or replace trigger trg_auto_create_production
after insert on films
for each row
execute function auto_create_production();

insert into films (
    title, genre, status, release_date, description
)
values (
    'Midnight Echo', 'Thriller', 'Pre Production', '2027-10-01', 'A detective uncovers hidden secrets.'
);

select * from production 
order by production_id desc;



--4 function that gets information of the equipment based on the studio produced and equipment type

create or replace function get_equipment_by_studio(
    p_studio varchar, p_equipment_type varchar
)
returns table (
    equipment_name varchar,
    equipment_type varchar,
    equipment_condition varchar,
    studio varchar,
    production_status varchar,
    film_title varchar
)
language plpgsql
as $$
begin
    return query
    select
        e.name, e.type, e.condition_status, p.studio, p.status, f.title
    from equipment e
    join production p on e.production_id = p.production_id
    join films f on p.film_id = f.film_id
    where p.studio = p_studio and e.type = p_equipment_type
    order by e.name;
end;
$$;


select *
from get_equipment_by_studio('Studio A', 'Camera');


select *
from get_equipment_by_studio('Studio F', 'Lighting');


--5 Function that check which user if active and counts how many based on there role_name

create or replace function get_users_by_role()
returns table (
    role_name varchar, total_users bigint, active_users bigint
)
language plpgsql
as $$
begin
    return query
    select
        r.role_name, count(u.user_id) as total_users,
        count(
            case
                when u.is_active = true then 1
            end) as active_users
    from roles r
    left join users u on r.role_id = u.role_id
    group by r.role_name
    order by total_users desc;
end;
$$;


select * from get_users_by_role();


--6 Function that updates the budget of the called film id

create or replace function update_amount_spent(
    p_film_id int, p_amount_spent numeric
)
returns text
language plpgsql
as $$
begin
    update budget
    set amount_spent = p_amount_spent, last_updated = CURRENT_DATE
    WHERE film_id = p_film_id;

    if not found then
        raise exception 'No budget record found for film_id %', p_film_id;
    end if;

   return format('Budget updated for film_id %s', p_film_id);
end;
$$;

select update_amount_spent(3, 5500000.00);
