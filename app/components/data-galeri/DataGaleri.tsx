import { retrieveData } from "@/app/lib/firebase/services";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

interface typeDataGaleri {
  map: any;
  detail: string;
  image: { name: string; url: string };
  title: string;
}
const DataGaleri = () => {
  const [dataGaleri, setDataGaleri] = useState<typeDataGaleri | undefined>();
  const breakpointColumns = {
    default: 6, // Number of columns by default
    1100: 5, // Number of columns on larger screens
    700: 3, // Number of columns on medium screens
    500: 1, // Number of columns on small screens
  };
  useEffect(() => {
    getDataProfil();
  }, []);

  const getDataProfil = async () => {
    const data: any = await retrieveData("galeri");
    if (data) {
      setDataGaleri(data);
    }
  };

  return (
    <div>
      {" "}
      <div className="pt-[100px] px-6 text-center">
        <h1 className="text-[30px] underlined-berita text-white">
          <strong>GALERI</strong>
        </h1>
        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="mt-[100px] my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {dataGaleri &&
            dataGaleri.map(
              (data: {
                id: React.Key | null | undefined;
                image: { url: string | StaticImport };
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                detail:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <div key={data.id} className="mb-6 relative group">
                  <Image
                    src={data.image.url}
                    alt=""
                    width={500}
                    height={500}
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity rounded-lg">
                    <div className="text-white text-center">
                      <p className="text-lg font-semibold">{data.title}</p>
                      <p className="text-white">{data.detail}</p>
                    </div>
                  </div>
                </div>
              )
            )}
        </Masonry>
      </div>
    </div>
  );
};

export default DataGaleri;
