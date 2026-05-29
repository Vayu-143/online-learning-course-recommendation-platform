function RecommendationCard({ course }) {
  return (
    <div
      style={{
        border: "1px solid green",
        padding: 15,
        marginBottom: 10,
      }}
    >
      <h4>{course.title}</h4>

      <p>{course.category}</p>
    </div>
  );
}

export default RecommendationCard;