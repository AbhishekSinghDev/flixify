import Billboard from "@/components/shared/Billboard";

const Home = () => {
  return (
    <section>
      <Billboard videoUrl="/video/billboard.mp4" posterUrl="" />

      <div className="absolute top-[30%] 2xl:top-[115%] xl:top-[95%] lg:top-[70%] md:top-[50%] sm:top-[30%]">
        <h1 className="z-0">wow</h1>
      </div>
    </section>
  );
};

export default Home;
