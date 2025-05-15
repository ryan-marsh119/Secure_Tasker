This is a secure task management application that encrypts the description field in the database. To test the program, run the following commands:

Inside the tasker directory:
python manage.py runserver

Inside the frontend directory:
npm run

The login page will appear on your screen. Use the username and password, "admin" and "password", respectively. From here you'll be routed to the tasks page.
Tasks can be viewed with the Edit buttons. Add tasks with the "Add Task" button. All tasks require a title and the description must be less than 500
characters long. The "Logout" button will return you to the login screen.

Major Libraries used are encrypted_model_fields for the description encryption and django rest framework for the API endpoints.