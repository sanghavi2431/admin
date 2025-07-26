import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLayout } from "@/store/theme/themeSlice";
import {
  getClient_id,
  setPaymentDialog,
  setSideBarDisabled,
  setIsPlanExpired,
  setIsFreeTrial,
  setExpiryDate,
} from "@/store/auth/userSlice";
import { constants } from "@/constants/woloo.constant";
import { getSubscriptionExpiry } from "@/services/taskManagement/plansService";
import { LAYOUT_TYPE_BLANK, LAYOUT_TYPE_MODERN } from "@/constants/theme.constant";
import { Loading } from '@/components/shared'

export default function EntryPath() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleId, userId, isFreeTrial, clientId, isOnboardComplete, defaultPageMapping } = useSelector(
    (state) => state.auth.user
  );
  const { token: accessToken } = useSelector((state) => state.auth.session);

  const [isLoading, setIsLoading] = useState(true);

  const isClientOrFacilityManager = useMemo(() =>
    roleId === constants?.role_id?.client || roleId === constants?.role_id?.facility_manager,
    [roleId]
  );

  useEffect(() => {
    dispatch(setLayout(LAYOUT_TYPE_BLANK));
    return () => dispatch(setLayout(LAYOUT_TYPE_MODERN));
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedClientId = clientId?.value;

        if (!clientId && accessToken && isClientOrFacilityManager) {
          const response = await dispatch(getClient_id({ user_id: userId })).unwrap();
          fetchedClientId = response?.value;
        }

        if (fetchedClientId) {
          const res = await getSubscriptionExpiry({ id: fetchedClientId });
          const expiryDate = new Date(res.data.results?.expiry_date);
          dispatch(setExpiryDate(expiryDate.toISOString().split("T")[0]));

          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isExpired = expiryDate < today;

          dispatch(setIsPlanExpired(isExpired));
          dispatch(setIsFreeTrial(!res.data.results?.plan_id));

          if (isExpired) {
            dispatch(setPaymentDialog(true));
            dispatch(setSideBarDisabled(true));
          }
        }
      } catch (err) {
        console.error("Failed to fetch subscription expiry:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isClientOrFacilityManager && accessToken) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [accessToken, isClientOrFacilityManager, userId, clientId]);

  useEffect(() => {
    if (isLoading) return;

    let targetPath = defaultPageMapping || "/";

    if (isClientOrFacilityManager) {
      targetPath = isOnboardComplete ? "/iotData" : clientId?.label ? "/location-AddNew" : `/client-Edit/${clientId?.value}`;
    } else {
      targetPath = isFreeTrial ? "/iotData" : defaultPageMapping;
    }

    navigate(targetPath);
    dispatch(setSideBarDisabled(false));
  }, [isLoading, isOnboardComplete, isFreeTrial, isClientOrFacilityManager, defaultPageMapping]);

  return isLoading ? <Loading loading={true} />
    : null;
}
