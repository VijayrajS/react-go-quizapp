package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	IsAdmin  bool   `json:"isadmin"`
}
type Genre struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type Quiz struct {
	ID    uint   `json:"id" gorm:"ForeignKey:QuestionQuizID"`
	Name  string `json:"name"`
	Genre uint   `json:"gid"`
}

type Question struct {
	ID       uint   `json:"quid"`
	Ques     string `json:"ques"`
	Opt1     string `json:"opt1"`
	Opt2     string `json:"opt2"`
	Opt3     string `json:"opt3"`
	Opt4     string `json:"opt4"`
	Opt1Corr bool   `json:"opt1c"`
	Opt2Corr bool   `json:"opt2c"`
	Opt3Corr bool   `json:"opt3c"`
	Opt4Corr bool   `json:"opt4c"`
	QuizID   uint   `json:"qid"`
}

type QuizFin struct {
	ID    uint `json:"id"`
	User  uint `json:"user"`
	Quiz  uint `json:"quiz"`
	Marks uint `json:"marks"`
}

//
type Result struct {
	Name  string `json:"name"`
	Score uint   `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Genre{}, &Quiz{}, &Question{}, &User{}, &QuizFin{})
	r := gin.Default()

	r.GET("/genre/", GetGenres)   // Getting list of all genres
	r.GET("/genre/:id", GetGenre) // Getting a genre based on ID

	r.GET("/quizzes/:gid", GetQuizzes) // Getting list of all quizzes under genre with 'id'
	r.GET("/quizzes/", GetAllQuizzes)  // Getting list of all quizzes under genre with 'id'
	r.POST("/quizzes", CreateQuiz)
	r.DELETE("/quizzes/:id", DeleteQuiz)

	r.GET("/questions/:qid", GetQuestions)
	r.POST("/questions", CreateQues)
	r.DELETE("/questions/:qid", DeleteQuesByQuiz)
	r.DELETE("/quest/:id", DeleteQues)

	r.GET("/users/", GetUsers) // Creating routes for each functionality
	r.GET("/users/:name", GetUser)
	r.POST("/users", CreateUser)
	r.DELETE("/users/:name", DeleteUser)

	r.POST("/quizfin/", PostFin)
	r.GET("/quizfin/:gid", LeaderBoards)
	r.GET("/quizf/dash/:id", DBoards)

	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

// Genres
func GetGenres(c *gin.Context) {
	var genre []Genre
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(genre)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? No time to find out.
		c.JSON(200, genre)
	}
}

func GetGenre(c *gin.Context) {
	id := c.Params.ByName("id")
	var genre Genre
	if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}
}

// Quizzes
func GetQuizzes(c *gin.Context) {
	var quizlist []Quiz
	genreid := c.Params.ByName("gid")

	if err := db.Where("genre = ?", genreid).Find(&quizlist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(quizlist)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? No time to find out.
		c.JSON(200, quizlist)
	}
}

func CreateQuiz(c *gin.Context) {
	var NewQuiz Quiz
	c.BindJSON(&NewQuiz)
	db.Create(&NewQuiz)
	fmt.Println(NewQuiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, NewQuiz)
}

func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Quiz
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"name #" + id: "deleted"})
}

func GetAllQuizzes(c *gin.Context) {
	var qlist []Quiz
	if err := db.Find(&qlist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, qlist)
	}
}

// Questions

func CreateQues(c *gin.Context) {
	var NewQue Question
	fmt.Println("Here")
	c.BindJSON(&NewQue)
	db.Create(&NewQue)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	fmt.Println(NewQue)
	c.JSON(200, NewQue)
}

func GetQuestions(c *gin.Context) {
	var queslist []Question
	quizid := c.Params.ByName("qid")

	if err := db.Where("quiz_id = ?", quizid).Find(&queslist).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(queslist)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? No time to find out.
		c.JSON(200, queslist)
	}
}
func DeleteQuesByQuiz(c *gin.Context) {
	id := c.Params.ByName("qid")
	var person Question
	d := db.Where("quiz_id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"name #" + id: "deleted"})
}

func DeleteQues(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Question
	d := db.Where("qu_id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"name #" + id: "deleted"})
}

// Users
func DeleteUser(c *gin.Context) {
	name := c.Params.ByName("name")
	var person User
	d := db.Where("name = ?", name).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"name #" + name: "deleted"})
}

func GetUsers(c *gin.Context) {
	var people []User
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}

func CreateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	uname := user.Name
	fmt.Println(uname)
	if exists := db.Where("name = ?", user.Name).First(&user).RecordNotFound(); exists == true {
		db.Create(&user)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(430, user)
	}
}

func GetUser(c *gin.Context) {
	var user User
	name := c.Params.ByName("name")
	if exists := db.Where("name = ?", name).First(&user).RecordNotFound(); exists == true {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(430, user)

	} else {
		fmt.Println(user)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}

// Finished quizzes
func PostFin(c *gin.Context) {
	var NewQuiz QuizFin
	c.BindJSON(&NewQuiz)
	db.Create(&NewQuiz)
	fmt.Println(NewQuiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, NewQuiz)
}

func LeaderBoards(c *gin.Context) {
	genreid := c.Params.ByName("gid")
	var lead []Result
	rows, _ := db.Raw("SELECT u.name, sum(qf.marks) FROM users as u, quiz_fins as qf, quizzes as q WHERE u.id = qf.user AND qf.quiz = q.id and q.genre = ? GROUP BY u.name ORDER BY sum(qf.marks) DESC", genreid).Rows() // (*sql.Rows, error)
	defer rows.Close()
	// fmt.Println(rows)
	for rows.Next() {
		var name string
		var score uint
		rows.Scan(&name, &score)
		temp := Result{Name: name, Score: score}
		fmt.Println(name, temp)
		lead = append(lead, temp)
	}

	fmt.Println(lead)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? No time to find out.
	c.JSON(200, lead)
}

func DBoards(c *gin.Context) {
	id := c.Params.ByName("id")
	var lead []Result
	rows, _ := db.Raw("SELECT q.name, qf.marks FROM  users as u, quiz_fins as qf, quizzes as q WHERE u.id = qf.user AND qf.quiz = q.id and u.id = ?", id).Rows() // (*sql.Rows, error)
	defer rows.Close()
	fmt.Println(rows)
	for rows.Next() {
		var name string
		var score uint
		rows.Scan(&name, &score)
		temp := Result{Name: name, Score: score}
		fmt.Println(name, temp)
		lead = append(lead, temp)
	}

	fmt.Println(lead)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? No time to find out.
	c.JSON(200, lead)
}

// func CreatePerson(c *gin.Context) {
// 	var person Person
// 	c.BindJSON(&person)
// 	db.Create(&person)
// 	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
// 	c.JSON(200, person)
// }
