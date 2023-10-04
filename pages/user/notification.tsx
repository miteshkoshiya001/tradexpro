import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { notification } from "service/notification";
import { RootState } from "state/store";
import { GetServerSideProps } from "next";
import { customPage, landingPage } from "service/landing-page";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import Footer from "components/common/footer";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
const NotificationPage = () => {
  const { t } = useTranslation("common");
  const { notificationData } = useSelector((state: RootState) => state.user);

  return (
    <>
      {notificationData?.length > 0 && (
        <div className="container notification-continer mb-2">
          <h2 className="section-top-title notification-section-title">
            {t("All notifications")}
          </h2>
        </div>
      )}

      <div className="notification-section marginLeftRight">
        <div className="container">
          <div className="row">
            {notificationData?.length > 0 ? (
              notificationData?.map((item: any, index: any) => (
                <div key={`notify${index}`} className="notify-grid boxShadow">
                  <div className="notify-content">
                    <p className="icon-title">
                      <div>
                        <IoMdNotificationsOutline
                          className={
                            true
                              ? "notifyUnread notifyUnreadIcon"
                              : "notifyRead"
                          }
                          size={25}
                        />
                      </div>

                      <span className={true ? "titleUnread" : ""}>
                        {item?.title}
                      </span>
                    </p>
                    <p className={true ? "titleUnread" : ""}>
                      {item?.notification_body}
                    </p>
                  </div>
                  <div className="notify-date">
                    <p>{moment(item.created_at).format("DD MMM YYYY")}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="container">
                <NoItemFound message="No notification's" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/notification");
  return {
    props: {},
  };
};
export default NotificationPage;
