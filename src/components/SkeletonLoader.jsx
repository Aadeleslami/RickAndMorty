

const SkeletonLoader = () => {
  return (
    <div className="characters-list">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="list__item skeleton-loading"
          style={{ backgroundColor: "var(--slate-800)" }}
        >
          {/* Skeleton Image */}
          <div
            className="skeleton-img"
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "1rem",
              backgroundColor: "var(--slate-600)",
            }}
          ></div>

          {/* Skeleton Text */}
          <div className="list-item__info">
            <div
              className="skeleton-text"
              style={{
                width: "60%",
                height: "1rem",
                backgroundColor: "var(--slate-600)",
                borderRadius: "0.5rem",
                marginBottom: "0.5rem",
              }}
            ></div>
            <div
              className="skeleton-text"
              style={{
                width: "40%",
                height: "0.8rem",
                backgroundColor: "var(--slate-600)",
                borderRadius: "0.5rem",
              }}
            ></div>
          </div>

          {/* Skeleton Icon */}
          <div
            className="icon skeleton-icon"
            style={{
              width: "2rem",
              height: "2rem",
              backgroundColor: "var(--slate-600)",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
