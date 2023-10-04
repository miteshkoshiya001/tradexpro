import { formateData, formateDateMunite } from "common";
import {
  TICKET_STATUS_CLOSE,
  TICKET_STATUS_OPEN,
  TICKET_STATUS_PENDING,
} from "helpers/core-constants";
import Link from "next/link";

export const TicketBox = ({ ticket }: any) => {
  return (
    <Link href={"/support/" + ticket?.unique_code}>
      <div
        className={`col-12 my-2  ${
          ticket.is_seen_by_user === 1 ? "ticket-card" : "ticket-card-unseen"
        }`}>
        <div className="card p-3 ">
          <a href="">
            <div className="row">
              <div className="col-md-9 ticket-card-inner">
                <h6 className="fw_600 text-dark py-2">
                  <span className="mr-1"># {ticket?.id}</span>
                  {ticket?.title}
                  <span className="ml-2">
                    <b>
                      {ticket?.status === TICKET_STATUS_PENDING ? (
                        <span className=" ml-2 badge bg-warning text-white">
                          Pending
                        </span>
                      ) : ticket?.status === TICKET_STATUS_OPEN ? (
                        <span className=" ml-2 badge bg-info text-white">
                          Open
                        </span>
                      ) : ticket?.status === TICKET_STATUS_CLOSE ? (
                        <span className=" ml-2 badge bg-danger text-white">
                          Close
                        </span>
                      ) : (
                        <span className=" ml-2 badge bg-danger text-white">
                          Close forever
                        </span>
                      )}
                    </b>
                  </span>
                </h6>

                <p
                  className="p_color"
                  dangerouslySetInnerHTML={{
                    __html: ticket?.last_conversation?.message?.substring(
                      0,
                      300
                    ),
                  }}></p>
                <small className="p_color">
                  {formateDateMunite(ticket?.updated_at)}
                </small>
              </div>
              <div className="col-md-3  p_color">
                <p>
                  <b>Assign To:</b>
                  {ticket?.agent_name ? (
                    <small>{ticket?.agent_name}</small>
                  ) : (
                    <small>Not Assign</small>
                  )}
                </p>
                <p>
                  <b className="mr-1">Ticket Created At: </b>
                  <small>{formateData(ticket?.created_at)}</small>
                </p>
                <p>
                  <b className="mr-1">Project Name: </b>
                  <small>{ticket?.project?.name}</small>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </Link>
  );
};
