import { AdaptableCard } from "@/components/shared";
import { GiTicket } from "react-icons/gi";
import VoucherForm from "../voucherEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getEditVoucher, updateNoOfUses } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("voucherEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const navigate = useNavigate();
  const voucherData = useSelector(
    (state) => state.voucherEdit.data.voucherList
  );
  const loading = useSelector((state) => state.voucherEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getEditVoucher(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var Data = {};
    Data.id = Id;
    Data.number_of_uses = values.number_of_uses;
    try {
      const success = await updateNoOfUses(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Voucher Edited successfully"}
            type="success"
            duration={2500}
          >
            Voucher Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/voucher");
      }
    } catch (err) {
      let errorMessage = err.response.data.error.message;
      setSubmitting(false);

      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };
  const handleDiscard = () => {
    navigate("/voucher");
  };
  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };

    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <GiTicket size={"30"} />
          <h3 className="ml-5">Voucher Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(voucherData) && (
            <>
              <VoucherForm
                type="edit"
                initialData={voucherData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(voucherData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Voucher found!"
            />
            <h3 className="mt-8">No Voucher found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UsersEdit;
