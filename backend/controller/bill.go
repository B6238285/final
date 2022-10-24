package controller

import (
	"net/http"

	"github.com/B6238285/week5/entity"

	"github.com/gin-gonic/gin"
)

// POST /bills
func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var book entity.Book
	var memberclass entity.MemberClass
	var user entity.User
	var employee entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา book ด้วย id
	//if tx := entity.DB().Preload("User").First(&bill, bill.UserID); tx.RowsAffected == 0 {
	if tx := entity.DB().Where("id = ?", bill.BookID).First(&book); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "book not  found"})
		return
	}

	//if tx := entity.DB().Where("id = ?", bill).First(bill.Price); tx.RowsAffected == 0 {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": "book not  found"})
	//	return
	//}

	//ค้นหา memberclass ด้วย id ของ user
	//if tx := entity.DB().Preload("MemberClass").First(&user, user.ID); tx.RowsAffected == 0 {
	//if tx := entity.DB().Where("id = ?", bill.UserID).First(&memberclass); tx.RowsAffected == 0 {

	/*if tx := entity.DB().Where("id = ?", user.MemberClass.ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "memberclass not  found"})
		return
	}*/ //อันมีหวัง

	//if tx := entity.DB().Preload("User").First(&user.MemberClass, memberclass.ID); tx.RowsAffected == 0 {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": "ฮาโหล"})
	//	return ใช้แล้ว ราคามา
	//}
	if tx := entity.DB().Where("id = ?", bill.MemberClassID).First(&memberclass); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "memberclass not  found"})
		return
	}
	//if tx := entity.DB().Preload("Book").First(&book, bill.Book.Price); tx.RowsAffected == 0 {

	// ค้นหา employe ด้วย id ระบบออฟเจคใน ออฟเจคใหม่
	if tx := entity.DB().Where("id = ?", bill.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not  found"})
		return
	}

	// ค้นหา user ด้วย id
	//if tx := entity.DB().Preload("User").First(&user, bill.UserID); tx.RowsAffected == 0 {
	if tx := entity.DB().Where("id = ?", bill.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not  found"})
		return
	}

	if tx := entity.DB().Where("id = ? AND member_class_id = ?", bill.UserID, bill.MemberClassID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user memberclass id and bill memberclassid are not match"})
		return
	}
	// ค้าหา price ด้วย id ของ bill
	//if tx := entity.DB().Where("price = ?", bill).First(&bill); tx.RowsAffected == 0 {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่เจอ"})
	//	return
	//}

	/*//ค้นหา memberclass ด้วย id ของ user
	if tx := entity.DB().Preload("User").First(&bill, bill.UserID); tx.RowsAffected == 0 {
		//if tx := entity.DB().Where("id = ?", bill.UserID).First(&memberclass); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "memberclass not  ฮาโหล"})
		return
	}*/

	// สร้าง bill
	bl := entity.Bill{
		Book:        book,          // โยงความสัมพันธ์กับ Entity Book
		Employee:    employee,      // โยงความสัมพันธ์กับ Entity Employee
		User:        user,          // โยงความสัมพันธ์กับ Entity User
		BillTime:    bill.BillTime, // ตั้งค่าฟิลด์ billTime
		Price:       float32(book.Price),
		Discount:    uint(memberclass.Discount),
		Total:       float32(book.Price) - float32(memberclass.Discount),
		MemberClass: memberclass,
	}

	// ขั้นตอน validate
	//if _, err := govalidator.ValidateStruct(bl); err != nil {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	//	return
	//}

	// บันทึก
	if err := entity.DB().Create(&bl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bl})

}

// GET /bill /:id
func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /bills

func ListBills(c *gin.Context) {
	var bills []entity.Bill
	if err := entity.DB().Preload("Book").Preload("Employee").Preload("User").Preload("MemberClass").Raw("SELECT * FROM bills").Find(&bills).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bills})
}

// คนขายเป็นคนซื้อไม่ได้
func ListUserByrole(c *gin.Context) {
	var user []entity.User
	if err := entity.DB().Preload("MemberClass").Preload("Province").Preload("Role").Raw("SELECT * FROM users WHERE role_id != 3").Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DELETE /bills /:id
func DeleteBill(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bills
func UpdateBill(c *gin.Context) {
	var bill entity.Bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	if err := entity.DB().Save(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// get member id
/* func GetmemberSelectuser(c *gin.Context) {
	var user []entity.User

	id := c.Param("id")
	if err := entity.DB().Preload("Province").Preload("Role").Preload("MemberClass").Preload("Employee").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})

} */
