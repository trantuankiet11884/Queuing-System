import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchCapSo } from "../redux/slices/capsoSlice";
import { Link } from "react-router-dom";

const CapSoThongBao = () => {
  const capSo = useSelector((state: RootState) => state.levelNum.capSo);
  console.log(capSo);

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchCapSo());
  }, []);

  const sortedCapSo = capSo
    .slice()
    .sort((a, b) => b.numberService - a.numberService);

  return (
    <div className="notifycation">
      <div className="title-not">Thông báo</div>
      {sortedCapSo &&
        sortedCapSo.map((cs) => (
          <>
            <div className="box-not">
              <Link to={`/details-number/${cs.id}`} key={cs.id}>
                <p className="title-cus">Số thứ tự: {cs.numberService}</p>
                <p className="title-grant">Thời gian nhận số: {cs.grantTime}</p>
                <hr />
              </Link>
            </div>
          </>
        ))}
    </div>
  );
};

export default CapSoThongBao;
