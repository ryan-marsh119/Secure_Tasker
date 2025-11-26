# Secure Tasker Application

A full-stack to-do list application that stores task descriptions encrypted in the database for added security. The backend uses Django with REST Framework to handle API requests, automatically decrypting descriptions upon retrieval. The frontend is built with React, providing a simple interface for logging in, viewing, adding, updating, and deleting tasks. This project demonstrates basic encryption in data storage, API development, and frontend-backend integration.

## Description

This app allows users to manage tasks where sensitive descriptions are encrypted before being saved to the database using the `encrypted_model_fields` library (Fernet symmetric encryption). On API GET requests, the descriptions are decrypted and returned in plaintext. If decryption fails (e.g., due to an invalid key), an error is returned.

- Backend: Handles CRUD operations for tasks via REST API, with JWT authentication (currently commented out but configured).
- Frontend: React app with routing for login and task list pages; uses localStorage for token management and redirects based on authentication status.
- Security Focus: Ensures task descriptions are not stored in plaintext, protecting against direct database access breaches.

The app uses a PostgreSQL database (configurable via environment variables) and includes basic validation on task titles and descriptions.

Note: This is a prototype for educational purposes. Encryption relies on a secret key stored in `.env`; in production, use secure key management. Authentication is set up but disabled in code for simplicity.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/encrypted-to-do-app.git
   cd encrypted-to-do-app
   ```

2. Set up environment variables: Create a `.env` file in the root with:
   ```
   SECRET_KEY=django-insecure-9i5kd0w9%imf)ka_7@4ucsbajp$0j03q0k(q%khh&7w0dvara@
   ENCRYPTION_KEY=9Z8Gw4VChNfUOfJyeSImMN83EaqrpgDtwfNr5YVnzms=
   DATABASE_URL_DEFAULT=postgresql://tasker_user:taVQOTKY6N84m4j5eMgMd3icmOPqACSP@dpg-d0gf8fi4d50c73fptob0-a.oregon-postgres.render.com/tasker_7xjv
   ```

3. Backend setup (inside the tasker directory):
   - Install dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Set up the database (PostgreSQL required; update `settings.py` if needed):
     ```
     python manage.py makemigrations
     python manage.py migrate
     ```
   - Run the server:
     ```
     python manage.py runserver
     ```

4. Frontend setup (inside the frontend directory):
   - Install dependencies:
     ```
     npm install
     ```
   - Run the app:
     ```
     npm start
     ```

## Usage

- Backend API: Runs at `http://localhost:8000`.
  - Endpoints: `/api/tasks/` (list/create), `/api/tasks/<id>/` (retrieve/update/delete).
  - Token endpoints: `/api/token/` (obtain), `/api/token/refresh/` (refresh).
- Frontend: Runs at `http://localhost:3000`.
  - Navigate to `/login` to authenticate (use username "admin" and password "password").
  - After login, you will be routed to the tasks page.
  - View tasks with the Edit buttons.
  - Add tasks with the "Add Task" button. All tasks require a title, and the description must be less than 500 characters long.
  - Use the "Logout" button to return to the login screen.
- CORS is configured for `http://localhost:3000` to allow frontend requests.

To test encryption:
- Create a task via API or frontend.
- Check the database: Descriptions start with `gAAAAA...` (encrypted).
- Retrieve via API: Decrypted plaintext is returned.

## Features

- **Task Management**: CRUD operations for tasks (title, encrypted description, completed status, creation timestamp).
- **Encryption/Decryption**: Automatic encryption on save; decryption on retrieval with error handling for failures.
- **Validation**: Ensures non-empty titles and descriptions under 500 characters.
- **Authentication**: JWT setup with SimpleJWT (commented out; can be enabled via `permission_classes` in views).
- **Logging**: Basic file logging for API requests.
- **Frontend Routing**: React Router for login/task pages with token-based redirects.

## Technologies Used

- **Backend**: Django, Django REST Framework, SimpleJWT (authentication), encrypted_model_fields (Fernet encryption), PostgreSQL.
- **Frontend**: React, React Router DOM.
- **Other**: Environs for env vars, CORS headers for cross-origin requests.
- Dependencies: Listed in `requirements.txt` (e.g., cryptography, gunicorn for deployment).

## Project Structure

- `mysite/`: Django project root.
  - `settings.py`: Configuration including encryption key, database, CORS, REST Framework.
  - `urls.py`: Main URL patterns including admin, tasks API, JWT tokens.
- `tasks/`: Django app for tasks.
  - `models.py`: Task model with encrypted description field.
  - `views.py`: API views for listing/creating and detailing tasks, with decryption checks.
  - `serializers.py`: Serializer for Task with field validations.
  - `urls.py`: App-specific URL patterns for tasks.
  - `apps.py`: App configuration.
- `App.js`: React main file with routing and token-based redirects (frontend entry).
- `requirements.txt`: Backend dependencies.
- Other files: Standard Django structure (e.g., `manage.py`, migrations).

## Limitations

- Authentication is configured but commented out in views; enable for production.
- No user model or registration; assumes a single-user setup or external auth.
- Encryption key is env-based; not rotated or managed dynamically.
- Frontend is basic (login and task list); no full error handling or styling shown in provided files.
- Database is local PostgreSQL; no cloud deployment setup.
- No tests or advanced error handling beyond decryption checks.

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See the [LICENSE](LICENSE) file for details.
