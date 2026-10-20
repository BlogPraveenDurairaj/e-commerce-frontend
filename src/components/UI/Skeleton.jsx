const Skeleton = ({
  width = "100%",
  height = "20px",
  bgColor = "#e8ebee",
  borderRadius = "5px",
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        maxWidth: width,
        height,
        backgroundColor: bgColor,
        borderRadius,
        width:"100%"
      }}
    />
  );
};

export default Skeleton;