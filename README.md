# Table of Contents

  <ol>
  <li> <a href="https://htttinder.github.io/docs/">Documentation</a></li>
    <li>
      <a href="#project-overview">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
    <a href="#sumary"></a>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#recommended">Recommended</a></li>
      </ul>
    </li>
     <li><a href="#installing"> Installing</a></li>
   <li> <a href="#installing-with-docker"> Installing with docker<a></li>
    <li><a href="#usage">Usage Examples</a></li>
    <li><a href="#team">Team</a></li>
  </ol>

<br>

---

# Project Overview

## Kenzie Love is an application designed to connect people through their common interests.

<br>

The development process of this project prioritized creating a **flexible** and **user-friendly** environment, always taking into account their **security**.

<br>

In its basic use the user needs to fill the profile information, being able to add photos, personal interests and **express what they're looking for in their connections**, be it a serious or casual relationship, even simple friendship. In this way the algorithm will return the best match option based on the information passed in the profile.

<br>

---

## Built With

- [Express](https://www.npmjs.com/package/express)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cloudinary](https://cloudinary.com/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [pg](https://www.npmjs.com/package/pg)
- [typeorm](https://typeorm.io/)
- [yup](https://www.npmjs.com/package/yup)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [class-validator](https://www.npmjs.com/package/class-validator)
- [dotenv](https://www.npmjs.com/package/dotenv)

<br>

# Sumary

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Nodejs](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [PostgresSQL:14](https://www.postgresql.org/download/)

### Recommended

- [Visual Studio Code](https://code.visualstudio.com/Download) - IDE

---

## Installing

<br>

- **Clone repository**

```
git clone git@github.com:httTinder/httTinder-Api.git
```

- **Copy the environment variables**

```
 cp .env.exemple .env
```

- **Install dependencies**

```
npm install

yarn
```

- **Run the Migrations**

```
npm run typeorm migration:run -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts
```

- **Start application**

```
npm run dev

yarn dev
```

## Installing with docker

- **Build application**

```
docker-compose up --build
```

- **Start application**

```
docker-compose up
```

## Usage

### **Base URL**

```
https://htttinder.herokuapp.com
```

### POST /user

Route responsible for creating new user

- #### Required fields

  | Field    | Type   | Description     |
  | -------- | ------ | --------------- |
  | name     | string | User's Name     |
  | email    | string | User's Email    |
  | password | string | User's Passowrd |
  | age      | string | user's Age      |

- #### Example:

```JSON
    {
        "email" :"fabio50019@gmail.com",
        "name" : "fabio jose casanova",
        "password" : "2209",
        "age" : "33"
    }
```

---

### PATCH /user/profile/:id

Route responsible for creating user profile or update any field on the user profile

- #### Required fields

  | Field        | Type   | Description            |
  | ------------ | ------ | ---------------------- |
  | orientation  | string | User's Name            |
  | gender       | string | User's Gender          |
  | bio          | string | User's Short biography |
  | height       | string | User's Height          |
  | education    | string | User's Education       |
  | profession   | string | User's Profession      |
  | profileImage | string | User's Photo           |

  <br>

### < This route requires authentication>

If the id is not passed through params, the one provided by the token will be used.

<br>

- #### Example:

```JSON
   {
    "orientation" : "hétero",
    "gender" : "Homem",
    "bio" : "sou bem legal",
    "height": 1.85,
    "education" : "Formado",
    "profession" : "Dev",
    "profileImage" : "12530000"
    }
```

### Expected Response:

```JSON
   {
    "message": "Profile changed successfully"
    }
```

### Errors:

- 400 : errors relating to the data reported in the field, check whether the data respects the maximum size or has been informed.
- 401 : error may refer to the validity of the token, the user, or whether the user was not adm.
- 403 : error regarding lack of authorisation.
- 404 : error user was not found

---

### DELETE /user/profile/:id

Route responsible for delete the profile

- #### No body required

### < This route requires authentication>

If the id is not passed through params, the one provided by the token will be used.

<br>

### Expected Response:

```JSON
   {
    "message": "Profile deleted with sucess!"
    }
```

### Errors:

- 400 : errors relating to the data reported in the field, check whether the data respects the maximum size or has been informed.
- 401 : error may refer to the validity of the token, the user, or whether the user was not adm.
- 403 : error regarding lack of authorisation.
- 404 : error user was not found

_For more examples, please refer to the [Documentation](https://htttinder.github.io/docs/)_

---

<a href="#table-of-contents">back to top</a>

## Team
<table style="background-color:#272B33" >
<tr>
<td width="30%"><p>Quality assurance</p><a href="https://github.com/DiegoOlive29"><p>Diego Guimarães</p><img src="https://avatars.githubusercontent.com/u/98782639?v=4" /></a></td>
<td width="30%"><p>Tech Lead</p><a href="https://github.com/fabiojcp"><p>Fábio Casanova</p><img src="https://avatars.githubusercontent.com/u/98760788?v=4" /></a></td>
<td width="30%"><p>Dev | UX/UI</p><a href="https://github.com/fjrjdev"><p>Fábio Junior</p><img src="https://avatars.githubusercontent.com/u/78241929?v=4" /></a></td>

<table style="background-color:#272B33" >
<td width="30%"><p>Quality assurance</p><a href="https://github.com/devigorgarcia"><p>Igor Garcia</p><img src="https://avatars.githubusercontent.com/u/19495297?v=4" /></a></td>
<td width="30%"><p>PO | UX/UI</p><a href="https://github.com/Mapinko"><p>Mari Spinola </p><img src="https://avatars.githubusercontent.com/u/89092249?v=4" /></a></td>
<td width="30%"><p>Scrum master</p><a href="https://github.com/lmfreire"><p>Matheus Freire</p><img src="https://avatars.githubusercontent.com/u/67373130?v=4" /></a></td>
</tr>
</table>