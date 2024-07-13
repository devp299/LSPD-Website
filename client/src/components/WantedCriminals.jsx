import { useRef, useState } from "react";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {Send as SendIcon, AttachFile as AttachFileIcon} from '@mui/icons-material';
// import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import SpaceCity1 from '../assets/gta-6-teaser-3840x2160-13559.png';

import { FreeMode, Pagination } from "swiper/modules";
import { IconButton, Stack } from "@mui/material";
import { InputBox } from "./styles/StyledComponent";
// import FileMenu from "./dialogs/FileMenu";
// import { ServiceData } from "../constants";

const ServiceData = [
  {
    _id: 1,
    // img_url: 
    name: "Dev Patel",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
  {
    _id: 2,
    // img_url: 
    name: "Krish Patel",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
  {
    _id: 3,
    // img_url: 
    name: "Pratham Prajapti",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
  {
    _id: 4,
    // img_url: 
    name: "Vishv Boda",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
  {
    _id: 5,
    // img_url: 
    name: "Ansh Brahmbhatt",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
  {
    _id: 6,
    // img_url:
    name: "Moin Vinchhi",
    description: "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
    wantedFor: "AU ko lut ke bhag gaya",
    prizepool: "AU se free degree bina padhe"
  },
];

const WantedCriminals = () => {
  // const [fileMenuAnchor, setFileMenuAnchor] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [message,setMessage] = useState("");
  const fileRef = useRef(null);
  const selectFile = () => fileRef.current?.click();

  const handleDetailsClick = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
  }
  const messageOnChange = (e) => {
    setMessage(e.target.value);
  }
  const handleCloseItem = () => setShowDetails(false);

  return (
    <div className="flex flex-col ">
      <h1 className="text-center text-7xl mb-11 mt-9 font-serif">Wanted List</h1>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="flex flex-col gap-6 mb-20 ml-5 mr-5 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[200px] w-[185px] lg:h-[350px] lg:w-[300px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center"/>
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3 items-center justify-center ">
                  <img src={`${SpaceCity1}`} alt="Criminal Photo" className="w-32 h-32 rounded-full object-cover" />
                
                <div className="flex-col items-center">
                  <h1 className="text-xl text-center font-bold font-serif lg:text-2xl">{item.name} </h1>
                  <p className="lg:text-[18px]">{item.prizepool} </p>
                  <button
                  className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg mt-2"
                  onClick={() => handleDetailsClick(item)}
                >
                  View Details
                </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-gray-400 p-8 rounded-lg h-[25rem] w-[35rem]">
              <CloseSharpIcon className="absolute top-[6.8rem] right-[23rem] cursor-pointer hover:bg-gray-200" onClick={handleCloseItem} />
              <div className="flex flex-row ">
                <img src={`${SpaceCity1}`} alt="Criminal Photo" className="w-32
                h-32 rounded-full object-cover" />
                <div className="flex flex-col">
                  <h2 className="text-3xl ml-[1rem] font-serif mt-[1rem]"><b>Name: </b>{selectedItem.name}</h2>
                  <h2 className="text-2xl ml-[1.6rem] mt-[1rem]"><b>Known as: </b>{selectedItem.name}</h2>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h2 className="text-base"><b>Description: </b> {selectedItem.description}</h2>
                <h2 className="text-base mt-2"><b>Wanted For: </b> {selectedItem.wantedFor}</h2>
                <h2 className="text-base mt-2"><b>Prize Pool: </b> {selectedItem.prizepool}</h2>
                <form 
                  style={{
                    height: "10%",
                  }}
                  onSubmit={submitHandler}
                >
                <Stack direction={"row"} height={"100%"} padding={"1rem"}
                  alignItems={"center"} position={"relative"}
                >

                <IconButton 
                  sx={{
                    position: "absolute",
                    left: "1rem",
                    rotate: "30deg",
                  }}
                  onClick={selectFile}
                >
                  <AttachFileIcon />
                </IconButton>

                <InputBox
                  placeholder='Share a tip here....' 
                  value={message}
                  onChange={messageOnChange}
                />
      
                <IconButton type='submit' 
                  sx={{
                    rotate: "-30deg",
                    bgcolor: "black",
                    color: "white",
                    marginLeft:"1rem",
                    padding: "0.5rem",
                    "&:hover" : {
                      bgcolor: "error.dark",
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>

              </Stack>
              </form>
              {selectFile && (
                <input 
                  type='file'
                  multiple
                  accept="*"
                  style={{ display: "none"}}
                  onChange={(e) => fileChangeHandler(e)}
                  ref={fileRef}
                />
              )}
              </div>
          </div>
        </div>
      )}
      </Swiper>
    </div>
  );
};

export default WantedCriminals;