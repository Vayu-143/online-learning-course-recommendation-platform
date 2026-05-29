import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProgressChart({
  data,
  darkMode,
}) {
  return (
    <div
      style={{
        background: darkMode
          ? "#1f2937"
          : "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow:
          "0px 2px 10px rgba(0,0,0,0.15)",
        marginTop: "30px",
      }}
    >
      <h2>
        📊 Progress by Course
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="course" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Bar
            dataKey="progress"
            fill="#4f46e5"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;