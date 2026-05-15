
-- Query 1: List of all films with their total budget, amount spent and revenue
select f.title, f.genre, f.status, b.total_budget, b.amount_spent, b.revenue
from films f
join budget b on f.film_id = b.film_id
order by b.total_budget desc;


-- Query 2: Total revenue, average budget and number of films per genre
select f.genre, COUNT(f.film_id) as total_films,
    sum(b.revenue) as total_revenue,
    avg(b.total_budget) as avg_budget,
    sum(b.amount_spent) as total_spent
from films f
join budget b on f.film_id = b.film_id
group by f.genre
order by total_revenue desc;



-- Query 3: All cast and crew members with the films they worked on and their salary
select cc.full_name, cc.role_type, cc.nationality, f.title as film_title, fcc.character_name ,fcc.salary
from cast_crew cc
join film_cast_crew fcc on cc.person_id = fcc.person_id
join films f on fcc.film_id  = f.film_id
order by fcc.salary desc;



-- Query 4: Get all cast and crew members who are actors and there nationality
select full_name, role_type, nationality
from cast_crew
where role_type in ('Actor')
order by full_name asc;


-- Query 5: Get all films that are currently "In Production"
select title, genre, release_date, description
from films
where status = 'In Production';

-- Query 6: Films above the average budget across all productions
select f.title, f.genre, b.total_budget
from films f
join budget b on f.film_id = b.film_id
where b.total_budget > (
    select avg(total_budget) from budget
)
order by b.total_budget desc;


-- Query 7: Total equipment rental cost per production with company name and film title
select f.title as film_title, p.company_name, p.status as production_status,
    count(e.equipment_id) as total_equipment,
    sum(e.rental_cost * e.quantity) as total_rental_cost
from production p
join films f on p.film_id = f.film_id
join equipment e on e.production_id = p.production_id
group by f.title, p.company_name, p.status
order by total_rental_cost desc;


-- Query 8: Most hired cast and crew members across all films
select cc.full_name, cc.role_type, cc.nationality,
    count(fcc.film_id) as total_films,
    sum(fcc.salary) as total_earnings
from cast_crew cc
join film_cast_crew fcc on cc.person_id = fcc.person_id
group by cc.full_name, cc.role_type, cc.nationality
having count(fcc.film_id) >= 1
order by total_films desc, total_earnings desc;
