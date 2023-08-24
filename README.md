# Ambiental MVP

<!--- https://shields.io --->

![GitHub repo size](https://img.shields.io/github/repo-size/gustavospriebe/ambiental-mvp?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/gustavospriebe/ambiental-mvp?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/gustavospriebe/ambiental-mvp?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/gustavospriebe/ambiental-mvp?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/gustavospriebe/ambiental-mvp?style=for-the-badge)

___
<!--- #################### mudar badges #################### --->

https://user-images.githubusercontent.com/75763403/151466227-8aa38f60-b098-4dea-aab7-a14c3ed4d296.mp4

<!--- #################### mudar imagem exemplo #################### --->
___
> This project was created to practice how to implement an production application in Next 13. A lot of features has changed since the previous version and I have decided to build an project management solution that includes an implementation of Prisma using PostgreSQL and using the Api folder to make CRUD actions.
___
## 💻 Prerequisites

- Install LTS Node version.
- Create OAuth provider in Google Console
- Create a database in postgres (can be done with Prisma + Railway) and point to it in .env file.

<!--- #################### mudar pré-requisitos  ####################--->
___
## 🛠 Tools used

- Typescript
- <b>Nextjs</b>
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

## 🚀 Installing ambiental-mvp

#### Clone repository

```powershell
  git clone https://github.com/gustavospriebe/ambiental-mvp.git
```

#### Install dependencies

```powershell
  npm install
```

#### Seed the database with the ranking

```powershell
  npx prisma db seed
```

#### Run app

```powershell
  npm run dev
```

#### Run unit/integration tests

```powershell
  npm run test
```

#### Open prisma studio to access and alter database

```powershell
npx prisma studio
```

#### Endpoints of the application

```powershell
GET (ranking DESC) -> /api/users
PUT (edit user info) -> /api/users/edit/${id}
GET (user info) -> /api/users/${id}
GET (lit projects) -> /api/projects
```

___

## 📫 Contribuiting with renovaih

To contribue with renovaih, follow the steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <name_branch>`.
3. Make the changes and confirm: `git commit -m '<message_commit>'`
4. Send to original repository: `git push origin <main_branch> / <local>`
5. Send the pull request.

Alternatively, see the GitHub documentation at [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
___
## 🤝 Contributors

Made with ❤️ by:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/rodrigorvsn.png" width="100px;" alt="Foto do Rodrigo Victor no GitHub"/><br>
        <sub>
          <b>Rodrigo Victor</b>
        </sub>
      </a>
    </td>
  </tr>
</table>