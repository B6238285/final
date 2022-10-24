package entity

import (
	"time"

	"gorm.io/gorm"
)

// ///////////////////////////////////////////////////////////////////////////

type Role struct {
	gorm.Model
	Name       string
	BorrowDay  int
	BookRoomHR int
	BookComHR  int
	Books      []Book `gorm:"foreignKey:RoleID"`
	Users      []User `gorm:"foreignKey:RoleID"`
	//Bills      []Bill `gorm:"foreignKey:RoleID"`
}

type Province struct {
	gorm.Model
	Name  string
	Users []User `gorm:"foreignKey:ProvinceID"`
}

type MemberClass struct {
	gorm.Model
	Name     string
	Discount int
	Users    []User `gorm:"foreignKey:MemberClassID"`
	Bills    []Bill `gorm:"foreignKey:MemberClassID"`
}

type User struct {
	gorm.Model
	Pin       string `gorm:"uniqueIndex"`
	FirstName string
	LastName  string
	Civ       string `gorm:"uniqueIndex"`
	Phone     string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Address   string
	//FK
	RoleID        *uint
	ProvinceID    *uint
	MemberClassID *uint
	//JOIN
	Province    Province    `gorm:"references:id"`
	Role        Role        `gorm:"references:id"`
	MemberClass MemberClass `gorm:"references:id"`
	Bills       []Bill      `gorm:"foreignKey:UserID"`
	Bill        []Bill      `gorm:"foreignKey:EmployeeID"`
}

// ///////////////////////////////////////////////////////////////////////////
type BookType struct {
	gorm.Model
	Type string
	//1 book type มีได้หลาย book
	Books []Book `gorm:"foreignKey:BooktypeID"`
}

type Shelf struct {
	gorm.Model
	Type  string
	Floor uint
	//1 shelf มีได้หลาย book
	Books []Book `gorm:"foreignKey:ShelfID"`
}

type Book struct {
	gorm.Model
	Name string
	//ทำหน้าที่เป็น FK
	UserID     *uint
	BooktypeID *uint
	ShelfID    *uint
	RoleID     *uint
	//join ให้งายขึ้น
	User     User     `gorm:"references:id"`
	Booktype BookType `gorm:"references:id"`
	Shelf    Shelf    `gorm:"references:id"`
	Role     Role     `gorm:"references:id"`
	Author   string
	Page     int
	Quantity int
	Price    float32
	Date     time.Time
	Bills    []Bill `gorm:"foreignKey:BookID"`
}

/////////////////////////////////////////////////////////////////////////////

type Bill struct { //เป็นการ get api มาจาก code จะไปอยู่ในส่วนของ front end
	gorm.Model
	//ทำหน้าที่เป็น FK
	BookID *uint
	Book   Book `gorm:"references:id"`

	//ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   User

	//ทำหน้าที่เป็น FK
	MemberClassID *uint
	MemberClass   MemberClass `gorm:"references:id"`

	//ทำหน้าที่เป็น FK
	UserID *uint
	User   User `gorm:"references:id"`

	//join ให้งายขึ้น

	Price    float32 //uint ไม่มีเครื่องหมายติดลบ
	Discount uint
	Total    float32
	BillTime time.Time
}
