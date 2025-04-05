// container main
export default function ContainerMain({ children }) {
  return (
    <section
      className="w-full py-[1rem] flex flex-col items-start box-border"
      id="container-main"
    >
      {children}
    </section>
  );
}
