import React from "react";
// import THUMBNAIL from "../../../assets/images/culture_blog_01.jpg"
import { FaHeart, FaShare } from 'react-icons/fa'
import { BsBookmark } from 'react-icons/bs'

const THUMBNAIL = "https://moitruongxaydungvn.vn/uploads/images/Thang-1.2023/3-80%20nam%20%C4%91e%20c%C6%B0ong%20van%20hoa-jpg.jpg"

const ThumbnailSection = () => {
    const thumbnailStyles = {
        height: "100%",
        position: "relative",
    };

    const thumbnailImageStyles = {
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${THUMBNAIL})`,
    };

    return (

        <React.Fragment>
            <div style={thumbnailStyles} className="thumbnail">
                <div style={thumbnailImageStyles} className="thumbnail-image brightness-50">
                    {/* <img src={THUMBNAIL} alt="This is a magnificent thumbnail"></img> */}
                </div>
                <div class="z-10 absolute right-5 bottom-5">
                        <BsBookmark class="text-5xl md:text-5xl lg:text-6xl text-white cursor-pointer" />
                    </div>
                <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            text-5xl md:text-5xl lg:text-6xl text-bold text-white
            drop-shadow be-viet-nam-pro-regular">Đấu tranh bảo vệ các giá trị văn hóa truyền thống</div>                
            </div>
            
            
        </React.Fragment>

    )
}

export default ThumbnailSection;