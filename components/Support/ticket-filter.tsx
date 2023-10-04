//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TicketFilter = ({
  filter,
  setfilter,
  projectList,
  FilterDashboardData,
}: any) => {
  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <form>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-6">
              <label>Select Project</label>
              <div className="cp-select-area">
                <select
                  name="project"
                  className="form-control h-50 ticketFilterBg"
                  onChange={(e: any) => {
                    setfilter({
                      ...filter,
                      project: e.target.value,
                    });
                  }}>
                  <option>Select Project</option>
                  {projectList.map((project: any, index: any) => (
                    <option key={index} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-3 mt-md-0">
              <label>Select Status</label>
              <div className="cp-select-area">
                <select
                  name="status"
                  className="form-control h-50 ticketFilterBg"
                  onChange={(e: any) => {
                    setfilter({
                      ...filter,
                      status: e.target.value,
                    });
                  }}>
                  <option>Select Status</option>
                  <option value="1">Pending</option>
                  <option value="2">Open</option>
                  <option value="3">Close</option>
                  <option value="4">Close Forever</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
              <label>From</label>
              <input
                className="form-control h-50 ticketFilterBg"
                type="date"
                name="from_date"
                onChange={(e: any) => {
                  setfilter({
                    ...filter,
                    from: e.target.value,
                  });
                }}
              />
              {/* <DatePicker
                selected={filter.from}
                onChange={(date: any) => {
                  setfilter({
                    ...filter,
                    from: date,
                  });
                }}
              /> */}
            </div>
            <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
              <label>To</label>
              <input
                className="form-control h-50 ticketFilterBg"
                type="date"
                name="to_date"
                onChange={(e: any) => {
                  setfilter({
                    ...filter,
                    to: e.target.value,
                  });
                }}
              />
              {/* <DatePicker
                selected={filter.to}
                dateFormat="yyyy/MM/dd"
                onChange={(date: any) => {
                  setfilter({
                    ...filter,
                    to: date,
                  });
                }}
              /> */}
            </div>
            <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
              <button
                type="button"
                className="py-1 btn_ticket_search w-100 rounded"
                onClick={FilterDashboardData}>
                Filter Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
