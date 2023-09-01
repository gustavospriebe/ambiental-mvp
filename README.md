# Ambiental MVP

### 🌍 Project Overview
This project was initiated as a means to gain practical experience in developing a production-ready application using Next.js version 13. In this latest iteration, significant enhancements and changes have been introduced. The primary objective was to construct a comprehensive project management solution, leveraging Prisma as the database ORM (Object-Relational Mapping) tool with PostgreSQL as the underlying database engine. Additionally, the project uses the API folder to make CRUD (Create, Read, Update, Delete) operations.


<!--- https://shields.io --->

![GitHub repo size](https://img.shields.io/github/repo-size/gustavospriebe/ambiental-mvp?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/gustavospriebe/ambiental-mvp?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/gustavospriebe/ambiental-mvp?style=for-the-badge)
![Github open issues](https://img.shields.io/github/issues/gustavospriebe/ambiental-mvp?style=for-the-badge)

<!--- #################### mudar imagem exemplo #################### --->
___
## Table of Contents
- [Ambiental MVP](#ambiental-mvp)
  - [Table of Contents](#table-of-contents)
    - [🌍 Project Overview](#-project-overview)
    - [💻 Prerequisites](#-prerequisites)
    - [🛠 Tools used](#-tools-used)
    - [🚀 Usage instructions](#-usage-instructions)
      - [Clone repository](#clone-repository)
      - [Install dependencies](#install-dependencies)
      - [Database Setup](#database-setup)
      - [Seed the database](#seed-the-database)
      - [Run app](#run-app)
      - [Testing](#testing)
      - [Database Management](#database-management)
    - [🔚 Endpoints of the application](#-endpoints-of-the-application)
    - [📫 Contributing with ambiental-mvp](#-contributing-with-ambiental-mvp)
    - [🤝 Contributors](#-contributors)

___
### 💻 Prerequisites

- Install LTS Node version.
- Create a database in PostgreSQL (can be done with Prisma + Railway) and point to it in .env file.

<!--- #################### mudar pré-requisitos  ####################--->
___
### 🛠 Tools used

- Typescript
- <b>NextJS</b>
- Prisma ORM
- Next-auth
- Axios
- Postgres
- Tailwind CSS
- Zustand
- ShadCN
- Zod
- React Hook Form
- Tremor
- Dayjs

<!--- #################### mudar ferramentas #################### --->

___

### 🚀 Usage instructions

To get started with Ambiental MVP, follow these steps:

#### Clone repository

```powershell
  git clone https://github.com/gustavospriebe/ambiental-mvp.git
```

#### Install dependencies
Navigate to the project directory and run the following command to install all the required dependencies:

```powershell
  npm install
```

#### Database Setup
- Create a PostgreSQL database. You can use Prisma and Railway to create one easily.

- Configure your database connection in the .env file. Example:

```powershell
  DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```
Replace username, password, localhost, 5432, and database_name with your actual database credentials.

#### Seed the database
To populate the database with initial data, run:

```powershell
  npx prisma db seed
```

#### Run app
Start the development server:

```powershell
  npm run dev
```
Your application should now be accessible at http://localhost:3000.

#### Testing
You can run unit and integration tests with the following command:


```powershell
  npm run test
```

#### Database Management
To access and make changes to the database, open Prisma Studio:

```powershell
npx prisma studio
```
This will open a graphical interface for interacting with your database.

---

### 🔚 Endpoints of the application

| Method | Endpoint              | Description                                        |
| ------ | --------------------- | -------------------------------------------------- |
| GET    | `/api/auth`           | Retrieve user information.                         |
| POST   | `/api/auth`           | Create a new user.                                 |
| GET    | `/api/home`           | Access general certification and task information. |
| GET    | `/api/certifications` | Retrieve complete certification info.              |
| POST   | `/api/certifications` | Create a new certification.                        |
| PATCH  | `/api/certifications` | Edit certification status.                         |
| DELETE | `/api/certifications` | Delete certification information.                  |
| GET    | `/api/certification`  | Access specific certification tasks.               |
| POST   | `/api/certification`  | Create a new task related to certification.        |
| PATCH  | `/api/certification`  | Edit task status related to certification.         |
| DELETE | `/api/certification`  | Delete task related to certification.              |

___

### 📫 Contributing with ambiental-mvp

To contribue with ambiental-mvp, follow the steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <name_branch>`.
3. Make the changes and confirm: `git commit -m '<message_commit>'`
4. Send to original repository: `git push origin <main_branch> / <local>`
5. Send the pull request.

Alternatively, see the GitHub documentation at [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
___
### 🤝 Contributors

Made with ❤️ by:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/gustavospriebe.png" width="100px;" alt="Foto do Gustavo Priebe no GitHub"/><br>
        <sub>
          <b>Gustavo Priebe</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
