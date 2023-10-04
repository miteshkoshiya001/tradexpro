import { useState } from "react";
import { toast } from "react-toastify";
import {
  supportTicketNoteCreate,
  supportTicketNoteDelete,
} from "service/knowledgebase";

export const TicketNote = ({ ticketDetails, notes, setNotes }: any) => {
  const [note, setNote] = useState("");

  const saveNote = async () => {
    if (!note) {
      toast.error("Note cannot be empty");
      return;
    }
    const { data } = await supportTicketNoteCreate(ticketDetails?.id, note);
    setNotes(data);
    setNote("");
  };
  const deleteNote = async (unique_code: any) => {
    const { data } = await supportTicketNoteDelete(unique_code);
    setNotes(data);
  };
  return (
    <>
      <h5 className="uppercase p_color mb-3">Note</h5>
      <div className="side-ticket-add d-flex w-100 border p-3 rounded chat-side-info">
        <input
          className="w-100 px-2 rounded"
          type="text"
          name="notes"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button
          className="chat_btn rounded ml-2"
          type="button"
          onClick={saveNote}
        >
          Save
        </button>
      </div>

      <div>
        {notes?.map((note: any, index: any) => (
          <div
            key={index}
            className="rounded chat-side-info mt-2 pt-2 pb-3 px-3 d-flex justify-content-between align-items-center"
          >
            <div>{note?.notes}</div>
            <div>
              <p
                className="chat_btn rounded ml-3"
                onClick={() => {
                  deleteNote(note?.unique_code);
                }}
              >
                <small>Delete</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
