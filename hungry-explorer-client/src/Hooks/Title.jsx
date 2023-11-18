

const Title = ({ children }) => {
  return (
    <div className="relative border-s-8 border-orange-400 md:border-s-8 md:ps-3">
      <h2 className="text-4xl md:text-6xl font-bold">{children}</h2>
      <p className="absolute bottom-0 text-6xl md:text-8xl -z-10 opacity-5">{children}</p>
    </div>
  );
};

export default Title;