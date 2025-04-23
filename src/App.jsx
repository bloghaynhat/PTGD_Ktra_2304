

import { useState } from "react"
import StudentList from "./components/StudentList"
import StudentForm from "./components/StudentForm"
import { Search, Filter, GraduationCap } from "lucide-react"

const sampleStudents = [
  { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
  { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
  { id: 3, name: "Lê Văn C", class: "12A1", age: 18 },
  { id: 4, name: "Phạm Thị D", class: "12A3", age: 17 },
  { id: 5, name: "Đặng Văn E", class: "12A2", age: 18 },
]

export default function App() {
  // Lấy danh sách sinh viên từ localStorage nếu có, nếu không lấy từ sampleStudents
  const storedStudents = JSON.parse(localStorage.getItem("students") || "null") || sampleStudents

  const [students, setStudents] = useState(storedStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")

  const addStudent = (newStudent) => {
    const studentWithId = { ...newStudent, id: Date.now() }
    console.log("Thêm sinh viên:", studentWithId)
    setStudents((prev) => {
      const updatedStudents = [...prev, studentWithId]
      localStorage.setItem("students", JSON.stringify(updatedStudents)) // Đồng bộ vào localStorage
      return updatedStudents
    })
  }

  const deleteStudent = (id) => {
    console.log("Xoá sinh viên với ID:", id)
    setStudents((prev) => {
      const updatedStudents = prev.filter((student) => student.id !== id)
      localStorage.setItem("students", JSON.stringify(updatedStudents)) // Đồng bộ vào localStorage
      return updatedStudents
    })
  }

  const updateStudent = (updatedStudent) => {
    console.log("Cập nhật sinh viên:", updatedStudent)
    setStudents((prev) => {
      const updatedStudents = prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      localStorage.setItem("students", JSON.stringify(updatedStudents)) // Đồng bộ vào localStorage
      return updatedStudents
    })
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClassFilter = (e) => {
    setSelectedClass(e.target.value)
  }

  // Lọc sinh viên theo tên (không phân biệt hoa thường)
  const filteredStudents = students
    .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((student) => (selectedClass ? student.class === selectedClass : true))

  // Lấy tất cả các lớp duy nhất từ danh sách sinh viên
  const uniqueClasses = [...new Set(students.map((student) => student.class))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-purple-600 text-white rounded-full mb-4">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý sinh viên</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Hệ thống quản lý thông tin sinh viên giúp bạn theo dõi, cập nhật và tìm kiếm thông tin sinh viên một cách dễ
            dàng.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
  <div className="p-4 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm sinh viên mới</h2>
    <StudentForm onAddStudent={addStudent} />
  </div>

  <div className="p-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Tìm kiếm và lọc</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {/* Tìm kiếm sinh viên */}
      <div className="relative">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Tìm kiếm theo tên
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            type="text"
            placeholder="Tìm kiếm sinh viên theo tên..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Lọc sinh viên theo lớp */}
      <div>
        <label htmlFor="class-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Lọc theo lớp
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="class-filter"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none"
            value={selectedClass}
            onChange={handleClassFilter}
          >
            <option value="">Tất cả các lớp</option>
            {uniqueClasses.map((studentClass) => (
              <option key={studentClass} value={studentClass}>
                {studentClass}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách sinh viên</h2>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {filteredStudents.length} sinh viên
              </span>
            </div>
          </div>
          <div className="p-6">
            <StudentList students={filteredStudents} onDeleteStudent={deleteStudent} onUpdateStudent={updateStudent} />
          </div>
        </div>
      </div>
    </div>
  )
}
