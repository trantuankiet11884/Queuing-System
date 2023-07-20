import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchCapSo } from "../redux/slices/capsoSlice";
import { Link } from "react-router-dom";

const CapSoThongBao = () => {
  const capSo = useSelector((state: RootState) => state.levelNum.capSo);

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchCapSo());
  }, []);

  const sortedCapSo = capSo.slice().sort((a, b) => {
    return b.numberService - a.numberService;
  });
  return (
    <div className="notifycation">
      <div className="title-not">Thông báo</div>
      {sortedCapSo &&
        sortedCapSo.map((item) => (
          <>
            <div className="box-not">
              <Link to={`/details-number/${item.id}`} key={item.id}>
                <p className="title-cus">Tên khách hàng: {item.nameCustomer}</p>
                <p className="title-grant">
                  Thời gian nhận số: {item.grantTime}
                </p>
                <hr />
              </Link>
            </div>
          </>
        ))}
    </div>
  );
};

export default CapSoThongBao;
