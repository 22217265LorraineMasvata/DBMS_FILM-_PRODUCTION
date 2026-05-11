# Film Production Database Management System

## Course
CMPE344 - Database Management Systems and Programming II
Cyprus International University: Spring 2025-2026

## Student
- 22202963 Tinotenda Mupati   Backend & SQL Programmer
- 22217265 Lorraine Masvata   Deployement & Github Manager
- 22301016 Lamine Diamoutene  Frontend / GUI Developer
- 22212615 Djelika Kone       Database Designer

## Overview
A Film Production Database Management System stores and manages data related to films, cast and crew, production, budgets, locations, and equipment.
It ensures efficient retrieval, maintains relationships (e.g., actors–films), and supports coordination and decision-making during production.
The system supports multiple user roles like Admin, Customer, Employee and Technical Staff.
The project illustrates the relational database design, SQL queries, PL/pgSQL functions/triggers/procedures and database deployment using Supabase/PostgreSQL.

## Technologies
- PostgreSQL / Supabase
- SQL (DDL, DML, Queries)
- PL/pgSQL
- Github

## Tables
The system have the following tables:
1. Roles
2. Users
3. Films
4. Cast_Crew
5. Film_Cast_Crew
6. Production
7. Budget
8. Locations
9. Equipment

## Sample Features
### Trigger Example
Automatically insert the new film into the production table

### Fuctions Examples
- Calculates total salaries grouped by cast/crew role type
- Calculates film budget of the films produced in the same studio
- Gets information of the equipment based on studio prodeced and equipment type

### Queries
- Budget analysis and Revenue statistics
- Cast and creww report
- Film production tracking
- Equipment rental report

## How to Run the Project
1. Open Supabase SQL Editor
2. Run ddl.sql
3. Run dml.sql
4. Run the queries and the PL/pgSQL
5. Test the functions/triggers using the provided examples



## Licence
This project was developed for academic purposes.
