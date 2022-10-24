package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Role{},
		&Province{},
		&MemberClass{},
		&User{},
		&BookType{},
		&Shelf{},
		&Book{},
		&Bill{},
	)

	db = database

	password1, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	//password2, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	password3, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	password4, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	//Role
	student := Role{
		Name:       "Student",
		BorrowDay:  3,
		BookRoomHR: 3,
		BookComHR:  4,
	}

	db.Model(&Role{}).Create(&student)

	teacher := Role{
		Name:       "Teacher",
		BorrowDay:  7,
		BookRoomHR: 12,
		BookComHR:  12,
	}
	db.Model(&Role{}).Create(&teacher)

	employee := Role{
		Name:       "Employee",
		BorrowDay:  5,
		BookRoomHR: 6,
		BookComHR:  6,
	}
	db.Model(&Role{}).Create(&employee)

	//Shelf
	S1 := Shelf{
		Type:  "SCIENCE",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S1)
	S2 := Shelf{
		Type:  "ENGINEERING",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S2)
	S3 := Shelf{
		Type:  "ENVIRRONMENT",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S3)
	S4 := Shelf{
		Type:  "HISTORY",
		Floor: 1,
	}
	db.Model(&Shelf{}).Create(&S4)
	S5 := Shelf{
		Type:  "FICTION",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S5)
	S6 := Shelf{
		Type:  "FANTASY",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S6)
	S7 := Shelf{
		Type:  "HORROR",
		Floor: 2,
	}
	db.Model(&Shelf{}).Create(&S7)

	//Book Type
	BT1 := BookType{
		Type: "COMPUTER ENGINEERING",
	}
	db.Model(&BookType{}).Create(&BT1)

	BT2 := BookType{
		Type: "ELECTRIC ENGINEERING",
	}
	db.Model(&BookType{}).Create(&BT2)

	BT3 := BookType{
		Type: "SUPERHERO FANTASY",
	}
	db.Model(&BookType{}).Create(&BT3)

	BT4 := BookType{
		Type: "HORROR FICTION",
	}
	db.Model(&BookType{}).Create(&BT4)

	BT5 := BookType{
		Type: "DARK AND GRIMDARK FANTASY",
	}
	db.Model(&BookType{}).Create(&BT5)
	BT6 := BookType{
		Type: "CONTEMPORARY FANTASY",
	}
	db.Model(&BookType{}).Create(&BT6)

	//province
	korat := Province{
		Name: "Nakhon Ratchasima",
	}
	db.Model(&Province{}).Create(&korat)

	chon := Province{
		Name: "Chonburi",
	}
	db.Model(&Province{}).Create(&chon)

	bangkok := Province{
		Name: "Bangkok",
	}
	db.Model(&Province{}).Create(&bangkok)

	//member
	classic := MemberClass{
		Name:     "classic",
		Discount: 0,
	}
	db.Model(&MemberClass{}).Create(&classic)

	silver := MemberClass{
		Name:     "silver",
		Discount: 5,
	}
	db.Model(&MemberClass{}).Create(&silver)

	gold := MemberClass{
		Name:     "gold",
		Discount: 10,
	}
	db.Model(&MemberClass{}).Create(&gold)

	plat := MemberClass{
		Name:     "platinum",
		Discount: 20,
	}
	db.Model(&MemberClass{}).Create(&plat)

	//user
	//user
	user1 := User{
		Pin:       "B6111111",
		FirstName: "preecha",
		LastName:  "anpa",
		Civ:       "1111111111111",
		Phone:     "0811111111",
		Email:     "preechapat@mail.com",
		Password:  string(password3),
		Address:   "ถนน a อำเภอ v",
		//FK
		Role:        student,
		Province:    korat,
		MemberClass: classic,
	}
	db.Model(&User{}).Create(&user1)

	user2 := User{
		Pin:       "E123456",
		FirstName: "Sirinya",
		LastName:  "kot",
		Civ:       "1234567890123",
		Phone:     "0899999999",
		Email:     "sirinya@mail.com",
		Password:  string(password1),
		Address:   "ถนน c อำเภอ z",
		//FK
		Role:        employee,
		Province:    bangkok,
		MemberClass: plat,
	}
	db.Model(&User{}).Create(&user2)

	db.Model(&User{}).Create(&User{
		Pin:       "T654321",
		FirstName: "Wichai",
		LastName:  "Micro",
		Civ:       "3210987654321",
		Phone:     "0823456789",
		Email:     "wichai@mail.com",
		Password:  string(password3),
		Address:   "ถนน c อำเภอ z",
		//FK
		Role:        teacher,
		Province:    bangkok,
		MemberClass: plat,
	})

	db.Model(&User{}).Create(&User{
		Pin:       "B6222222",
		FirstName: "kawin",
		LastName:  "anpa",
		Civ:       "22222222222222",
		Phone:     "0811111111",
		Email:     "kawin@mail.com",
		Password:  string(password4),
		Address:   "ถนน a อำเภอ v",
		//FK
		Role:        student,
		Province:    korat,
		MemberClass: classic,
	})

	var preecha User
	db.Raw("SELECT * FROM users WHERE email = ?", "preechapat@mail.com").Scan(&preecha)

	var kawin User
	db.Raw("SELECT * FROM users WHERE email = ?", "kawin@mail.com").Scan(&kawin)
	//Book
	db.Model(&Book{}).Create(&Book{
		Name:     "Python 1",
		User:     user2,
		Booktype: BT1,
		Shelf:    S2,
		Role:     student,
		Author:   "Sirin",
		Page:     500,
		Quantity: 20,
		Price:    300.0,
		Date:     time.Now(),
	})
	db.Model(&Book{}).Create(&Book{
		Name:     "Java",
		User:     user2,
		Booktype: BT1,
		Shelf:    S2,
		Role:     teacher,
		Author:   "AJ",
		Page:     350,
		Quantity: 10,
		Price:    200.5,
		Date:     time.Now(),
	})
	var Python Book
	db.Raw("SELECT * FROM books WHERE name = ?", "Python 1").Scan(&Python)

	var Java Book
	db.Raw("SELECT * FROM books WHERE name = ?", "Java").Scan(&Java)

	db.Model(&Bill{}).Create(&Bill{
		Price:       float32(Python.Price),
		Employee:    user2,  //ค้นหาจาก id
		Book:        Python, //ค้นหาจาก id
		User:        user1,  //ค้นหาจาก id
		MemberClass: gold,   //ดึงไงวะ
		Discount:    uint(gold.Discount),
		Total:       float32(Python.Price) - float32(gold.Discount),
		BillTime:    time.Now(),
	})

	db.Model(&Bill{}).Create(&Bill{
		Price:       float32(Java.Price),
		Employee:    user2, //ค้นหาจาก id
		Book:        Java,  //ค้นหาจาก id
		User:        user1, //ค้นหาจาก id
		MemberClass: plat,  //ดึงไงวะ
		Discount:    uint(plat.Discount),
		Total:       float32(Java.Price) - float32(plat.Discount),
		BillTime:    time.Now(),
	})

}
