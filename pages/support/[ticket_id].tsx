import { SupportChat } from "components/Support/support-chat";
import { TicketNote } from "components/Support/ticket-note";
import { TicketUserInfo } from "components/Support/ticket-user-info";
import SectionLoading from "components/common/SectionLoading";
import { setsupportChat, setSupportico } from "state/reducer/user";

import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
  siteSettingResource,
  supportTicketConversationDetails,
  supportTicketConversationSend,
} from "service/knowledgebase";
import { RootState } from "state/store";
import { useDispatch, useSelector } from "react-redux";
import { customPage, landingPage } from "service/landing-page";
import Footer from "components/common/footer";
import SupportSidebar from "layout/supportSidebar";
let socketCall = 0;
const SupportTicketDetails = () => {
  const [TicketDetails, setTicketDetails] = useState<any>();
  const [Notes, setNotes] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch();
  const { supportChat: conversationDetails } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const sendMessage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("ticket_unique_code", TicketDetails.unique_code);
    file && formData.append("files_name[1]", file);
    setMessage("");
    await supportTicketConversationSend(formData);
  };

  async function listenMessages() {
    //@ts-ignore
    window.Pusher = Pusher;
    //@ts-ignore
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "test",
      wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
      wsPort: process.env.NEXT_PUBLIC_WSS_PORT
        ? process.env.NEXT_PUBLIC_WSS_PORT
        : 6006,
      wssPort: 443,
      forceTLS: false,
      cluster: "mt1",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    //@ts-ignore
    window.Echo.channel(
      `New-Message-${localStorage.getItem("user_id")}-${
        TicketDetails?.unique_code
      }`
    ).listen(".Conversation", (e: any) => {
      dispatch(setSupportico(e.data));
    });
  }
  useEffect(() => {
    if (socketCall === 0 && TicketDetails?.unique_code) {
      listenMessages();
      socketCall = 1;
    }
  });
  const supportTicketConversationDetailsAction = async (
    unique_code: any,
    setTicketDetails: any,
    setLoading: any,
    setNotes: any
  ) => {
    setLoading(true);
    const { data } = await supportTicketConversationDetails(unique_code);
    setTicketDetails(data.ticket_details);
    dispatch(setsupportChat(data.conversation_list));
    setNotes(data?.ticket_note_list);
    setLoading(false);
  };
  useEffect(() => {
    router.query.ticket_id &&
      supportTicketConversationDetailsAction(
        router.query.ticket_id,
        setTicketDetails,
        setLoading,
        setNotes
      );
  }, [router.query.ticket_id]);
  return (
    <>
      <div className="page-wrap">
        <SupportSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <section className="my-5">
              <div className="container">
                {loading === true ? (
                  <SectionLoading />
                ) : (
                  <div className="row">
                    <SupportChat
                      conversationDetails={conversationDetails}
                      sendMessage={sendMessage}
                      setMessage={setMessage}
                      message={message}
                      setFile={setFile}
                    />
                    <div className="col-lg-4 mt-5 mt-lg-0">
                      <TicketUserInfo ticketDetails={TicketDetails} />
                      <TicketNote
                        ticketDetails={TicketDetails}
                        notes={Notes}
                        setNotes={setNotes}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/support");
  const commonRes = await pageAvailabilityCheck();
  const resorce = await siteSettingResource();
  if (parseInt(commonRes.knowledgebase_support_module) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      resorce: resorce,
    },
  };
};
export default SupportTicketDetails;
