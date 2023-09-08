# REST API DiagnoAkses

Kita sedang mengembangkan REST API DiagnoAkses Version 1.0

Base URL : `http://localhost:3000/api`

| Method | Route                   | Description                    |
| ------ | ------------------------ | ------------------------------|
| GET    | /                        | Redirect ke API DOC           |
| GET    | /categories              | Daftar kategori gejala        |
| GET    | /categories/:id/symptoms | Daftar gejala sesuai kategori |
| GET    | /symptoms/:id            | Membaca satu gejala           |


## Dikerjakan dengan `github workflow pull request`
```
main - dev - branch1 
           - branch2
           - branch3
```

# Model 

**Category**
- id : INT PK
- category : VACHAR
- icon : VARCHAR
- createdAt : DATE
- updatedAt : DATE

**Symptom**
- id : INT PK
- CategoryId : INT REF
- title : VARCHAR
- slug : VARCHAR
- ref : INT
- firstQuestion : VARCHAR
- q : JSON
- createdAt : DATE
- updatedAt : DATE