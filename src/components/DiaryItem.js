import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date, image }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [dropdown, setDropdown] = useState(false);
  const btnEl = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!btnEl.current?.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const { onRemove, onCreate } = useContext(DiaryDispatchContext);

  const headleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
    onCreate();
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="img"
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper" ref={btnEl}>
        <MyButton text={"💬"} onClick={() => setDropdown((cur) => !cur)} />
        {dropdown && (
          <div className="correction_delete">
            <ul>
              <li onClick={goEdit}>수정하기</li>
              <li onClick={headleRemove}>삭제하기</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
