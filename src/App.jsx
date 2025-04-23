import { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

const sampleStudents = [
  { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
  { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
  { id: 3, name: "Lê Văn C", class: "12A1", age: 18 },
  { id: 4, name: "Phạm Thị D", class: "12A3", age: 17 },
  { id: 5, name: "Đặng Văn E", class: "12A2", age: 18 },
];

function App() {
  const [students, setStudents] = useState(sampleStudents);

  const addStudent = (newStudent) => {
    const studentWithId = { ...newStudent, id: Date.now() };
    console.log("Thêm sinh viên:", studentWithId);
    setStudents((prev) => [...prev, studentWithId]);
  };

  const deleteStudent = (id) => {
    console.log("Xoá sinh viên với ID:", id);
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const updateStudent = (updatedStudent) => {
    console.log("Cập nhật sinh viên:", updatedStudent);
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sinh viên</h1>
      <StudentForm onAddStudent={addStudent} />
      <StudentList
        students={students}
        onDeleteStudent={deleteStudent}
        onUpdateStudent={updateStudent}
      />
    </div>
  );
}

export default App;