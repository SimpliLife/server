# REST API DiagnoAkses

Kita sedang mengembangkan REST API DiagnoAkses Version 1.0

[➡ API Documentation](https://documenter.getpostman.com/view/20472929/2s9YC1Vtv8)

| Method | Route                   | Description                    |
| ------ | ------------------------ | ------------------------------|
| GET    | /                        | Redirect ke API DOC           |
| GET    | /categories              | Daftar kategori gejala        |
| GET    | /categories/:id/symptoms | Daftar gejala sesuai kategori |
| GET    | /symptoms/:id            | Membaca satu gejala           |


> **Dikerjakan dengan `github workflow pull request`**

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