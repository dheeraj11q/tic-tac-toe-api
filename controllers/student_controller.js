import studentModel from "../models/student_model.js"

class StudentController {

    static createStudent = async (req, res)=>{
        try {
           
            const {name, age, fees} = req.body
            const student = new studentModel({
                name:name,
                age:age,
                fees:fees
            })
        const result = await student.save()
        res.redirect("/students")
            
        } catch (error) {
            console.log(error)
        }
       
    }
    static getStudents = async (req,res)=>{

        try {
            const result = await studentModel.find()
            res.render("index", {students:result})
            
        } catch (error) {
            console.log(error)
            
        }

       
    }
    static editStudent = async (req,res)=>{

        try {
           
            const result = await studentModel.findById(req.params.id)
            res.render('edit', {student:result})
            
        } catch (error) {
            console.log(error)
            
        }
    }

    static updateStudent = async(req,res)=>{
        try {
            const {name, age, fees} = req.body
           
            const result = await studentModel.findByIdAndUpdate(req.params.id,
                 {name, age, fees
            })
            res.redirect("/students")
            
        } catch (error) {
            console.log(error)
            
        }

    }

    static deleteStudent =async(req,res)=>{

        try {
            const result = await studentModel.findByIdAndDelete(req.params.id)
            res.redirect("/students")
            
        } catch (error) {
            console.log(error)
            
        }
       
    }

}


export default StudentController