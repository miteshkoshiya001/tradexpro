import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

export const useIsDemotradeFeatureEnable = () => {
  const [isFeatureEnable, setIsFeatureEnable] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(settings).length === 0) return;
    if (Number(settings?.enable_demo_trade) !== 1) {
      router.push("/");
      return;
    }
    setIsFeatureEnable(true);
  }, [settings]);

  return isFeatureEnable;
};
