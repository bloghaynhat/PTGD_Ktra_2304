import { useState, useEffect } from "react";
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
  // Lấy danh sách sinh viên từ localStorage nếu có, nếu không lấy từ sampleStudents
  const storedStudents = JSON.parse(localStorage.getItem("students")) || sampleStudents;
  
  const [students, setStudents] = useState(storedStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const addStudent = (newStudent) => {
    const studentWithId = { ...newStudent, id: Date.now() };
    console.log("Thêm sinh viên:", studentWithId);
    setStudents((prev) => {
      const updatedStudents = [...prev, studentWithId];
      localStorage.setItem("students", JSON.stringify(updatedStudents)); // Đồng bộ vào localStorage
      return updatedStudents;
    });
  };

  const deleteStudent = (id) => {
    console.log("Xoá sinh viên với ID:", id);
    setStudents((prev) => {
      const updatedStudents = prev.filter((student) => student.id !== id);
      localStorage.setItem("students", JSON.stringify(updatedStudents)); // Đồng bộ vào localStorage
      return updatedStudents;
    });
  };

  const updateStudent = (updatedStudent) => {
    console.log("Cập nhật sinh viên:", updatedStudent);
    setStudents((prev) => {
      const updatedStudents = prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents)); // Đồng bộ vào localStorage
      return updatedStudents;
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClassFilter = (e) => {
    setSelectedClass(e.target.value);
  };

  // Lọc sinh viên theo tên (không phân biệt hoa thường)
  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((student) =>
      selectedClass ? student.class === selectedClass : true
    );

  // Lấy tất cả các lớp duy nhất từ danh sách sinh viên
  const uniqueClasses = [
    ...new Set(students.map((student) => student.class)),
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sinh viên</h1>
      <StudentForm onAddStudent={addStudent} />
      
      {/* Tìm kiếm sinh viên */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên theo tên..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Lọc sinh viên theo lớp */}
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          value={selectedClass}
          onChange={handleClassFilter}
        >
          <option value="">Chọn lớp</option>
          {uniqueClasses.map((studentClass) => (
            <option key={studentClass} value={studentClass}>
              {studentClass}
            </option>
          ))}
        </select>
      </div>

      <StudentList
        students={filteredStudents}
        onDeleteStudent={deleteStudent}
        onUpdateStudent={updateStudent}
      />
    </div>
  );
}

export default App;
