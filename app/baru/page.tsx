"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CardList from "../components/baru/CardList";
import ViewUserButton from "../components/baru/ViewUserButton";
import PaginationButtons from "../components/baru/PaginationButtons";

const base_url = "https://jsonplaceholder.typicode.com/photos";
const itemsPerPage = 4;
const maxButtonsToShow = 5; // Adjust this value to control the number of buttons shown

interface Iposts {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Baru = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Iposts[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const response = await fetch(
      `${base_url}?_page=${currentPage}&_limit=${itemsPerPage}`
    );
    const newPosts: Iposts[] = await response.json();
    setPosts(newPosts);

    // Assuming you have a way to get the total number of items
    // You may need to make another API call to get the total count.
    const totalCount = 5000; // Replace with the actual total count
    const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
    setTotalPages(totalPagesCount);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleJumpToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 1);
    let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

    if (startPage + maxButtonsToShow - 1 > totalPages) {
      startPage = totalPages - maxButtonsToShow + 1;
      endPage = totalPages;
    }

    if (startPage > 1) {
      buttons.push(
        <button
          className=" p-2 bg-white text-black w-[50px] rounded md:mb-[50px]"
          key={1}
          onClick={() => handleJumpToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <button
            className=" p-2 bg-white text-black w-[50px] rounded md:mb-[50px]"
            key="ellipsis1"
          >
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          className=" p-2 bg-white text-black w-[50px] rounded md:mb-[50px]"
          key={i}
          onClick={() => handleJumpToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <button
            className=" p-2 bg-white text-black w-[50px] rounded md:mb-[50px]"
            key="ellipsis2"
            disabled
          >
            ...
          </button>
        );
      }
      buttons.push(
        <button
          className=" p-2 bg-white text-black w-[50px] rounded md:mb-[50px]"
          key={totalPages}
          onClick={() => handleJumpToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="md:grid grid-cols-2 gap-[10px] h-[750px] px-8">
        {posts.map((post) => (
          // <CardList key={post.id} className="">
          //   <div className="image-container">
          //     <Image alt="" src={post.url} width={200} height={100} />

          //     <div className="overlay">
          //       <h1 className="font-semibold text-black">{post.title}</h1>
          //       <p>{post.id}</p>
          //       <p>{post.thumbnailUrl}</p>
          //       <ViewUserButton albumId={post.albumId} />
          //     </div>
          //   </div>
          // </CardList>
          <CardList key={post.id}>
            <Image
              alt=""
              width={200}
              height={100}
              src={post.url}
              className=" w-full object-cover h-[200px] rounded-ss-lg rounded-se-lg"
            />
            <div className="p-2">
              <h3 className="mt-2 text-lg font-bold line-clamp-3">
                {post.title}
              </h3>
              {/* <p className="text-gray-500">{beritaLain.date}</p> */}
              <p className="text-center line-clamp-3">{post.thumbnailUrl}</p>
              <ViewUserButton albumId={post.albumId} />
            </div>
          </CardList>
        ))}
        <div className="col-span-2">
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
          <div className="text-center">{renderPageButtons()}</div>
        </div>
      </div>
    </>
  );
};

export default Baru;
