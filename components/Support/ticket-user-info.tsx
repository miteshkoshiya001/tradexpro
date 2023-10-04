import { formateData } from "common";
import {
  TICKET_STATUS_CLOSE,
  TICKET_STATUS_OPEN,
  TICKET_STATUS_PENDING,
} from "helpers/core-constants";

export const TicketUserInfo = ({ ticketDetails }: any) => {
  return (
    <div className="p_color chat-side-info mb-4 p-3 rounded">
      <h5 className="">
        # {ticketDetails?.id} {ticketDetails?.title}
      </h5>
      <p>
        <h5>
          {ticketDetails?.status === TICKET_STATUS_PENDING ? (
            <span className="badge bg-warning text-white">Pending</span>
          ) : ticketDetails?.status === TICKET_STATUS_OPEN ? (
            <span className="badge bg-info text-white">Open</span>
          ) : ticketDetails?.status === TICKET_STATUS_CLOSE ? (
            <span className="badge bg-danger text-white">Close</span>
          ) : (
            <span className="badge bg-danger text-white">Close forever</span>
          )}
        </h5>
      </p>
      <p>
        <b className="mr-2">Assign To:</b>
        {ticketDetails?.agent?.first_name ? (
          <small>
            {ticketDetails?.agent?.first_name +
              " " +
              ticketDetails?.agent?.last_name}
          </small>
        ) : (
          <small>Not Assign</small>
        )}
      </p>
      <p>
        <b className="mr-1">Ticket Created At: </b>
        <small>{formateData(ticketDetails?.created_at)}</small>
      </p>
    </div>
  );
};
