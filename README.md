# banco-de-dados-vagas-candidaturas

## Rotas de Usuário

### Registro de usuário POST /users

Padrão de corpo

```json
{
	"name": "Marcos",
	"email": "marcos@hotmail.com",
	"password": "ryan12345"
}
```

Padrão de resposta (STATUS 201)

```json
{
	"id": 5,
	"name": "Marcos",
	"email": "marcos@hotmail.com"
}
```

### Login POST /users/login

Padrão de corpo

```json
{
	"email": "marcos@hotmail.com",
	"password": "ryan12345"
}
```

Padrão de resposta (STATUS 200)

```json
{
	"acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzE1Nzc5MDM2fQ.Yrhm25yE_e94f5xSoUPsyGiOJNH5OfFckilkMTnnQ5Q",
	"user": {
		"id": 5,
		"name": "Marcos",
		"email": "marcos@hotmail.com"
	}
}
```

### Possíveis erros

#### 401 UNAUTHORIZED

```json
{
    "message": "Email and password doesn't match"
}
```

#### 404 NOT FOUND

```json
{
    "message": "User not registered"
}
```

### Retornar usuário GET /users

É necessario autorização para acessar esta rota, forneça o token do cabeçalho da requisição

```json
{
   "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAwNzQ0NzkyfQ.pSaxG1zUp99DyI-yum_3GrpV-AJAk38B-heEE60uOMk"
   }
}
```

Padrão de resposta (STATUS 200)

```json
{
	"id": 3,
	"name": "Pedro",
	"email": "pedro@hotmail.com"
}
```

### POST /opportunities (Esta rota precisa de autorização)

Padrão de corpo

```json
{
	"title": "Dev Back-End",
	"description": "Python"
}
```

Padrão de resposta

```json
{
	"id": 6,
	"title": "Dev Back-End",
	"description": "Python",
	"userId": 5
}
```

### GET /opportunities

 Padrão de resposta (STATUS 200)

 ```json
 [
   {
      "id": 1,
      "title": "Lorem ipsum",
      "description": "Lorem ipsum",
      "userId": 1
   }
]
```

### GET /opportunities/user (Esta rota precisa de autorização)

Padrão de resposta (STATUS 200)

```json
[
   {
      "id": 1,
      "title": "Lorem ipsum",
      "description": "Lorem ipsum",
      "userId": 1
   }
]
```

### GET /opportunities/:id (Esta rota precisa de autorização)

Padrão de resposta (STATUS 200)

```json
{
   "id": 1,
   "title": "Lorem ipsum",
   "description": "Lorem ipsum",
   "userId": 1
}
```

### Possíveis erros

#### 404 NOT FOUND

```json
{
   "message": "Opportunity not found"
}
```

#### 403 FORBIDDEN

```json
{
   "message": "User is not the owner of this opportunity"
}
```

### PATCH /opportunities/:id (Esta rota precisa de autorização)

Padrão de corpo

```json
{
   "title": "Lorem ipsum",
   "description?": "Lorem ipsum"
}
```

Padrão de resposta (STATUS 200)

```json
{
   "id": 1,
   "title": "Lorem ipsum",
   "description": "Lorem ipsum",
   "userId": 1
}
```

### DELETE /opportunities/:id (Esta rota precisa de autorização)

Nenhum corpo de resposta (STATUS 204)

### Possíveis erros

#### 404 NOT FOUND

```json
{
   "message": "Opportunity not found"
}
```

#### 403 FORBIDDEN

```json
{
   "message": "User is not the owner of this opportunity"
}
```

## POST /opportunities/:id/applications

Padrão de corpo

```json
{
   "name": "John Doe",
   "email": "johndoe@email.com",
   "linkedin": "https://example.com"
}
```

Padrão de resposta (STATUS 201)

```json
{
   "id": 1,
   "name": "John Doe",
   "email": "johndoe@email.com",
   "linkedin": "https://example.com",
   "opportunityId": 1
}
```

### Possíveis erros

#### 404 NOT FOUND

```json
{
   "message": "Opportunity not found"
}
```


## GET /opportunities/:id/applications (Esta rota precisa de autorização)

Padrão de resposta (STATUS 200)

```json
[
   {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@email.com",
      "linkedin": "https://example.com",
      "opportunityId": 1
   }
]
```


### Possíveis erros

#### 404 NOT FOUND

```json
{
   "message": "Opportunity not found"
}
```

#### 403 FORBIDDEN

```json
{
   "message": "User is not the owner of this opportunity"
}
```