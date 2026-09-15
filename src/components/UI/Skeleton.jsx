const Skeleton = ({
  width = "100%",
  height = "20px",
  bgColor = "#e5e5e5",
  borderRadius = "5px",
  className = "",
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        maxWidth:width,
        height,
        backgroundColor: bgColor,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;