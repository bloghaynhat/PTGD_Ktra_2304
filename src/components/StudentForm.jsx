
import { useState } from "react"

export default function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !studentClass || !age) return alert("Vui lòng nhập đầy đủ thông tin")
    onAddStudent({ name, class: studentClass, age: Number.parseInt(age) })
    setName("")
    setStudentClass("")
    setAge("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Họ tên
          </label>
          <input
            id="name"
            type="text"
            placeholder="Họ tên"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
            Lớp
          </label>
          <input
            id="class"
            type="text"
            placeholder="Lớp"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Tuổi
          </label>
          <input
            id="age"
            type="number"
            placeholder="Tuổi"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto mt-4 px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1"
        >
          Thêm sinh viên
        </button>
      </div>
    </form>
  )
}
