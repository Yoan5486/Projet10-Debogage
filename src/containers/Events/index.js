import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;
const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = (
    (type
      ? data?.events.filter((event) => event.type === type)
      : data?.events) || []
  ).filter((_, index) => 
    (currentPage - 1) * PER_PAGE <= index &&
    PER_PAGE * currentPage > index
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  
  const pageNumber = Math.ceil(
    type && data?.events
      ? data.events.filter((event) => event.type === type).length / PER_PAGE
      : (data?.events?.length || 0) / PER_PAGE
  ); 

  const typeList = new Set(data?.events.map((event) => event.type));

  const lastEvent =
  Array.isArray(data?.events) && data.events.length > 0
    ? data.events[data.events.length - 1]
    : null;
    
  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
         data-testid="select-testid"
          selection={Array.from(typeList || [])} 
          onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
          {lastEvent && (
              <EventCard
                key="last-event"
                imageSrc={lastEvent.cover}
                title={lastEvent.title}
                date={new Date(lastEvent.date)}
                label={lastEvent.type}
                className="card-image-test-i"
              />
            )}
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
          {[...Array(pageNumber || 0)].map((_, n) => (
           <a key={`page-${n + 1}`} href="#events" onClick={() => setCurrentPage(n + 1)}>
             {n + 1}
            </a>
          ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
