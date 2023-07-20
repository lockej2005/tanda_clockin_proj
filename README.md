# Junior Product Designer Code Challenge

At many companies, product design is split into different roles: UX, UI, front-end development, etc. At Workforce.com, it’s all one role. Our designers are generalists that design 'in medium'. This means you’ll spend less time in design programs, and more time making your designs functional with HTML, CSS, and Javascript.

Challenge: [https://docs.google.com/document/d/1IhRro5y01gqVZpTR6XIwYcCWboaOKv5DjW-Ce4ZMAp0/edit?usp=sharing](https://docs.google.com/document/d/1IhRro5y01gqVZpTR6XIwYcCWboaOKv5DjW-Ce4ZMAp0/edit?usp=sharing)

-----

Prerequisites
Docker installed on the machine (you can include a link to Docker's installation guides: https://docs.docker.com/engine/install/)
How to Run the Application

Clone the repository:

git clone https://github.com/lockej2005/tanda_clockin_proj

Navigate to the cloned directory:

cd tanda_clockin_proj

Build the Docker image: 

docker build -t tanda_clockin_proj 

Run the Docker container: 

docker run -p 8080:8080 tanda_clockin_proj

Accessing the Application
After the Docker container is running, you can access the application by navigating to http://localhost:8080 in your web browser