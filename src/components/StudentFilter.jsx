export default function StudentFilter({ students, filterClass, setFilterClass }) {
    const classList = ["Tất cả", ...Array.from(new Set(students.map((s) => s.class)))];
  
    return (
      <div className="mb-4">
        <label className="mr-2 font-medium">Lọc theo lớp:</label>
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="p-2 border rounded"
        >
          {classList.map((cls, idx) => (
            <option key={idx} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>
    );
  }