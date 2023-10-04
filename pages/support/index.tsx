import { NoItemFound } from "components/NoItemFound/NoItemFound";
import PaginationGlobal from "components/Pagination/PaginationGlobal";
import { SupportCard } from "components/Support/support-card";
import { TicketBox } from "components/Support/ticket-box";
import { TicketFilter } from "components/Support/ticket-filter";
import SectionLoading from "components/common/SectionLoading";
import Footer from "components/common/footer";
import SupportSidebar from "layout/supportSidebar";
import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  knowledgebaseSupportProjectList,
  supportTicketList,
} from "service/knowledgebase";
import { customPage, landingPage, landingPageSlug } from "service/landing-page";

const Support = () => {
  const [fullDashboar, setFullDashboard] = useState<any>();
  const [loading, setloading] = useState<any>(false);
  const [ticket_list, setTicket_list] = useState<any>();
  const [projectList, setProjectList] = useState([]);
  const [filter, setfilter] = useState<any>({
    project: "",
    status: "",
    from: "",
    to: "",
  });
  const getDashbaordData = async () => {
    setloading(true);

    const DashboardData = await supportTicketList(5, 1, "", "", "", "", "");
    setFullDashboard(DashboardData.data);
    setTicket_list(DashboardData?.data?.ticket_list);
    setloading(false);
  };

  const getProjectList = async () => {
    const { data } = await knowledgebaseSupportProjectList();
    setProjectList(data?.project_list);
  };
  const searchDashboardData = async (query: any) => {
    setloading(true);
    const DashboardData = await supportTicketList(5, 1, query, "", "", "", "");
    setFullDashboard(DashboardData.data);
    setTicket_list(DashboardData?.data?.ticket_list);
    setloading(false);
  };
  const FilterDashboardData = async () => {
    setloading(true);

    const DashboardData = await supportTicketList(
      5,
      1,
      "",
      filter.status,
      filter.project,
      filter.from,
      filter.to
    );
    setFullDashboard(DashboardData.data);
    setTicket_list(DashboardData?.data?.ticket_list);
    setloading(false);
  };
  const getDashbaordDataPaginationAction = async (
    page: any,
    setData: any,
    setLoading: any,
    selected: any
  ) => {
    setloading(true);

    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    const response = await supportTicketList(
      5,
      parseInt(number),
      "",
      "",
      "",
      "",
      ""
    );
    setFullDashboard(response.data);
    setTicket_list(response?.data?.ticket_list);
    setloading(false);
  };
  useEffect(() => {
    getDashbaordData();
    getProjectList();
  }, []);
  return (
    <>
      <div className="page-wrap">
        <SupportSidebar getDashbaordData={getDashbaordData} />
        <div className="page-main-content">
          <div className="container-fluid">
            <section className="my-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="row  mb-5">
                      <SupportCard
                        name="Total Ticket"
                        icon_name="fas fa-ticket-alt"
                        ticketNumber={
                          fullDashboar?.ticket_count?.total_ticket_count
                        }
                      />
                      <SupportCard
                        name="Pending Ticket"
                        icon_name="fas fa-clock"
                        ticketNumber={
                          fullDashboar?.ticket_count?.total_pending_ticket_count
                        }
                      />
                      <SupportCard
                        name="Open Ticket"
                        icon_name="fas fa-folder-open"
                        ticketNumber={
                          fullDashboar?.ticket_count?.total_open_ticket_count
                        }
                      />
                      <SupportCard
                        name="Close Ticket"
                        icon_name="fas fa-check-circle"
                        ticketNumber={
                          fullDashboar?.ticket_count
                            ?.total_close_forever_ticket_count
                        }
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-12 d-block d-md-flex align-items-center searchTicket">
                        <input
                          placeholder="Search Ticket ID or Title or Puchase Code"
                          className="px-2 py-2 rounded"
                          type="text"
                          onChange={(e) => {
                            setTimeout(() => {
                              searchDashboardData(e.target.value);
                            }, 1000);
                          }}
                        />
                        {/* <Link href="/support/ticket-create">
                          <div>
                            <button
                              type="button"
                              className="btn btn_ticket_search ml-0 ml-md-2 mt-3 mt-md-0 rounded"
                            >
                              Create Ticket
                            </button>
                          </div>
                        </Link> */}
                      </div>
                    </div>
                    <TicketFilter
                      filter={filter}
                      projectList={projectList}
                      setfilter={setfilter}
                      FilterDashboardData={FilterDashboardData}
                    />
                    {loading ? (
                      <SectionLoading />
                    ) : (
                      <>
                        <div className="row mt-5">
                          {ticket_list?.data?.map((ticket: any, index: any) => (
                            <TicketBox key={index} ticket={ticket} />
                          ))}
                        </div>
                        {ticket_list?.data.length === 0 && <NoItemFound />}
                        {ticket_list?.data.length > 0 && (
                          <PaginationGlobal
                            setTimelineData={setTicket_list}
                            links={ticket_list?.links}
                            setLoading={null}
                            LinkTopaginationString={
                              getDashbaordDataPaginationAction
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
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
  const { data } = await landingPage(ctx.locale);
  const commonRes = await pageAvailabilityCheck();
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
      socialData: data?.media_list ? data?.media_list : [],
    },
  };
};
export default Support;
