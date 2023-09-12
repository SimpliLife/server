# REST API DiagnoAkses

Kita sedang mengembangkan REST API DiagnoAkses Version 1.0

[➡ API Documentation](https://documenter.getpostman.com/view/20472929/2s9YC1Vtv8)

| Method | Route                    | Description                                        |
| ------ | ------------------------ | ---------------------------------------------------|
| GET    | /                        | Redirect ke API DOC                                |
| GET    | /categories              | Daftar kategori gejala                             |
| GET    | /categories/:id/symptoms | Daftar gejala sesuai kategori                      |
| GET    | /symptoms/:id            | Membaca satu gejala                                |
| POST   | /facilities/:filter      | Mendapatkan list faskes melalui filter pada query  |
| GET    | /facilities/id/:id       | Detail faskes berdasarkan id                       |
| GET    | /provinces               | Mendapatkan list provinsi (tidak ada filter)       |
| GET    | /city/:province          | Mendapatkan list kota berdasarkan provinsi         |
| GET    | /loc                     | Mendapatkan list provinsi & kota yang digabungkan  |


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

**Facility**
- kode_faskes : VARCHAR PK
- facility : VARCHAR
- province : VARCHAR FK
- city : VARCHAR FK
- type : VARCHAR FK
- gmap_url : VARCHAR 
- address : TEXT
- telephone : VARCHAR 
- geography : GEOGRAPHY
- lat : FLOAT
- long : FLOAT

**Province**
- province : VARCHAR PK

**City**
- city : VARCHAR PK
- province : VARCHAR FK

**Location**
- name : VARCHAR 
- type : VARCHAR ENUM('city', 'province')

