# REST API DiagnoAkses

Kita sedang mengembangkan REST API DiagnoAkses Version 1.0

Base URL : `http://localhost:3000/api`

| METHOD | Routes               | Description                                    |
| ------ | -------------------- | ---------------------------------------------- |
| GET    | /                    | Redirect ke API DOC                            |
| GET    | /gejala              | Daftar gejala-gejala                           |
| GET    | /gejala/:GejalaId    | Daftar gejala diagram diagnosa sesuai GejalaId |
| GET    | /diagram/diagnosa/:id| Membaca satu data dari tabel diagram diagnosa berdasarkan id |
| GET    | /faskses             | Daftar fasilitas kesehatan                     |


## Dikerjakan dengan `github workflow pull request`
```
main - dev - branch1 
           - branch2
           - branch3
```