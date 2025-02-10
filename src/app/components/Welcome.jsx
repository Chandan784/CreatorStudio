import React from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
const Welcome = () => {
  return (
    <>
      <div className="section">
        <section id="welcome">
          <div className="welcome">
            <div className="flex justify-between items-center my-2">
              <h1 className="text-3xl font-bold"> Welcome Meera </h1>{" "}
              <Image
                alt="user profile"
                src={
                  "https://cdn-icons-png.flaticon.com/128/18845/18845304.png"
                }
                height={100}
                width={100}
              />{" "}
            </div>{" "}
            <p className="py-4">
              Congratulations!Your videos have reached 26.5 M users.Increase the
              frequency of videos.{" "}
            </p>{" "}
            <button className="bg-purple-700 hover:bg-blue-700 text-white font-bold py-2 px-10 w-full rounded-lg  w-5/6">
              Increase my reach{" "}
            </button>{" "}
          </div>
        </section>

        <section id="progress">
          <div>
            <h1 className="text-3xl mt-6"> This month 's progress</h1>{" "}
            <div className=" shadow-xl p-10 m-4">


              <div className="script ">
                <p className=" mt-3 "> 13 / 15 scripts are ready </p>

                <div className="flex  justify-center items-center mt-4">
                  <ProgressBar progress={67} />
                  <span className=" ml-5 ">67% </span>
                </div>
                <button className=" bg-purple-500 w-full  text-white my-4  py-3 mt-3 rounded-sm ">
                  View scripts
                </button>
              </div>
              <div className="video">
                <p className=" mt-4"> 5/10 videos are ready  to shoot</p>

                <div className="flex mt-5">
                  <ProgressBar progress={33} />
                  <span className=" ml-5 ">33% </span>
                </div>
                <button className=" bg-purple-500 w-full  text-white my-4  py-3">
                  View scripts
                </button>
              </div>


            </div>

            
          </div>
        </section>

        <section>
          <h1 className=" font-bold text-3xl">Choose Your Theme</h1>
          <div>
            <p>Choose screen size</p>
            <div className="flex space-x-7 items-center text-center text-white">
              <div className=" h-20 w-14 bg-blue-400">16:9</div>
              <div className="h-7 w-7 bg-yellow-300">9:16</div>
              <div className=" h-10 w-24 bg-green-400">1:1</div>

            </div>
                <div>
                  
                </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Welcome;
