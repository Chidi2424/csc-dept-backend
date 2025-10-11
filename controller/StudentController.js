const StudentModels = require("../model/StudentModel");
const bcrypt = require("bcryptjs");

const RegisterNewStudent = async (req, res) => {
  const { Name, Email, RegNumber, Level, Password } = req.body;
  try {
    if (!Email || !RegNumber) {
      return res
        .status(400)
        .json({ message: "Email or Reg Number are required" });
    }
    const studentExist = await StudentModels.findOne({ Email, RegNumber });
    if (studentExist) {
      return res
        .status(409)
        .json({ message: "Email or Reg Number Already Exists" });
    }
    const createNewStudent = new StudentModels({
      Name,
      Email,
      RegNumber,
      Level,
      Password,
    });
    const studentResult = await createNewStudent.save();
    res.status(201).json({
      _id: studentResult._id,
      Name: studentResult.Name,
      Email: studentResult.Email,
      RegNumber: studentResult.RegNumber,
      Level: studentResult.Level,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const GetAllStudents = async (req, res) => {
  try {
    const result = await StudentModels.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const GetSingleStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentModels.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student Id not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student" });
  }
};

const UpdateSingleStudent = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, RegNumber, Level, Password } = req.body;
  try {
    const student = await StudentModels.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student Id not found" });
    } else {
      student.Name = Name || student.Name;
      student.Email = Email || student.Email;
      student.RegNumber = RegNumber || student.RegNumber;
      student.Level = Level || student.Level;
      if (Password) student.Password = Password;
    }
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student" });
  }
};

const DeleteSingleStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentModels.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student Id not found" });
    }
    res.json({ message: "Student Id deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student" });
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const checkStudent = await StudentModels.findOne({ Email });
    if (!checkStudent) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    const validPassword = await bcrypt.compare(Password, checkStudent.Password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    res.status(200).json({
      _id: checkStudent._id,
      Name: checkStudent.Name,
      Email: checkStudent.Email,
      RegNumber: checkStudent.RegNumber,
      Level: checkStudent.Level,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

module.exports = {
  RegisterNewStudent,
  GetAllStudents,
  GetSingleStudent,
  UpdateSingleStudent,
  DeleteSingleStudent,
  Login,
};
