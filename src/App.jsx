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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // Trạng thái cho lớp chọn

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
