import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { GiCook } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../../components/Button";
import image1 from "../../components/images/sushi-unsplash.jpg";
import StarGroup from "../../components/StarGroup";

const CourseCard1 = (props) => {
  let [memberLimit, member] = [25, 15];
  let [scoreSum, allScore] = [140, 40];
  let percent = (scoreSum / allScore) * 20;

  // 模擬即時顯示進度條
  useEffect(() => {
    let processBar = document.querySelector(
      ".CourseCard1-detailCon-MemberCount-progress"
    );
    processBar.style.width = (member / memberLimit) * 100 + "%";
  }, []);

  // 加入購物車
  const handleAddIntoCart = (e) => {
    console.log("加入購物車");
  };

  // 立即購買
  const handlePurchase = (e) => {
    console.log("立即訂購");
  };

  return (
    <div className="CourseCard-course">
      <div className="CourseCard-course-imageCon">
        <img src={image1} alt="image1" />
        <div className="CourseCard-course-imageCon-banner">即將截止</div>
      </div>

      <div className="CourseCard-course-detailCon">
        <h4 className="CourseCard-course-detailCon-h4">
          <Link to="/courses/course_id">築地創意壽司</Link>
        </h4>
        <StarGroup percent={percent} allScore={allScore} />
        <div className="CourseCard-course-detailCon-company">
          <IoLocationSharp />
          日本東京築地名店 <GiCook />
          廚師名稱
        </div>
        <div className="CourseCard1-detailCon-courseTime">
          平日上午10:30 ~ 下午04:00
        </div>
        <div className="CourseCard1-detailCon-MemberCount">
          <div className="CourseCard1-detailCon-MemberCount-progressCon">
            <div className="CourseCard1-detailCon-MemberCount-progress"></div>
          </div>
          <div>報名人數 8 / 25</div>
        </div>
        <div className="CourseCard1-detailCon-bottom">
          {/* 這裡要自行判斷當前課程階級，切換className即可改變樣式(highLevel, midLevel, lowLevel) */}
          <div className="CourseCard1-detailCon-bottom-courseLevel highLevel">
            高階
          </div>
          <div className="CourseCard1-detailCon-bottom-coursePrice">
            <span className="CourseCard1-detailCon-bottom-coursePrice-origin">
              NT$7,560
            </span>
            <span className="CourseCard-course-detailCon-bottom-coursePrice-discount">
              NT$5,280
            </span>
          </div>
        </div>
        <div className="CourseCard1-detailCon-likeBtn">
          <AiOutlineHeart />
        </div>
      </div>
      <div className="CourseCard1-buttonCon">
        <Button
          value={"加入購物車"}
          className={"button-themeColor CourseCard-course-buttonCon-btn"}
          onClick={handleAddIntoCart}
        />
        <Button
          value={"立即訂購"}
          className={"button-activeColor CourseCard-course-buttonCon-btn"}
          onClick={handlePurchase}
        />
      </div>
    </div>
  );
};

export default CourseCard1;
