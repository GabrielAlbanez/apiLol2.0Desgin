// import { url } from "inspector";
import Image from "next/image";
import Logo from "@/assets/imgs/icons.webp";
import CarrouselSkin from "@/app/components/CarrouselSkin";
export const runtime = "edge";

async function getChampions(championsName) {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/champions?${championsName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await request.json();
  return data;
}

export default async function Champions({ params }) {
  const championFiltrado = await getChampions(params.name);
  console.log(championFiltrado);

  const backgroundImageStyle = {
    backgroundImage: `url(${championFiltrado.img})`,
    backdropFilter: "blur(100%)", // Aqui adicionamos o desfoque com backdrop-filter
    backgroundPosition: "right 55% bottom 75%",
  };

  return (
    <div className={`h-screen w-[100%]  bg-zinc-900`}>
      <div
        className={`bg-cover object-cover opacity-20  blur-md h-screen w-screen   absolute`}
        style={backgroundImageStyle}
      ></div>

      {/* <Image src={championFiltrado.img} alt={championFiltrado.name} height={2000} width={1000}  className="w-full h-2/3 object-cover aspect-square bg-center"/> */}
      <div className="z-auto relative flex  justify-center items-center h-screen flex-col py-10">
        <div
          className={`  bg-cover   object-cover w-[67%] h-[50%]  sm:w-2/3 sm:h-4/5 aspect-square rounded-md flex items-end justify-center shadow-xl`}
          style={backgroundImageStyle}
        >
          <h2 className="text-white text-xl sm:text2xl md:text-3xl lg:text-4xl ">
            {championFiltrado.name}
          </h2>
        </div>
        <div className="bg-zinc-950 w-2/3 h-[46%] sm:h-3/5 opacity-25 text-white flex flex-col  items-center sm:flex-row  ">
          <div className="w-3/6 flex justify-center flex-col items-center mt-12 sm:my-24 ">
            <Image src={Logo} alt="icon" width={50} height={50} />
            <h1>{championFiltrado.type}</h1>
          </div>

          <div className="flex flex-wrap justify-center items-center h-[500px] sm:h-[100%] md:h-[100%] sm:w-[45%] md:w-[51%]  px-4  sm:px-4 xl:px-24          sm:border-l-[2px] sm:border-white ">
            <h1 className="text-justify text-md lg:text-xl xl:text-2xl     ">
              {championFiltrado.title}
            </h1>
          </div>
        </div>

        {/* <h2 className="">{championFiltrado.name}</h2>
        <p>{championFiltrado.title}</p>
        <p>{championFiltrado.type}</p>
        <h1>skinks</h1>
        <h2>{championFiltrado.skinks.skin1.name}</h2> */}
        <div></div>
      </div>
      <>
        <CarrouselSkin Champion={championFiltrado} />
      </>
    </div>
  );
}
